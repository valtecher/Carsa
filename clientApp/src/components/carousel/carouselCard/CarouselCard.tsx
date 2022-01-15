import React from 'react'; 
import './CarouselCard.scss'

interface Props{
  imagePath: string | any
}

const CarouselCard = ({imagePath}:Props) => {
   

  return(
    <div className='carouselCardWrapper'>
      <div>Image {imagePath}</div>
    </div>
  )
}

export default CarouselCard; 