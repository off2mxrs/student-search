import React, {useState, useEffect} from "react"
import axios from "axios"

function Fetching() {
    const [students, setStudents] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isOpen, setIsOpen] = useState([])

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
    console.log(filteredStudents)

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

   const toggleActive= (id) => {
       if (isOpen.includes(id)) {
           setIsOpen(isOpen.filter(sid => sid.id === id));
       } else {
           let newIsOpen = [...isOpen]
           newIsOpen.push(id)
           setIsOpen(newIsOpen)
       }
   }


    return (
        <div>
            <input className="search" type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
            <div>
             <ul className="list">
                {filteredStudents.map(student => (
                    <li key={student.id}><h1>{student.firstName} {student.lastName}</h1>
                     <img src={student.pic}></img>
                     <ul>
                        <li>Email: {student.email} </li>
                        <li>Company: {student.company}</li>
                        <li>Skill: {student.skill}</li>
                        <li>Average: {grades(student.grades)}%</li>
                     </ul>

                     {/* <button className='toggle' onClick={() => setIsOpen(!isOpen)}>
                         CLICK
                     </button> */}
                     <button className='toggle' onClick={() => {toggleActive(student.id)}}>
                         {isOpen.includes(student.id) ? '-' : '+'}
                     </button>
                     {isOpen.includes(student.id) ? ( 
                     <ul> 
                      <li>Test 1: {student.grades[0]}%</li>
                      <li>Test 2: {student.grades[1]}%</li>
                      <li>Test 3: {student.grades[2]}%</li>
                      <li>Test 4: {student.grades[3]}%</li>
                      <li>Test 5: {student.grades[4]}%</li>
                      <li>Test 6: {student.grades[5]}%</li>
                      <li>Test 7: {student.grades[6]}%</li>
                      <li>Test 8: {student.grades[7]}%</li>
                     </ul>
                     ) : null}                   
                     <hr /> 
                    </li>
                ))}
             </ul>
            </div>
        </div>

    )
}

export default Fetching