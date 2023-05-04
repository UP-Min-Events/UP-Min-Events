import Image from 'next/image'

interface Props {
    id: string,
    handleShowDetails: () => void,
}

export default function QR({ id, handleShowDetails } : Props) {
    return(
        <div>
            <button onClick={handleShowDetails}>Back</button>
            <Image 
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${id}&size=200x200`} 
                alt='QR Code' 
                width="200" 
                height="200" 
                priority
            />
        </div>
    )
}