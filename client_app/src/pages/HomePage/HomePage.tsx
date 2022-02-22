import React, { useEffect } from 'react'
import Header from '../../components/header/Header'
import './homepage.scss'
import brandCar from '../../images/HomePage/arteon.png'
import aston from '../../images/HomePage/aston_martin_PNG9.png'
import arrow from '../../images/HomePage/Arrow 2.png'
import userIcon from '../../images/HomePage/icon_user.png'
// import Footer from '../../components/footer/Footer';
import Aos from 'aos'
import 'aos/dist/aos.css';

const HomePage = () => {   
 
    useEffect(()=>{
        Aos.init({ duration: 2000 })
    }, [])

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
            <Header/>
            <div className='home-section'>
                <div className='home-section-first'>
                    <div data-aos="fade-up" className='home-section-first-fadingText'>
                        CARSA
                    </div>
                    <img data-aos="fade-down" src={brandCar}></img>
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
                <div className='home-second-main' data-aos="fade-right">
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
                    <div data-aos="fade-left" className='home-second-main-image'>
                        <img src={aston}/>
                    </div>
                </div>   
            </div>
            <div className='home-section home-third' data-aos="fade-up">
                <div className='home-third-header'>Reviews</div>
                <div className='home-third-body'>
                    <div className='home-third-body-reviews'>
                        <div className='home-third-body-reviews-item'>
                            <div className='home-third-body-review-item-icon'>
                                <img src={userIcon}/>
                            </div>
                            <div className='home-third-body-review-item-userName'>
                                Kiril Johnson
                            </div>
                            <div className='home-third-body-review-item-review'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                  when an unknown printer took a galley of type and scrambled it to make a type
                                   specimen book. It has survived not only five centuries, but also the leap into 
                                   electronic typesetting, remaining essentially unchanged. It was popularised 
                            </div>
                        </div>
                        <div className='home-third-body-reviews-item'>
                            <div className='home-third-body-review-item-icon'>
                                <img src={userIcon}/>
                            </div>
                            <div className='home-third-body-review-item-userName'>
                                Kiril Johnson
                            </div>
                            <div className='home-third-body-review-item-review'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                  when an unknown printer took a galley of type and scrambled it to make a type
                                   specimen book. It has survived not only five centuries, but also the leap into 
                                   electronic typesetting, remaining essentially unchanged. It was popularised 
                            </div>
                        </div>
                        <div className='home-third-body-reviews-item'>
                            <div className='home-third-body-review-item-icon'>
                                <img src={userIcon}/>
                            </div>
                            <div className='home-third-body-review-item-userName'>
                                Kiril Johnson
                            </div>
                            <div className='home-third-body-review-item-review'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                  when an unknown printer took a galley of type and scrambled it to make a type
                                   specimen book. It has survived not only five centuries, but also the leap into 
                                   electronic typesetting, remaining essentially unchanged. It was popularised 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        {/* <Footer/> */}
        </div>
    )
}

export default HomePage