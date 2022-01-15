import React from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import styles from './homeBanner.module.scss'
import BannerImage from '../../images/HomePage/vw_arteon.png'

Aos.init({
	offset: 200,
	duration: 800,
	easing: 'ease-in-sine',
	delay: 200,
})

const HomeBanner = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.banner}>
				<div data-aos='fade-right' className={styles['banner-slogan']}>
					<p>
						CAR <br /> SELECTION <br /> HELP
					</p>
				</div>
				<button data-aos='fade-in' data-aos-duration='1500' className={styles['banner-button']}>
					Buy Now
				</button>
				<div data-aos='fade-left' className={styles['banner-image']}>
					<img src={BannerImage} alt='' />
				</div>
			</div>
		</div>
	)
}

export default HomeBanner
