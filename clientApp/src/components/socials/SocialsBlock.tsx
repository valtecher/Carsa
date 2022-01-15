import React from 'react'
import InstagramIcon from '../../images/HomePage/socials/instagram_icon.png'
import FacebookIcon from '../../images/HomePage/socials/facebook_icon.png'
import YouTubeIcon from '../../images/HomePage/socials/youtube_icon.png'
import './socialsBlock.scss'

const SocialsBlock = () => {
	return (
		<div className='socials-wrapper'>
			<a href='https://instagram.com' target='_blank' rel='noreferrer'>
				<img className='socials-logo' src={InstagramIcon} alt='Instagram Link' />
			</a>

			<a href='https://facebook.com' target='_blank' rel='noreferrer'>
				<img className='socials-logo' src={FacebookIcon} alt='Facebook Link' />
			</a>

			<a href='https://youtube.com' target='_blank' rel='noreferrer'>
				<img className='socials-logo' src={YouTubeIcon} alt='YouTube Link' />
			</a>
		</div>
	)
}

export default SocialsBlock
