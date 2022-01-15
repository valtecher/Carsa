import React, {useEffect, useRef, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Formik, Form, FormikHelpers} from 'formik'
import {useDispatch} from 'react-redux'
import {fromEvent} from 'rxjs'
import {map} from 'rxjs/operators'
import axios from 'axios'
import FormField from '../formField/FormField'
import AuthFormWrapper from '../authFormWrapper/AuthFormWrapper'
import styles from './loginForm.module.scss'

import {loginFailed, loginSuccess, saveUser} from '../../redux/actions/authActions'

// eslint-disable-next-line no-control-regex
const EMAIL_PATTERN = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ // Minimum eight characters, at least one letter and one number

interface FormValues {
    email: string
    password: string
}

const LoginForm = () => {
    const [formValues, setFormValues] = useState({email: '', password: '',})
    const [touchedValues, setTouchedValues] = useState({email: false, password: false})
    const [validationErrors, setValidationErrors] = useState({emailError: true, passwordError: true})

    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)

    const history = useHistory()
    const dispatch = useDispatch()


    useEffect(() => {
        const emailChange$ = fromEvent<InputEvent>(emailInput.current!, "input"),
            passwordChange$ = fromEvent<InputEvent>(passwordInput.current!, "input")

        emailChange$
            .pipe(map((event: InputEvent) => (event.target as HTMLInputElement).value))
            .subscribe(email => {
                if (!email.match(EMAIL_PATTERN))
                    setValidationErrors(prevState => ({...prevState, emailError: true}))
                else
                    setValidationErrors(prevState => ({...prevState, emailError: false}))

                setFormValues(prevState => ({...prevState, email}))
                setTouchedValues(prevState => ({...prevState, email: true}))
            })

        passwordChange$
            .pipe(map((event: InputEvent) => (event.target as HTMLInputElement).value))
            .subscribe(password => {
                if (!password.match(PASSWORD_PATTERN))
                    setValidationErrors(prevState => ({...prevState, passwordError: true}))
                else
                    setValidationErrors(prevState => ({...prevState, passwordError: false}))

                setFormValues(prevState => ({...prevState, password}))
                setTouchedValues(prevState => ({...prevState, password: true}))
            })
    }, [])

    const handleSubmit = (values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
        axios.post('http://localhost:3000/api/auth/login', {
            email: formValues.email,
            password: formValues.password,
        })
            .then(response => {
                if (response.status === 200) {
                    dispatch(loginSuccess())
                    dispatch(saveUser({
                        user: {
                            email: formValues.email,
                            token: response.data as string
                        },
                        isAuthenticated: true,
                        isLoading: false
                    }))
                    history.push('/')
                }else {
                    console.log('Login failed')
                    dispatch(loginFailed())
                }
            })
            .catch(error => {
                console.log(error)
                dispatch(loginFailed())
            })

        setSubmitting(false)
    }

    return (
        <AuthFormWrapper formLabel='Log In'>
            <Formik
                initialValues={formValues}
                onSubmit={handleSubmit}
            >
                <Form noValidate>
                    <FormField
                        id='email'
                        name='email'
                        ref={emailInput}
                        className={touchedValues.email ? (validationErrors.emailError ? 'invalid' : 'valid') : ''}
                        value={formValues.email}
                        placeholder='EMAIL'
                        type='email'
                    />
                    <FormField
                        id='password'
                        name='password'
                        ref={passwordInput}
                        className={touchedValues.password ? (validationErrors.passwordError ? 'invalid' : 'valid') : ''}
                        value={formValues.password}
                        placeholder='PASSWORD'
                        type='password'
                    />

                    <Link className={styles.forgotPasswordLink} to='/home'>Forgot password?</Link>
                    <button className={styles.submitButton} type='submit'>Log in</button>
                </Form>
            </Formik>

            <Link className={styles.signupLink} to='/register'>
                Sign up now
            </Link>
        </AuthFormWrapper>
    )
}

export default LoginForm