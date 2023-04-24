export default function Page() {
    return (
        <div>
            <div>
                <p>First Name</p>
                <input type="text" />
            </div>
            <div>
                <p>Last Name</p>
                <input type="text" />
            </div>
            <div>
                <p>Student Number</p>
                <input type="text" />
            </div>
            <div>
                <p>Year Level</p>
                <select>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                </select>
            </div>
            <div>
                <p>College/Department</p>
                <select>
                    <option value="">College of Science and Mathematics</option>
                    <option value="">College of Humanities and Social Sciences</option>
                    <option value="">School of Management</option>
                    <option value="">Department of Human Kinetics</option>
                </select>
            </div>
            <div>
                <p>Degree Program</p>
                <select>
                    <option value="">BS in Computer Science</option>
                    <option value="">BS in Applied Mathematics</option>
                    <option value="">BS in Biology</option>
                    <option value="">BS in Food Technology</option>
                </select>
            </div>
            <div>
                <input type="checkbox" name="" id="" />
                <p>I agree with the Terms and Conditions</p>
            </div>
            <div>
                <input type="button" value="Finish" />
            </div>
        </div>
    )
}