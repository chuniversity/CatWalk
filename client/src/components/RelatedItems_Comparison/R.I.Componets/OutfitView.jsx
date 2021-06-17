import React from 'react';
import Carousel from 'react-elastic-carousel';
import OutfitItem from './OutfitItem.jsx'

{/* <Outfit
outfit={this.props.outfit}
changeCurrentProduct={this.props.changeCurrentProduct}
/> */}

const OutfitView = (props) => {

  return (
    <Carousel
      itemPadding={[2, 2]}
      itemsToShow={5}
      pagination={false}
      enableAutoPlay autoPlaySpeed={3000}
      showEmptySlots
    >
      {props.outfit.map((item, i) => {
        return (
          <OutfitItem
            key={i}
            changeCurrentProduct={props.changeCurrentProduct}
            productId={item}
          />
        )
      })}
    </Carousel>
  )

}


export default OutfitView;