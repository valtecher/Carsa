import React from 'react'
import Aos from 'aos';
import styles from './sectionTitle.module.scss'
import 'aos/dist/aos.css'

Aos.init({
    offset: 200,
    duration: 800,
    easing: "ease-in-sine",
    delay: 100
})

interface Props {
    label: string
}

const SectionTitle = ({label}: Props) => {
    return (
        <div data-aos="fade-in" className={styles.wrapper}>
            <p className={styles.title}>{label}</p>
        </div>
    )
}

export default SectionTitle