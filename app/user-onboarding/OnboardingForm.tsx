'use client'

import styles from './page.module.css'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useUserTypeContext } from '../UserTypeProvider'

import { auth, db } from '../../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, updateDoc } from 'firebase/firestore'

import { Button } from '@mui/material'
import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

    const updateInfo = async () => {

        const ref = doc(db, 'attendees', `${user?.uid}`)

        await updateDoc(ref, {
            firstName: firstName,
            lastName: lastName,
            studentNumber: studentNumber,
            yearLevel: yearLevel,
            college: college,
            program: program,
        })

        router.push('/')
    }

    return (
        <div className={`${inter.className} ${styles.form}`}>
            <div id="formHeader">
                <Link href="/"> 
                    <IconButton size="large"
                        sx={{
                            color: '#a70000',
                            fontWeight: 'bold',
                            padding: '0',
                            top: '0',
                            
                        }}> 
                        <ArrowBackIcon /> 
                    </IconButton> 
                </Link>

                <h2>Let&apos;s get to know you.</h2>
            </div>

            { userType === 'attendee' ?
                <>
                    <div>
                        <p>First Name</p>
                        <input 
                            type="text" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>Last Name</p>
                        <input 
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} 
                        />
                    </div>
                    <div>
                        <p>Student Number</p>
                        <input 
                            type="text"
                            value={studentNumber}
                            onChange={(e) => setStudentNumber(e.target.value)}
                        />
                    </div>
                    <p>Year Level</p>
                    <div id="inputDropdown">
                        <select value={yearLevel} onChange={(e) => setYearLevel(e.target.value)} >
                            <option value="" selected disabled hidden></option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                        </select>
                    </div>
                    <p>College/Department</p>
                    <div id="inputDropdown">
                        <select value={college} onChange={(e) => setCollege(e.target.value)}>
                            <option value="" selected disabled hidden></option>
                            <option value="csm">College of Science and Mathematics</option>
                            <option value="chss">College of Humanities and Social Sciences</option>
                            <option value="som">School of Management</option>
                        </select>
                    </div>
                    <p>Degree Program</p>
                    <div id="inputDropdown">
                        <select value={program} onChange={(e) => setProgram(e.target.value)}>
                            <option value="" selected disabled hidden></option>
                            {
                                college === 'csm' ? 
                                <>
                                    <option value="cs">BS in Computer Science</option>
                                    <option value="amat">BS in Applied Mathematics</option>
                                    <option value="Bio">BS in Biology</option>
                                    <option value="ft">BS in Food Technology</option>
                                </>

                                : college === 'chss' ? 
                                <>
                                    <option value="bae">BA in English</option>
                                    <option value="bacma">BA in Communications and Media Arts</option>
                                    <option value="anthro">BA in Anthropology</option>
                                    <option value="bsa">BS in Architecture</option>
                                    <option value="bss">Bachelor of Sports Science</option>
                                </>

                                : college === 'som' ?
                                <>
                                    <option value="abe">BS in Agribusiness Economics</option>
                                </>

                                : 
                                <>
                                    <option value="cs">BS in Computer Science</option>
                                    <option value="amat">BS in Applied Mathematics</option>
                                    <option value="Bio">BS in Biology</option>
                                    <option value="ft">BS in Food Technology</option>
                                    <option value="bae">BA in English</option>
                                    <option value="bacma">BA in Communications and Media Arts</option>
                                    <option value="anthro">BA in Anthropology</option>
                                    <option value="bsa">BS in Architecture</option>
                                    <option value="bss">Bachelor of Sports Science</option>
                                    <option value="abe">BS in Agribusiness Economics</option>
                                </>
                            }
                            
                        </select>
                    </div>
                </>
                :
                <>
                    <div>User Onboarding Form for Organizer.</div>
                </>
            }

            
            <div id={styles.terms}>
                <input type="checkbox" /> I agree with the Terms and Conditions. 
            </div>
            <Button 
                variant="text" 
                className={inter.className}
                sx={{
                    mx: 'auto',
                    backgroundColor: '#a70000',
                    color: '#fff',
                    fontWeight: 'bold',
                    width: '100%',
                    height: '3.5em',
                    borderRadius: '1em',
                    mt: 'auto'
                }}
                onClick={() => {
                    if (firstName && lastName && studentNumber && yearLevel && college && program) {
                        updateInfo()
                    } else {
                        alert('Please fill in all the fields.')
                    }
                }}
            >
                Finish
            </Button> 
        </div>
    )
}