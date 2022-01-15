import React, {useEffect, useState} from 'react';
import Header from '../header/Header'
import './banner.scss'
import CarBannerImage from '../../images/HomePage/arteum-ro-UfMb0M2RWjo-unsplash.jpg'
import axios from 'axios'
import { isConstructorDeclaration } from 'typescript';

const Banner = () => {
  const testFunc = () => {
  
  }

  useEffect(()=>{
    console.log('here')
 
  }, [])

  return(
    <div className={'banner'}>
      <div className='banner-slogan'>
        <p>CAR <br/> SELECTION <br/> HELP</p>
        <button className='banner-button' onClick={testFunc}>Buy Now</button>
      </div>
      <img className={'banner-background'} src={CarBannerImage}/>
    </div>
  )
}

export default Banner;