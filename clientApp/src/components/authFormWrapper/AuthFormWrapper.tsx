import React, { ReactChildren, ReactChild } from 'react'
import styles from './authFormWrapper.module.scss'

interface Props {
	formLabel: string
	children:any
}

const AuthFormWrapper = (props:Props) => {
	return (
		<div className={styles.wrapper}>
			<h1 className={styles.formLabel}>{props.formLabel}</h1>
			{props.children}
		</div>
	)
}

export default AuthFormWrapper
