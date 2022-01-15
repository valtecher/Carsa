import React, {forwardRef} from 'react'
import {ErrorMessage} from 'formik'
import styles from './formField.module.scss'

interface Props {
    id: string
    name: string
    placeholder: string
    type: string
    className?: string
    value?: string,
}

const FormField = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const {id, name, placeholder, type, value, className} = props

    return (
        <div className={styles.wrapper}>
            <input
                id={id}
                name={name}
                ref={ref}
                className={className ? styles[className] : ''}
                value={value}
                placeholder={placeholder}
                type={type}
            />
            <ErrorMessage className={styles.errorMessage} component='span' name={name}/>
        </div>
    )
})

export default FormField