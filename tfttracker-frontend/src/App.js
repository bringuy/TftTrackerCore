import './App.css';
import { React, useState, useEffect } from 'react'
import InitalDisplay from './components/InitalDisplay/InitalDisplay';
import MainDisplay from './components/MainDisplay/MainDisplay'

//ADD LOADER WHEN API IS BEING CALLED
const App = () => {

  const [page, setPage] = useState(0)
  const [username, setUsername] = useState('')

  const changePage = ( page, username ) => {
    if (username) {
      setUsername(username)
    }
    console.log(username)
    setPage(page)
  }

  return (
    <div>
      {
        page === 0 ?
          <InitalDisplay changePage={changePage} />
          :
          page === 1 ?
            <MainDisplay changePage={changePage} username={username}/>
            :
            <></>
      }
    </div>
  );
}

export default App;
