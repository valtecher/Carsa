import React from 'react'
import Header from '../../components/header/Header'
import styles from './loginPage.module.scss'
import LoginForm from '../../components/loginForm/LoginForm'

const LoginPage = () => {
	return (
		<div className={styles.wrapper}>
			<Header />
			<LoginForm />
		</div>
	)
}

export default LoginPage
