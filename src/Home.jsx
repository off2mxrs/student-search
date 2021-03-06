import React, { Component } from 'react';
import axios from 'axios'

////////////////////////////////////////////////////////////////
/////// INITAL ATTEMPT BEFORE REALIZING MUST BE A FUNCTIONAL COMPONENT //////
////////////////////////////////////////////////////////////////
class Home extends Component {

    state = {
        hatchways: [],
        isTestsHidden: true,
    }
    
    componentDidMount() {
        const url = 'https://api.hatchways.io/assessment/students'

        axios.get(url)
        .then( data => {
            // convert json object into array to fetch
            let arr = Object.entries(data.data.students)
            console.log(arr);
            this.setState({
                hatchways: arr
            })
          })
          .catch(err => console.log(err))
    }
    
    toggleTests = () => {
        this.setState({
            isTestsHidden: !this.state.isTestsHidden
        })
    }

    renderStudents() {
        return this.state.hatchways.map((student, idx) => {
            // console.log(student[1].city);
            // Find the average grade from grades array
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
            // console.log(grades(student[1].grades))
            return (
                <div key={idx}>
                  <div className="card">
                    <img src={student[1].pic}></img>

                    <ul className="list">  
                        <li><h1>{student[1].firstName} {student[1].lastName}</h1></li>
                        <li>Email: {student[1].email} </li>
                        <li>Company: {student[1].company}</li>
                        <li>Skill: {student[1].skill}</li>
                        <li>Average: {grades(student[1].grades)}%</li>
                    </ul>
                  </div> 

                  <button onClick={this.toggleTests}></button>
                  {this.state.isTestsHidden ? "" : 
                  <ul> 
                      <li>Test 1: {student[1].grades[0]}%</li>
                      <li>Test 2: {student[1].grades[1]}%</li>
                      <li>Test 3: {student[1].grades[2]}%</li>
                      <li>Test 4: {student[1].grades[3]}%</li>
                      <li>Test 5: {student[1].grades[4]}%</li>
                      <li>Test 6: {student[1].grades[5]}%</li>
                      <li>Test 7: {student[1].grades[6]}%</li>
                      <li>Test 8: {student[1].grades[7]}%</li>
                 </ul>}
                 <hr /> 
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