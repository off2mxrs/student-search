import './App.css';
import Home from './Home'
import {useState} from 'react'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  
  return (
    <div className="App">
     <input className="search" type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
     <Home />
    </div>
  );
}

export default App;
