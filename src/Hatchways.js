import React, {useState, useEffect} from "react"
import axios from "axios"

function Hatchways() {
    const [students, setStudents] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isOpen, setIsOpen] = useState([])
    

    /// FETCH DATA ////////////////////
    useEffect(() => {
        axios.get('https://api.hatchways.io/assessment/students')
            .then(res => {
                // console.log(res.data)
                setStudents(res.data.students)
                let newStudentData = []
                res.data.students.map(student => {

                    let addTags = student;
                    addTags.tags = [];
                    newStudentData.push(addTags);
                })
                setStudents(newStudentData)
                console.log(newStudentData)
            })
            .catch(err => 
                console.error(err))
    }, [])

    
    ///// FILTER & SEARCH //////////////////
    const getFilteredStudents = (searchTerm, students) => {
        if (!searchTerm) {
            return students
        }
        return students.filter(info => info.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    
     let filteredStudents = getFilteredStudents(searchTerm, students) 
    console.log(filteredStudents)

   

    //Average Grade///////////////////
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

    //Toggle by id //////////////////////
   const toggleActive= (id) => {
       if (isOpen.includes(id)) {
           setIsOpen(isOpen.filter(stuId => stuId.id === id));
       } else {
           let newIsOpen = [...isOpen]
           newIsOpen.push(id)
           setIsOpen(newIsOpen)
       }
   }



    return (
        <div className="list">
            <input className="search" type="text" placeholder="Search by name" onChange={event => {setSearchTerm(event.target.value)}}/>
            <div>
             <ul >
                {filteredStudents.map(student => (
                    <li className='card' key={student.id}><h1>{student.firstName} {student.lastName}</h1>
                     <img src={student.pic}></img>
                     <ul className='info'>
                        <li>Email: {student.email} </li>
                        <li>Company: {student.company}</li>
                        <li>Skill: {student.skill}</li>
                        <li>Average: {grades(student.grades)}%</li>
                        {isOpen.includes(student.id) ? ( 
                     <ul className='tests'> 
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
                     </ul>

                    {/* // EXPANDED LIST ////////////////// */}
                     <button className='toggle' onClick={() => {toggleActive(student.id)}}>
                         {isOpen.includes(student.id) ? '-' : '+'}
                     </button>
                    
                     {/* ///////////////////////////////                    */}
                    </li>
                ))}
               
             </ul>
            </div>
        </div>

    )
}

export default Hatchways