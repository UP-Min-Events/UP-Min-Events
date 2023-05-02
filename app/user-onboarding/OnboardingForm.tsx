'use client'

import '../globals.css'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { auth, db } from '../../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, updateDoc, query, collection, where, limit, getDocs } from 'firebase/firestore'

import { Button } from '@mui/material'
import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const inter = Inter({ subsets: ['latin'] })

export default function OnboardingForm() {

    const [user] = useAuthState(auth)
    const router = useRouter()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [studentNumber, setStudentNumber] = useState('')
    const [yearLevel, setYearLevel] = useState('')
    const [college, setCollege] = useState('')
    const [program, setProgram] = useState('')

    const updateInfo = async () => {
        const q = query(collection(db, 'attendees'), where('uid', '==', user?.uid), limit(1))
        const querySnapshot = await getDocs(q)
        const ref = doc(db, 'attendees', querySnapshot.docs[0].id)

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
        <div className={inter.className}>
            <Link href="/"> 
                <IconButton size="large"
                    sx={{
                        position: 'fixed',
                        left: '2rem',
                        color: '#a70000',
                        fontWeight: 'bold',
                        transform: 'translateY(-50%)',
                    }}> 
                    <ArrowBackIcon /> 
                </IconButton> 
            </Link>

            <h2>Let&apos;s get to know you.</h2>

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
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                </select>
            </div>
            <p>College/Department</p>
            <div id="inputDropdown">
                <select value={college} onChange={(e) => setCollege(e.target.value)}>
                    <option value="" selected disabled hidden></option>
                    <option value="">College of Science and Mathematics</option>
                    <option value="">College of Humanities and Social Sciences</option>
                    <option value="">School of Management</option>
                    <option value="">Department of Human Kinetics</option>
                </select>
            </div>
            <p>Degree Program</p>
            <div id="inputDropdown">
                <select value={program} onChange={(e) => setProgram(e.target.value)}>
                    <option value="" selected disabled hidden></option>
                    <option value="">BS in Computer Science</option>
                    <option value="">BS in Applied Mathematics</option>
                    <option value="">BS in Biology</option>
                    <option value="">BS in Food Technology</option>
                </select>
            </div>
            <div id="terms">
                I agree with the Terms and Conditions.
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