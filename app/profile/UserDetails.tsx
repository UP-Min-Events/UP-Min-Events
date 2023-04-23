import Link from 'next/link'

export default function UserDetails(){
    return (
        <div>
            <div>
                <Link href="/profile/student-number">Student Number</Link>
                <Link href="/profile/degree-program">Degree Program</Link>
                <Link href="/profile/college-department">College/Department</Link>
            </div>
            <div>
                <Link href="/profile/about">About</Link>
                <Link href="/profile/notifications">Notifications</Link>
                <Link href="/profile/privacy-safety">Privacy and Safety</Link>
            </div>
        </div>
    )
}