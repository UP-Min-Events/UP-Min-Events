import styles from './page.module.scss'

interface Props {
    firstName: string;
    lastName: string;
    studentNumber: string;
    yearLevel: string;
    college: string;
    program: string;
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setStudentNumber: (studentNumber: string) => void;
    setYearLevel: (yearLevel: string) => void;
    setCollege: (college: string) => void;
    setProgram: (program: string) => void;
}

export default function Attendee({
    firstName, 
    lastName, 
    studentNumber, 
    yearLevel, 
    college, 
    program, 
    setFirstName, 
    setLastName, 
    setStudentNumber, 
    setYearLevel,
    setCollege, 
    setProgram
} : Props ){
    return (
        <div className={styles.formBody}>
            <div className={styles.formItem}>
                <p>First Name</p>
                <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className={styles.formItem}>
                <p>Last Name</p>
                <input 
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} 
                />
            </div>
            <div className={styles.formItem}>
                <p>Student Number</p>
                <input 
                    type="text"
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                />
            </div>
            <div className={styles.formItem}>
                <p>Year Level</p>
                <select value={yearLevel} onChange={(e) => setYearLevel(e.target.value)} >
                    <option value="" selected disabled hidden></option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                </select>
            </div>
            <div className={styles.formItem}>
                <p>College/Department</p>
                <select value={college} onChange={(e) => setCollege(e.target.value)}>
                    <option value="" selected disabled hidden></option>
                    <option value="csm">College of Science and Mathematics</option>
                    <option value="chss">College of Humanities and Social Sciences</option>
                    <option value="som">School of Management</option>
                </select>
            </div>
            <div className={styles.formItem}>
                <p>Degree Program</p>
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
            
        </div>
    )
}