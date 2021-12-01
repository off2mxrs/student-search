import React, {useState, useEffect} from "react"
import axios from "axios"

function Fetching() {
    const [students, setStudents] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

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
        return students.filter(info => info.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    const filteredStudents = getFilteredStudents(searchTerm, students)
    console.log(searchTerm)

    function grades(arr) {
        let sum = 0
        let cnt = 0
        let ave = 0
        for (let i = 0; i < arr.length; i++) {
            sum = sum + parseInt(arr[i]);
            cnt++;
        }
        return ave = sum/cnt
    }

    return (
        <div>
            <input className="search" type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
            <div>
             <ul className="list">
                {filteredStudents.map(student => 
                    <li key={student.id}><h1>{student.firstName} {student.lastName}</h1>
                    <img src={student.pic}></img>
                    <li>Email: {student.email} </li>
                    <li>Company: {student.company}</li>
                    <li>Skill: {student.skill}</li>
                    <li>Average: {grades(student.grades)}%</li>
                    </li>
                   
               )}
             </ul>
            </div>
        </div>

    )
}

export default Fetching