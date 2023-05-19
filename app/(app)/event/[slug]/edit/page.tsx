import EditForm from './EditForm'
import styles from './page.module.scss'
import Navigation from './Navigation'

export default function Page({ params : { slug }} 
    : { params : { slug : string }}) {

    return (
        <div className={styles['page-wrapper']}>
            <Navigation id={slug} />
            <EditForm id={slug} />
        </div>
    )
}
