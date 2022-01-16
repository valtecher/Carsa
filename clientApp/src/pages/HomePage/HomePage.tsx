import React from 'react'
import HomeHeader from '../../components/Home/Header/HomeHeader'
import './homePage.scss'
import brnadCar from '../../images/HomePage/brandCar.png'
import aston from '../../images/HomePage/aston_martin_PNG91.png'
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
            <HomeHeader/>
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
            <div className='home-section home-second'>
                <div className='home-decorations home-decorations-horizontal'>
                    <div className='home-decorations-item'></div>
                    <div className='home-decorations-item'></div>
                </div>
                <div className='home-decorations home-decorations-horizontal'>
                    <div className='home-decorations-item'></div>
                    <div className='home-decorations-item'></div>
                </div>
                <div className='home-second-main'>
                    <div className='home-second-main-body'>
                        <p className='home-second-main-body-pre'>BEST SERVICES</p>
                        <p className='home-second-main-body-header'>Feel the best experience with our selection deals</p>
                        <div className='home-second-main-body-section'>
                            <p className='home-second-main-body-section-header'>Packages for every budget</p>
                            <p className='home-second-main-body-section-body'>Feel the best experience with our selection deals</p>
                        </div>
                        <div className='home-second-main-body-section'>
                            <p>Best price</p>
                            <p>We find the best deals for their price</p>
                        </div>
                        <div className='home-second-main-body-section'>
                            <p>Support 24/7</p>
                            <p>Feel free to contact our helpline 24/7</p>
                        </div>
                        

                    </div>
                    <div className='home-second-main-image'>
                        <img src={aston}/>
                    </div>
                </div>   
            </div>
            <div className='home-section home-third'>
                <div className='home-third-header'>Reviews</div>
                <div className='home-third-body'>
                    <div className='home-third-body-reviews'>
                        <div className='home-third-body-reviews-item'>
                            <div className='home-third-body-review-item-icon'>

                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
            
        
        </div>
    )
}

export default HomePage