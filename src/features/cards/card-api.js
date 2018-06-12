import { Web, sp } from "@pnp/sp"

let web = new Web('http://sptest-intranet/apps')

export const getCards = (site) => {
  return sp.web.lists.getByTitle('KC-Cards').items.filter(`site/Id eq ${site}`).get()
}

export const submitNewCard = async (card, site) => {
  console.log('submit new card')
  try {
    let imageUpload
    const { gpItem: { itemcode = '' }, storeSite, locationOfItem, cardlocation, manufacturerCode, reorderpoint, maxOnShelf, image } = card
    // save card to kc-card list
    const newCard = await sp.web.lists.getByTitle('KC-Cards').items.add({
      gp_item_id: itemcode,
      gp_location: storeSite,
      store_locationId: locationOfItem,
      order_card_location: cardlocation,
      manufacturer_code: manufacturerCode,
      max_on_shelf: parseInt(maxOnShelf, 10),
      min_stock: parseInt(reorderpoint, 10),
      siteId: site
    })

    // next upload the image
    // if the image size is less than 10mb do a direct upload
    // otherwise upload in chunks
    if(image && image.size > 0 ) {
      imageUpload = await uploadImage(image, itemcode)
    }
    
    console.log('image upload',imageUpload)
    console.log('new card created ', newCard)
    return { ...newCard}

  } catch (error) {
    console.log(error)
    return new Error('error ', error)
  }

}

export const uploadImage = (image, itemcode) => {
  console.log('upload image ', image)
  // next upload the image
  // if the image size is less than 10mb do a direct upload
  // otherwise upload in chunks
  if (image && image.size <= 10485760) {
    web.getFolderByServerRelativeUrl('/apps/kcproductimages')
      .files
      .add(image.name, image.testFile, true)
      .then(f => f.file.getItem().then(item => item.update({ Title: image.name, gp_item_code: itemcode })))
  } else {
    web.getFolderByServerRelativeUrl('/apps/kcproductimages')
      .files
      .addChunked(image.name, image.testFile, () => { console.log('in progress') }, true)
      .then(f => f.file.getItem().then(item => item.update({ Title: image.name, gp_item_code: itemcode })))
  }

}