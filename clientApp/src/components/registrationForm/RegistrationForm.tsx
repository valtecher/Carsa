import React, {FormEvent, useEffect, useRef, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Formik, Form, FormikHelpers} from 'formik'
import {useDispatch} from 'react-redux'
import {map} from 'rxjs/operators'
import {fromEvent} from 'rxjs'
import axios from 'axios'
import {loginFailed, loginSuccess, saveUser} from '../../redux/actions/authActions'
import styles from './registrationForm.module.scss'
import FormField from '../formField/FormField'
import AuthFormWrapper from '../authFormWrapper/AuthFormWrapper'


// eslint-disable-next-line no-control-regex
const EMAIL_PATTERN = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ // Minimum eight characters, at least one letter and one number

interface FormValues {
    firstName: string
    lastName: string
    email: string
    password: string
}

const RegistrationForm = () => {
    const [formValues, setFormValues] = useState({firstName: '', lastName: '', email: '', password: ''})
    const [touchedValues, setTouchedValues] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false
    })
    const [validationErrors, setValidationErrors] = useState({
        firstName: true,
        lastName: true,
        emailError: true,
        passwordError: true
    })

    const nameInput = useRef<HTMLInputElement>(null)
    const surnameInput = useRef<HTMLInputElement>(null)
    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        const nameChange$ = fromEvent<InputEvent>(nameInput.current!, "input"),
            surnameChange$ = fromEvent<InputEvent>(surnameInput.current!, "input"),
            emailChange$ = fromEvent<InputEvent>(emailInput.current!, "input"),
            passwordChange$ = fromEvent<InputEvent>(passwordInput.current!, "input")

        nameChange$
            .pipe(map((event: InputEvent) => (event.target as HTMLInputElement).value))
            .subscribe(firstName => {
                if (firstName.length < 2 || firstName.length > 20)
                    setValidationErrors(prevState => ({...prevState, firstName: true}))
                else
                    setValidationErrors(prevState => ({...prevState, firstName: false}))

                setFormValues(prevState => ({...prevState, firstName}))
                setTouchedValues(prevState => ({...prevState, firstName: true}))
            })

        surnameChange$
            .pipe(map((event: InputEvent) => (event.target as HTMLInputElement).value))
            .subscribe(lastName => {
                if (lastName.length < 2 || lastName.length > 20)
                    setValidationErrors(prevState => ({...prevState, lastName: true}))
                else
                    setValidationErrors(prevState => ({...prevState, lastName: false}))

                setFormValues(prevState => ({...prevState, lastName}))
                setTouchedValues(prevState => ({...prevState, lastName: true}))
            })

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
        axios.post(process.env.REACT_APP_API_URL + '/auth/register', {
            first_name: formValues.firstName,
            last_name: formValues.lastName,
            email: formValues.email,
            phone: '+38095' + Date.now().toString().substring(0, 7),
            password: formValues.password,
        })
            .then(response => {
                if (response.status === 201) {
                    dispatch(loginSuccess())
                    // @ts-ignore
                    const token: string = response.data.accessToken
                    dispatch(saveUser({
                        user: {
                            email: formValues.email,
                            name: `${formValues.firstName} ${formValues.lastName}`,
                            token: token
                        },
                        isAuthenticated: true,
                        isLoading: false
                    }))
                    history.push('/')
                }
            })
            .catch(error => {
                console.log(error)
                dispatch(loginFailed())
            })

        setSubmitting(false)
    }

    return (
        <AuthFormWrapper formLabel='Sign Up'>
            <Formik
                initialValues={formValues}
                onSubmit={handleSubmit}
            >
                <Form noValidate >
                    <FormField
                        id='firstName'
                        name='firstName'
                        ref={nameInput}
                        className={touchedValues.firstName ? (validationErrors.firstName ? 'invalid' : 'valid') : ''}
                        value={formValues.firstName}
                        placeholder='NAME'
                        type='text'
                    />
                    <FormField
                        id='lastName'
                        name='lastName'
                        ref={surnameInput}
                        className={touchedValues.lastName ? (validationErrors.lastName ? 'invalid' : 'valid') : ''}
                        value={formValues.lastName}
                        placeholder='SURNAME'
                        type='text'
                    />
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

                    <button className={styles.submitButton} type='submit'>Register</button>
                </Form>
            </Formik>

            <Link className={styles.loginLink} to='/login'>Already have an account?</Link>
        </AuthFormWrapper>
    )
}

export default RegistrationForm