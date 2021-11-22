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
            console.log(data);
          this.setState({hatchways: data})
          })
          .catch(err => console.log(err))
    }

  
    renderStudents() {
        return this.state.hatchways.map((student, idx) => {
            console.log(student.data.students);
            return (
                <div key={idx}>
                    <p>{student.firstName}</p>
                </div>
            )
        })
    }
    
 
    render() {
        return (
            <div>
                <h1>Hatchways</h1>
                <div>
                    {/* {this.renderStudents()} */}
                </div>
            </div>
        )
    }
}

export default Home