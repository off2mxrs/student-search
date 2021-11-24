import React, { Component} from 'react';
import axios from 'axios'

class Home extends Component {
    state = {
        hatchways: []
    }
    componentDidMount() {
        const url = 'https://api.hatchways.io/assessment/students'

        axios.get(url)
        .then( data => {
            
            let arr = Object.entries(data.data.students)
            console.log(arr);
            this.setState({
                hatchways: arr
            })
          })
          .catch(err => console.log(err))
    }
    
    renderStudents() {
        return this.state.hatchways.map((student, idx) => {
            // console.log(student[1].city);
            return (
                <div key={idx}>
                    <ul>
                        <li><img src={student[1].pic}></img></li>
                        <li> <h1>{student[1].firstName} {student[1].lastName}</h1></li>
                        <li>Email: {student[1].email} </li>
                        <li>Company: {student[1].company}</li>
                        <li>Skill: {student[1].skill}</li>
                        <li>Average: {student[1].average}</li>
                    </ul>
                </div>
            )
        })
    }
    
 
    render() {
        return (
            <div>
                <div>
                    {this.renderStudents()}
                </div>
            </div>
        )
    }
}

export default Home