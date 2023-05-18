'use client'

import styles from '../page.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useUserTypeContext } from '../../providers/UserTypeProvider'

import { auth, db } from '../../../firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

interface Name {
    firstName : string,
    lastName : string,
    yearLevel : string,
    studentNumber: string,
    program: string,
    college: string
}

export default function Name() {

    const [user] = useAuthState(auth)
    const id = user?.uid
    const { userType } = useUserTypeContext()

    const [toggleFirst, setToggleFirst] = useState(false)
    const [toggleLast, setToggleLast] = useState(false)
    const [toggleYear, setToggleYear] = useState(false)
    const [toggleStudNum, setToggleStudNum] = useState(false)
    const [toggleProgram, setToggleProgram] = useState(false)
    const [toggleCollege, setToggleCollege] = useState(false)
    
    const [input, setInput] = useState<Name>({ firstName: '', lastName: '', yearLevel: '', studentNumber: '', program: '', college: '' })

    const getDetail = async () => {
        let collection

        if (userType === 'attendee') {
            collection = 'attendees'
        } else if (userType === 'organizer') {
            collection = 'organizers'
        }

        const docSnap = await getDoc(doc(db, `${collection}`, `${id}`))

        if (docSnap.exists()) {
            setInput(docSnap.data() as Name)
        }
    }

    const updateDetail = async () => {
        let collection
        if (userType === 'attendee') {
            collection = 'attendees'
        } else if (userType === 'organizer') {
            collection = 'organizers'
        }

        const docRef = doc(db, `${collection}`, `${id}`)
        await updateDoc(docRef, {
            firstName: input.firstName,
            lastName: input.lastName,
            yearLevel: input.yearLevel,
            studentNumber: input.studentNumber,
            program: input.program,
            college: input.college
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
                    <button className={styles['save-setting']}> Save </button>
            </div>

            <div className={styles['form-body']}>
                <div className={styles['form-section']}>

                    <div className={styles['form-item']}>
                        <p className={styles['input-label']}> First Name </p>
                        <div className={styles['input-wrapper']}>
                            { toggleFirst ?
                                <div>
                                    <input className={styles['input-element']} value={input.firstName} onChange={e => setInput({ ...input, firstName: e.target.value })} placeholder={input.firstName} />
                                    <button onClick={() => {
                                        updateDetail()
                                        setToggleFirst(false)
                                    }}>Save</button>
                                </div>
                                :
                                <p onClick={() => setToggleFirst(true)}>{input.firstName}</p>
                            }
                        </div>
                    </div>

                    <div className={styles['form-item']}>
                        <p className={styles['input-label']}> Last Name </p>
                        <div className={styles['input-wrapper']}>
                        { toggleLast ?
                            <div>
                                <input className={styles['input-element']} value={input.lastName} onChange={e => setInput({ ...input, lastName: e.target.value })} placeholder={input.lastName} />
                                <button onClick={() => {
                                    updateDetail()
                                    setToggleLast(false)
                                }}>Save</button>
                            </div>
                            :
                            <p onClick={() => setToggleLast(true)}>{input.lastName}</p>
                        }
                        </div>
                    </div>
                    
                    {userType === 'attendee' ? 
                        <div className={styles['form-section']}>
                            <div className={styles['form-item']}>
                                <p className={styles['input-label']}> Student Number </p>
                                <div className={styles['input-wrapper']}>
                                { toggleStudNum ?
                                    <div>
                                        <input className={styles['input-element']} onChange={e => setInput({ ...input, studentNumber: e.target.value })} placeholder={input.studentNumber} />
                                        <button onClick={() => {
                                            updateDetail()
                                            setToggleStudNum(false)
                                        }}>Save</button>
                                    </div>
                                    :
                                    <p onClick={() => setToggleStudNum(true)}>{input.studentNumber}</p>
                                }
                                </div>
                            </div>

                            <div className={styles['form-item']}>
                                <p className={styles['input-label']}> Year Level </p>
                                <div className={styles['input-wrapper']}>
                                { toggleYear ?
                                    <div>
                                        <select className={styles['input-element']} onChange={e => setInput({ ...input, yearLevel: e.target.value })} placeholder={input.yearLevel}>
                                            <option value='1'>1st Year</option>
                                            <option value='2'>2nd Year</option>
                                            <option value='3'>3rd Year</option>
                                            <option value='4'>4th Year</option>
                                        </select>
                                        <button onClick={() => {
                                            updateDetail()
                                            setToggleYear(false)
                                        }}>Save</button>
                                    </div>
                                    :
                                    <p onClick={() => setToggleYear(true)}>{input.yearLevel} </p>
                                }
                                </div>
                            </div>
                            
                            <div className={styles['form-item']}>
                                <p className={styles['input-label']}> Degree Program </p>
                                <div className={styles['input-wrapper']}>
                                { toggleProgram ?
                                    <div>
                                        <select className={styles['input-element']} onChange={e => setInput({ ...input, program: e.target.value })} placeholder={input.program}>
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
                                        <button onClick={() => {
                                            updateDetail()
                                            setToggleProgram(false)
                                        }}>Save</button>
                                    </div>
                                    :
                                    <p onClick={() => setToggleProgram(true)}> 
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
                                            : 'Select Degree Program'
                                        }
                                    </p>
                                }
                                </div>
                            </div>
                        </div>
                    : 
                        <div className={styles['form-section']}>
                            <div className={styles['form-item']}>
                                <p className={styles['input-label']}> Organization </p>
                                <div className={styles['input-wrapper']}>
                                { toggleLast ?
                                    <div>
                                        <input className={styles['input-element']} onChange={e => setInput({ ...input, lastName: e.target.value })} placeholder="Organization" />
                                        <button onClick={() => {
                                            updateDetail()
                                            setToggleCollege(false)
                                        }}>Save</button>
                                    </div>
                                    :
                                    <p onClick={() => setToggleCollege(true)}> Organization </p>
                                }
                                </div>
                            </div>
                        </div>
                    }

                    <div className={styles['form-item']}>
                        <p className={styles['input-label']}> College </p>
                        <div className={styles['input-wrapper']}>
                        { toggleCollege?
                            <div>
                                <select className={styles['input-element']} onChange={e => setInput({ ...input, college: e.target.value })} placeholder={input.college}>
                                    <option value='csm'>College of Science and Mathematics</option>
                                    <option value='chss'>College of Humanities and Social Sciences</option>
                                    <option value='som'>School of Management</option>
                                </select>
                                <button onClick={() => {
                                    updateDetail()
                                    setToggleCollege(false)
                                }}>Save</button>
                            </div>
                            :
                            <p onClick={() => setToggleCollege(true)}>
                                {
                                    input.college === 'csm' ? 'College of Science and Mathematics' :
                                    input.college === 'chss' ? 'College of Humanities and Social Sciences' :
                                    input.college === 'som' ? 'School of Management' : 'No Data Available'
                                }   
                            </p>
                        }
                        </div>
                    </div>
                                    
                </div>
            </div>
        </div>
    )
}