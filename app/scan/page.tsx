import Scan from './Scan'
import Link from 'next/link'

export default function Page() {

    return (
        <div>
            <Link href="/">
                Home
            </Link>
            <Scan />
        </div>
    );
}
