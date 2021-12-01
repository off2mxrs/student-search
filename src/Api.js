import React, {useState, useEffect} from "react"
import axios from "axios"

function Fetching() {
    const [students, setStudents] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        axios.get('https://api.hatchways.io/assessment/students')
            .then(res => {
                console.log(res.data)
                setStudents(res.data.students)
            })
            .catch(err => 
                console.error(err))
    }, [])

    const getFilteredStudents = (searchTerm, students) => {
        if (!searchTerm) {
            return students
        }
        return students.filter(info => info.firstName.includes(searchTerm))
    }

    const filteredStudents = getFilteredStudents(searchTerm, students)
    console.log(searchTerm)
    return (
        <div>
            <input className="search" type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
            <ul>
                {/* {students.map(student => <li key={student.id}>{student.firstName}</li>)} */}
                {filteredStudents.map(student => <li key={student.id}>{student.firstName}</li>)}
            </ul>
        </div>
    )
}

export default Fetching