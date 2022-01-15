import React from 'react'
import styles from './contactsBlock.module.scss'
import ContactsCell from "./contactsCell/ContactsCell";

const ContactsBlock = () => {
    return (
        <div className={styles['contacts-wrapper']}>
            <ContactsCell label={'EMAIL'} content={['bitok@gmail.com']}/>
            <ContactsCell label={'PHONE'} content={['+48 888 501']}/>
            <ContactsCell label={'ADDRESS'} content={['ul. Górczewska 30', '01-147 Warszawa', 'NIP: 123456351']}/>
            <ContactsCell label={'OPENING HOURS'} content={['Pon - Pt 10:00-18:00']}/>
        </div>
    )
}

export default ContactsBlock