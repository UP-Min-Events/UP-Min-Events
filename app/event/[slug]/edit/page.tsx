import Link from 'next/link'
import EditForm from './EditForm'
import styles from './page.module.scss'

export default function Page({ params : { slug }} 
    : { params : { slug : string }}) {

    return (
        <div className={styles.page}>
            <div className={styles['navigation-wrapper']}>
                <Link href={`/event/${slug}`}>Back</Link>
            </div>
            <EditForm id={slug} />
        </div>
    )
}
