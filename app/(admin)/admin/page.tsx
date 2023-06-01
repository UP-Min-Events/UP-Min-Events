import Events from "./Events"
import Attendees from "./Attendees"
import Organizers from './Organizers'
import styles from './page.module.scss'

export default function Page() {
    return (
        <div className={styles.container}>
            <div className={styles['client-header']}> 
                <h1> Admin Client  </h1>
                <div className={styles['warning']}>
                    <p> All information are valuable. Take caution. </p>
                </div>
                <div className={styles.divider}></div>
            </div>
            <div>
                <Events />
                <Attendees />
                <Organizers />
            </div>
        </div>
    )
}