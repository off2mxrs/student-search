import React, {useState, useEffect} from "react"
import axios from "axios"
import TagForm from './TagForm'

function Hatchways() {
    const [students, setStudents] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [tagSearch, setTagSearch] = useState("")
    const [isOpen, setIsOpen] = useState([])
    const [newTag, setNewTag] = useState("");
    // const [tags, setTags] = useState([]);

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


    const getFilteredTags = (tagSearch, tags) => {
        if (!tagSearch) {
            return tags
        }
        return tags.filter(tagInfo => tagInfo.tags.toLowerCase().includes(tagSearch.toLowerCase()))
    }
    
    
    ///// FILTER & SEARCH //////////////////
    const getFilteredStudents = (searchTerm, students) => {
        if (!searchTerm) {
            return students
        }
        return students.filter(info => info.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    let filteredTags = getFilteredTags(tagSearch, students)
    console.log(filteredTags) 
    
     let filteredStudents = getFilteredStudents(searchTerm, students) 
    console.log(filteredStudents)

   

    //Average Grade///////////////////
    // function grades(arr) {
    //     let sum = 0
    //     let cnt = 0
    //     let ave = 0
    //     for (let i = 0; i < arr.length; i++) {
    //         sum = sum + parseInt(arr[i]);
    //         cnt++;
    //     }
    //     return ave = sum/cnt
    // }

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

//    const newTag = (str, index) => {
//         let setTags = [...students]
//        setTags[index].tags.push(str)
//      setStudents(setTags)
//      console.log(setTags);
//     }



//   const addTag = (id, e) => {
//     students.map(studentWTag => {
//     let newPush = []
//         if (e.key == "Enter") {
//             // let pushData = studentWTag
//             // pushData.tags = ['1','2','3']
//             // newPush.push(pushData.tags)
//             // pushData.push()
//         //  setStudents([...studentWTag.tags, {tags:e.target.value}]);
//         //  setStudents([...students, {id, tags:e.target.value, firstName:students.firstName, company:students.company}]);

//     }
//      console.log(id);
//     })
//   };
// console.log(students[0].city)



    return (
        <div>
            <input className="search" type="text" placeholder="Search by name" onChange={event => {setSearchTerm(event.target.value)}}/>
            <input className="search" type="text" placeholder="Search by tag" onChange={event => {setTagSearch(event.target.value)}}/>
            <div>
             <ul className="list">
             {/* {students.filter(t => t.id).map((tag) => {
                 let tagged = []
                 tag.push('HELLO')
                 console.log(tag.tags)
                 return <p className="tags">{tag.id.tags}</p>;
                 //  return console.log(tag.tags)
            })} */}
            
                {filteredStudents.map(student => (
                    <li key={student.id}><h1>{student.firstName} {student.lastName}</h1>
                     <img src={student.pic}></img>
                     <ul>
                        <li>Email: {student.email} </li>
                        <li>Company: {student.company}</li>
                        <li>Skill: {student.skill}</li>
                        <li>tags: {student.tags}</li>
                        {/* <li>Average: {grades(student.grades)}%</li> */}
                     </ul>

                     {/* <form
                        onSubmit={e => {
                            e.preventDefault();
                            addTag(newTag, index);
                            setNewTag("");
                            }}
                    />
                     
                  
                     <input
                        onKeyDown={addTag.bind(this, student)}
                        className="tag"
                        type="text"
                        placeholder="Add a tag"
                        value={newTag}
                        onChange={e => {
                        setNewTag(e.target.value);
                         }}
                     /> */}

                        {tags.length > 0
                        ? tags.map((tag, index) => {
                            return <p key={index.toString()}> tag={tag} </p>;
                            })
                        : null}
                        <TagForm />


                    {/* // EXPANDED LIST ////////////////// */}
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
                     {/* ///////////////////////////////                    */}
                     <hr /> 
                    </li>
                ))}
               
             </ul>
            </div>
        </div>

    )
}

export default Hatchways