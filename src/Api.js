import React, {useState, useEffect} from "react"
import axios from "axios"

function Fetching() {
    const [students, setStudents] = useState([])

    useEffect(() => {
        axios.get('https://api.hatchways.io/assessment/students')
            .then(res => {
                console.log(res.data)
                setStudents(res.data.students)
            })
            .catch(err => 
                console.error(err))
    }, [])

    return (
        <div>
            <ul>
                {students.map(student => <li key={student.id}>{student.firstName}</li>)}
            </ul>
        </div>
    )
}

export default Fetching