import React from 'react'
import styles from './contactsCell.module.scss'

interface Props {
    label: string
    content: Array<string>
}

const ContactsCell = ({label, content}: Props) => {
    return (
        <div className={styles['contacts-cell']}>
            <p className={styles['cell-label']}>{label}</p>
            <div className={styles['cell-content']}>
                {
                    content.map(line => <p>{line}</p>)
                }
            </div>
        </div>
    )
}

export default ContactsCell