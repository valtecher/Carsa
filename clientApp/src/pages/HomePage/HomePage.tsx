import React from 'react'
import HomeHeader from '../../components/Home/Header/HomeHeader'
import './homePage.scss'
import brnadCar from '../../images/HomePage/brandCar.png'
import arrow from '../../images/HomePage/Arrow 2.png'
const HomePage = () => {
   

    return (
        <div className='home'>
            <div className='home-decorations'>
                <div className='home-decorations-item'></div>
                <div className='home-decorations-item'></div>
            </div>
            <div className='home-decorations'>
                <div className='home-decorations-item'></div>
                <div className='home-decorations-item'></div>
            </div>
            <HomeHeader></HomeHeader>
            <div className='home-section'>
                <div className='home-section-first'>
                    <div className='home-section-first-fadingText'>
                        CARSA
                    </div>
                    <img src={brnadCar}></img>
                </div>
                <div className='home-section-marketing'>
                    <p>Selection helper</p>
                    <img src={arrow}></img>
                    <div className='home-section-marketing-btn'>Drive Now</div>
                </div>
                  
            </div>
            
        
        </div>
    )
}

export default HomePage