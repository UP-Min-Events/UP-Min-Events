'use client'

import styles from './page.module.css'
import Link from 'next/link'
import Attendee from './Attendee'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useUserTypeContext } from '../UserTypeProvider'

import { auth, db } from '../../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, updateDoc } from 'firebase/firestore'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Organizer from './Organizer'

const inter = Inter({ subsets: ['latin'] })

export default function OnboardingForm() {

    const [user] = useAuthState(auth)
    const router = useRouter()
    const { userType } = useUserTypeContext()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [studentNumber, setStudentNumber] = useState('')
    const [yearLevel, setYearLevel] = useState('')
    const [college, setCollege] = useState('')
    const [program, setProgram] = useState('')
    const [affiliatedOrganization, setAffiliatedOrganization] = useState<string[]>([])

    const updateInfo = async () => {
        if (userType === 'attendee') {

            const ref = doc(db, 'attendees', `${user?.uid}`)

            await updateDoc(ref, {
                firstName: firstName,
                lastName: lastName,
                studentNumber: studentNumber,
                yearLevel: yearLevel,
                college: college,
                program: program,
            })
        } else {

            const ref = doc(db, 'organizers', `${user?.uid}`)

            await updateDoc(ref, {
                firstName: firstName,
                lastName: lastName,
                college: college,
                affiliatedOrganization: affiliatedOrganization,
            })
        }

        router.push('/')
    }

    return (
        <div className={`${inter.className} ${styles.form}`}>
            <div className={styles.nav}>
                <Link href="/">
                    <ArrowBackIcon sx={{ color: '#a70000', scale: '150%', p: '0', }}/>
                </Link>
            </div>

            <div className={styles.header}>
                <h2>Let&apos;s get to know you.</h2>
            </div>

            {userType === 'attendee' ?
                <Attendee
                    firstName={firstName} setFirstName={setFirstName}
                    lastName={lastName} setLastName={setLastName}
                    studentNumber={studentNumber} setStudentNumber={setStudentNumber}
                    yearLevel={yearLevel} setYearLevel={setYearLevel}
                    college={college} setCollege={setCollege}
                    program={program} setProgram={setProgram}
                />
                :
                <Organizer
                    firstName={firstName} setFirstName={setFirstName}
                    lastName={lastName} setLastName={setLastName}
                    college={college} setCollege={setCollege}
                    affiliatedOrganization={affiliatedOrganization} setAffiliatedOrganization={setAffiliatedOrganization}
                />

            }

            <button className={styles.buttonL} 
                onClick={() => {
                    const requiredFieldsAttendee = [firstName, lastName, studentNumber, yearLevel, college, program];
                    const requiredFieldsOrganizer = [firstName, lastName, college];
                    
                    if (
                        userType === 'attendee' && requiredFieldsAttendee.every(field => field.trim() !== '')
                    ) {
                        updateInfo();
                    } else if (
                        userType === 'organizer' && requiredFieldsOrganizer.every(field => field.trim() !== '') &&
                        affiliatedOrganization.length > 0
                    ) {
                        updateInfo();
                    } else {
                        alert('Please fill in all the fields.');
                    }
                }}
            >
                Finish
            </button>

        </div>
    )
}