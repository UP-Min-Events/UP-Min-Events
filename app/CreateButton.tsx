'use client'

import Link from 'next/link'

export default function CreateButton() {
    return(
        <div>
            <Link href="/create">
                <button>Create</button>
            </Link>
        </div>
    )
}