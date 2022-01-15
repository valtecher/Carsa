import React, { useState } from 'react'
import './Carousel.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import CarouselCard from './carouselCard/CarouselCard';
import 'swiper/swiper.scss'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface Props{
  images: Array<string>
}

const Carousel = ({ images }:Props) => {

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1.7,
    slidesToScroll: 1
  };

  return(
    <div className='carouselWrapper'>
         <Slider {...settings}>
          {images?.map((image:string, index:number)=>{
            return(
              <div key={index} className='carouselWrapper-slide'>
                  <img src={image} className='carouselWrapper-slide-image'/>
              </div>
            )
          })}
        </Slider>
    </div>
  )
}

export default Carousel