import React, { Component} from 'react';
import axios from 'axios'

class Home extends Component {
    state = {
        hatchways : []
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

    render() {
        return (
            <div>
                <h1>Hatchways</h1>
            </div>
        )
    }
}

export default Home