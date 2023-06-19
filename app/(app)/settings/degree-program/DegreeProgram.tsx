'use client'

import styles from '../page.module.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import { auth, db } from '@/firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

interface Data {
    program : string
    college : string
}

export default function DegreeProgram(){

    const [user] = useAuthState(auth)
    const id = user?.uid

    const [toggle, setToggle] = useState(false)
    const [input, setInput] = useState<Data>({ program: '', college: '' })

    const getDetail = async () => {
        const docRef = doc(db, 'attendees', `${id}`)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
            setInput(docSnap.data() as Data)
        } 

    }

    const updateDetail = async () => {
        const docRef = doc(db, 'attendees', `${id}`)
        await updateDoc(docRef, {
            program: input.program
        })
    }

    useEffect(() => {
        getDetail()
    }, [])
 
    return (
        <div>
            <div className={styles.nav}>
                    <Link href="/settings"> 
                        <ArrowBackIcon sx={{ scale: '125%', color: '#a70000', p: '0' }} /> 
                    </Link> 
                    <button className={styles['save-setting']} onClick={() => { updateDetail() }}> Save </button>
            </div>

            <div className={styles['form-body']}>
                <div className={styles['form-item']}>
                    <p className={styles['input-label']}> Degree Program </p>
                    { toggle ?
                        <div>
                            <select className={styles['input-element']} value={input.program} onChange={e => setInput({ ...input, program: e.target.value})} placeholder={input.program}>
                                {
                                    input.college === 'csm' ?
                                    <>
                                        <option value='cs'>BS in Computer Science</option>
                                        <option value='amat'>BS in Applied Mathematics</option>
                                        <option value='bio'>BS in Biology</option>
                                        <option value='ft'>BS in Food Technology</option>
                                    </>

                                    : input.college === 'chss' ?
                                    <>
                                        <option value='bae'>BA in English</option>
                                        <option value="bacma">BA in Communications and Media Arts</option>
                                        <option value="anthro">BA in Anthropology</option>
                                        <option value="bsa">BS in Architecture</option>
                                        <option value="bss">Bachelor of Sports Science</option>
                                    </>

                                    : input.college === 'som' ?
                                    <>
                                        <option value='abe'>BS in Agribusiness Economics</option>
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
                        : 
                        <p className={styles['input-element']} onClick={() => setToggle(true)}>
                            {
                                input.program === 'cs' ? 'BS in Computer Science'
                                : input.program === 'amat' ? 'BS in Applied Mathematics'
                                : input.program === 'bio' ? 'BS in Biology'
                                : input.program === 'ft' ? 'BS in Food Technology'
                                : input.program === 'bae' ? 'BA in English'
                                : input.program === 'bacma' ? 'BA in Communications and Media Arts'
                                : input.program === 'anthro' ? 'BA in Anthropology'
                                : input.program === 'bsa' ? 'BS in Architecture'
                                : input.program === 'bss' ? 'Bachelor of Sports Science'
                                : input.program === 'abe' ? 'BS in Agribusiness Economics' 
                                : 'Select your degree program'
                            }
                        </p> 
                    }
                </div>
            </div>

        </div>
    )
}