'use client'

import styles from './page.module.scss'
import Attendee from './Attendee'
import Organizer from './Organizer'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useUserTypeContext } from '../../providers/UserTypeProvider'
import { useIsScanningContext } from '../../providers/IsScanningProvider'

import { auth, db } from '../../../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, updateDoc } from 'firebase/firestore'

import { Skeleton } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export default function OnboardingForm() {

    const [user] = useAuthState(auth)
    const router = useRouter()
    const { userType } = useUserTypeContext()
    const { isScanning, eventID } = useIsScanningContext()

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

        if (isScanning) {
            router.push(`/scan/${eventID}`)
        } else {
            router.push('/')
        }
    }

    return (
        <div className={`${inter.className} ${styles.form}`}>
            <div className={styles.header}>
                <h1>Let&apos;s get to know you.</h1>
            </div>
            <div className={styles['form-body']}>
                {!userType ? 
                    <Skeleton variant="rectangular" animation='wave' width="100%" height="26.1rem" />
                    :
                    <>
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
                    </>
                }
            </div>
            <div className={styles['terms-cont']}>
                <div className={styles['input-cont']}>
                    <input type="checkbox" /> 
                </div>
                <div className={styles['content-cont']}>
                        I agree with the&nbsp; <div className={styles['text-red']}> Terms and Conditions </div>.
                </div>
            </div>
            <div className={styles['button-container']}>
                <button className={styles.button} 
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

        </div>
    )
}