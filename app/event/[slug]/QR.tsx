import Image from 'next/image'

import styles from './page.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
    id: string,
    handleShowDetails: () => void,
}

export default function QR({ id, handleShowDetails } : Props) {


    return(
        <div className={styles.container}>
            <div className={styles.nav}>
                <ArrowBackIcon onClick={handleShowDetails} sx={{ color: '#a70000', scale: '150%' }} />
            </div>
            <div className={styles.header}>
                <h1>Event Title</h1>
            </div>
            <div id={styles.QR}>
                <Image 
                        src={`https://api.qrserver.com/v1/create-qr-code/?data=${id}&size=200x200`} 
                        alt='QR Code' 
                        width="250" 
                        height="250" 
                        priority
                    />
            </div>
            <div className={styles.button}>
                <button className={styles.buttonL}><h2>Save QR</h2></button>
            </div>
        </div>
    )
}