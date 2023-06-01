import styles from './page.module.scss'

export default function Attendee({
    firstName,
    lastName,
    id,
    deleteItem,
}:{
    firstName: string
    lastName: string
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
                <div className={styles['info-id']}>
                    {id}
                </div>
                <button onClick={handleDelete}>
                    Delete Organizer
                </button>
            </div>
        </div>
    )
}