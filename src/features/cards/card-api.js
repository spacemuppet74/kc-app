import { Web, sp } from "@pnp/sp"

let web = new Web('http://sptest-intranet/apps')

export const submitNewCard = async (card) => {
  console.log('submit new card')
  try {
    const { gpItem: { itemcode = '' }, storeSite, locationOfItem, cardlocation, manufacturerCode, reorderpoint, maxOnShelf, image } = card
    // save card to kc-card list
    const newCard = await sp.web.lists.getByTitle('KC-Cards').items.add({
      gp_item_id: itemcode,
      gp_location: storeSite,
      store_locationId: locationOfItem,
      order_card_location: cardlocation,
      manufacturer_code: manufacturerCode,
      max_on_shelf: parseInt(maxOnShelf, 10),
      min_stock: parseInt(reorderpoint, 10)
    })

    // next upload the image
    // if the image size is less than 10mb do a direct upload
    // otherwise upload in chunks
    if (image && image.size <= 10485760) {
      console.log('upload image ', image.file)
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


  } catch (error) {
    console.log(error)
  }

}

export const uploadImage = (image) => {
  console.log('upload image ', image)
  // next upload the image
  // if the image size is less than 10mb do a direct upload
  // otherwise upload in chunks
  if (image) {
    console.log('upload image ', image.file)
    web.getFolderByServerRelativeUrl('/apps/kcproductimages').files.add(image.name, image.file, true)
      .then(f => f.file.getItem()
        .then(item => item.update({ Title: 'Updated', gp_item_code: "GP Code goes here" }))
      )
  } else {
    web.getFolderByServerRelativeUrl('/apps/kcproductimages').files.add(image.name, image.file, true).then(resp => console.log('file uploaded ', resp))
  }

}