import Scan from './Scan'
import Attend from './Attend'
import Link from 'next/link'

export default function Page() {

    return (
        <div>
            <Link href="/">
                Home
            </Link>
            <Scan />
            <Attend />
        </div>
    );
}
