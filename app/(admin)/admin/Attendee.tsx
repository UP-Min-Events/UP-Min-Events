import styles from './page.module.scss'

export default function Attendee({
    firstName,
    lastName,
    studentNumber,
    id,
    deleteItem
}:{
    firstName: string
    lastName: string
    studentNumber: string
    id: string
    deleteItem: (id: string) => Promise<void>
}) {

    const handleDelete = () => {
        deleteItem(id)
    }

    return(
        <div className={styles['info-feed-wrapper']}>
            <div className={styles.info}>
                <div className={styles['info-title']}>
                    {firstName} {lastName}
                </div>
                <div>
                    <p> Student Number: {studentNumber} </p>
                </div>
                <div className={styles['info-id']}>
                    <p> User ID: {id} </p>
                </div>
                <button onClick={handleDelete}>Delete Account</button>
            </div>
        </div>
    )
}