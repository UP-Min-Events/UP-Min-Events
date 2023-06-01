import styles from './page.module.scss'

export default function Event({ 
    name, 
    id,
    deleteItem,
}: {
    name: string;
    id: string;
    deleteItem: (id: string) => Promise<void>;
}) {

    const handleDelete = () => {
        deleteItem(id)
    }

    return(
        <div className={styles['info-feed-wrapper']}>
            <div className={styles.info}>
                <div className={styles['info-title']}>
                    {name}
                </div>
                <div className={styles['info-id']}>
                    <p> Event ID: {id} </p>
                </div>
                <button onClick={handleDelete}> 
                    Delete Event
                </button>
            </div>
        </div>
    )
}