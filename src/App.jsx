import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FacialExpression from "./components/FacialExpression";
import MoodSongs from "./components/MoodSongs";

function App() {
  
 const [songs, setSongs] = useState([

 ]);

  return (
    <>
      <FacialExpression setSongs={setSongs} />
      <MoodSongs songs={songs} />
    </>
  )
}

export default App
