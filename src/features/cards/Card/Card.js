import React, { Component } from 'react'
import {connect} from 'react-redux'
import wrapText from '../../../app/util/canvasWrapText'

import {cardDetails} from '../cardsReducer'

import './Card.scss'

class Card extends Component {

    constructor(props) {
        super(props)
        this.canvas = React.createRef()
    }

    drawCard = () => {
        const {card, gpItem, gpSite, store, site} = this.props.card
        const ctx = this.canvas.current.getContext('2d')

        // style the card background color
        // using the store location color
        ctx.fillStyle = store.colour
        ctx.fillRect(0,0,375, 500)

        /** CARD TEMP AND LOCATION  */
        let textX = 155;
        let textY = 20
    
        // set storage temp row
        ctx.font = " bold 12px sans-serif"
        ctx.fillStyle = "#fff"
        ctx.textAlign = 'right'
        ctx.fillText('Storage Temp:', textX, textY)

        ctx.clearRect(textX+10, 5, 195, textY+5 )
        ctx.fillStyle ="#000"
        ctx.textAlign = "center"
        ctx.fillText(gpItem.StorageCondition.trim(), textX + 110, textY+2)

        // set location row
        // add 25px on to the row above to set x for this row
        ctx.fillStyle = '#fff'
        ctx.textAlign = 'right'
        ctx.fillText("Location:", textX, textY*2.2)
        ctx.textAlign = "center"
        ctx.fillText(gpSite.LOCNDSCR.trim(), textX + 110, textY*2.2)

        // set Location of Item row
      // add 25px on to the row above to set x for this row
        ctx.fillStyle = '#fff'
        ctx.textAlign = 'right'
        ctx.fillText("Location of Item:", textX, textY*3.2)
        ctx.textAlign = "center"
        ctx.fillText(store.Title.trim(), textX+110, textY*3.2)

        // set Locatoin of Order Card
      // add 25px on to the row above to set x for this row
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'right'
      ctx.fillText("Order Card Location:", textX, textY*4.2)
      ctx.textAlign = "center"
      ctx.fillText(card.order_card_location.trim(), textX+110, textY*4.2)

      ctx.clearRect(10,90 ,355, 500 - 100 )
      ctx.strokeStyle = "#000"
      ctx.strokeRect(10,90 ,355, 500 - 100 )

      // set GP Item number
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.font = "bold 32px sans-serif"
      ctx.fillText(gpItem.ItemCode.trim(), 190, 120)

    /**  SITE TRANSFER INFORMATION  */

      // create line
      ctx.beginPath()
      ctx.moveTo(11, 130 )
      ctx.lineTo(364, 130 )
      ctx.stroke()

      // reset font back to default for card
      ctx.font = "12px sans-serif"

      // set the background colour to yellow
      ctx.fillStyle ="#FFFF00"
      ctx.fillRect(11, 131, 354 , 100 )

       // set Manufacturef Code Row
      // add 25px on to the row above to set x for this row
     
      ctx.fillStyle = '#000'
      ctx.textAlign = 'right'
      ctx.fillText("Manufacterer Code:", textX, textY*7.2)
      ctx.textAlign = "center"
      ctx.fillText(card.manufacturer_code? card.manufacturer_code.trim(): '', textX+110, textY*7.2)

    // set Stock Descriptions
    // add 25px on to the row above to set x for this row

      ctx.fillStyle = '#000'
      ctx.textAlign = 'right'
      ctx.fillText("Stock Description:", textX, textY*8.2)
      ctx.textAlign = "center"
      wrapText(ctx,gpItem.ITEMDESC.trim(), textX + 110, textY*8.2, 200, 14)

    // set Unit of Measure
    // add 25px on to the row above to set x for this row

      ctx.fillStyle = '#000'
      ctx.textAlign = 'right'
      ctx.fillText("Ordering Unit Of Measure:", textX, textY*10)
      ctx.textAlign = "center"
      ctx.fillText(gpItem.UOFM ? gpItem.UOFM.trim(): '', textX +110, textY*10)

      // set Quantity per unit
    // add 25px on to the row above to set x for this row

    ctx.fillStyle = '#000'
    ctx.textAlign = 'right'
    ctx.fillText("Order Quantity per Unit:", textX, textY*11)
    ctx.textAlign = "center"
    ctx.fillText(gpItem.EquivalentQTY ? Number(gpItem.EquivalentQTY).toFixed(0): '', textX+110, textY*11)

    // create line
    ctx.beginPath()
    ctx.moveTo(10, 230 )
    ctx.lineTo(364, 230 )
    ctx.stroke()

    /**  REORDER SECTION  */
    // create line
    ctx.beginPath()
    ctx.moveTo(10, 240 )
    ctx.lineTo(364, 240 )
    ctx.stroke()

    ctx.fillStyle = store.colour
    ctx.fillRect(10, 240, 355 , 50  )

    // Reorder Point Row
    ctx.font = "bold 16px sans-serif"
    ctx.fillStyle = '#000'
    ctx.textAlign = 'right'
    ctx.fillText("Reorder Point(minimum stock):", textX+120, 260)
    ctx.textAlign = "left"
    ctx.fillText( card.min_stock ? card.min_stock : '', textX+130, 260)


    ctx.textAlign = 'right'
    ctx.fillText("Count Inventory as Unit:", textX + 120, 280)
    ctx.textAlign = "left"
    ctx.fillText( gpItem.UOFM ?gpItem.UOFM.trim()  : '', textX +130 , 280)

    // create line
    ctx.beginPath()
    ctx.moveTo(11, 290 )
    ctx.lineTo(364, 290 )
    ctx.stroke()

    /**  GP Ordering SECTION  */
    // create line
    ctx.beginPath()
    ctx.moveTo(11, 300 )
    ctx.lineTo(364, 300 )
    ctx.stroke()

    ctx.fillStyle ="#FFFF00"
    ctx.fillRect(11, 301, 353 , 50  )

    // Restocking Quanity Row
    ctx.font = "bold 16px sans-serif"
    ctx.fillStyle = '#000'
    ctx.textAlign = 'right'
    ctx.fillText("Restocking Quantity:", textX + 120, 320)
    ctx.textAlign = "left"
    ctx.fillText( card.max_on_shelf -card.min_stock > 0 ? card.max_on_shelf -card.min_stock : "0", textX + 130, 320)
    ctx.fillText( gpItem.UOFM ? gpItem.UOFM : "",  textX + 150, 320)


    ctx.textAlign = 'right'
    ctx.fillText("GP Transfer Quantity:",  textX + 120, 340)
    ctx.textAlign = "left"
    ctx.fillText( card.max_on_shelf -card.min_stock > 0 ? card.max_on_shelf -card.min_stock : "0",  textX + 130, 340)
    ctx.fillText( gpItem.UOFM ? gpItem.UOFM : "",  textX + 150, 340)

    // create line
    ctx.beginPath()
    ctx.moveTo(11, 352 )
    ctx.lineTo(364, 352 )
    ctx.stroke()


    // add Stock Image
        let image = new Image()
        image.src = "http://sptest-intranet/apps/kcproductimages/DS090011.png"
        image.onload = () => {
            console.log(image.height);
            image.width = 260
            ctx.drawImage(image, 11, 360, image.width,image.height )
        }
    }

 
    componentDidMount = () => {
      console.log('MOUNTED ', this.image)
      this.drawCard()
      
    }

    componentDidUpdate = (prevProps, prevState) => {
        console.log('UPDATED ', this.image)
    }

    componentWillUnmount = () => {
      console.log('UNMOUNTING ')
    }
    render() {
        const {card, gpItem, gpSite, site, store} =this.props.card
        return (
            <canvas ref={this.canvas} width={375} height={500} style={{border: "1px solid black"}} />
        )
    }
}

const mapState = state => {
    return {
        card: cardDetails(state)
    }
}

const actions = {}

export default connect(mapState, actions)(Card)