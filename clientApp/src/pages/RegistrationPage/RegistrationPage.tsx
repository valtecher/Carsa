import React from 'react'
import Header from '../../components/header/Header'
import RegistrationForm from '../../components/registrationForm/RegistrationForm'
import styles from './registrationPage.module.scss'

const RegistrationPage = () => {
	return (
		<div className={styles.wrapper}>
			<Header />
			<RegistrationForm />
		</div>
	)
}

export default RegistrationPage
