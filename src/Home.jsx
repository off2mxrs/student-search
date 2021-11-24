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
           
            console.log(student[1].city);
            return (
                <div key={idx}>
                    <p>{student[1].firstName}</p>
                </div>
            )
        })
    }
    
 
    render() {
        return (
            <div>
                <h1>Hatchways</h1>
                <div>
                    {this.renderStudents()}
                </div>
            </div>
        )
    }
}

export default Home