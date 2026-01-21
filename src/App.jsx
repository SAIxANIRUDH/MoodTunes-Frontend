import { useState } from 'react';
import './App.css';
import FacialExpression from "./components/FacialExpression";
import MoodSongs from "./components/MoodSongs";
import DotGrid from "./components/DotGrid/DotGrid";
import BlurText from "./components/BlurText/BlurText.jsx";





function App() {
  const [songs, setSongs] = useState([]);
  const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

  return (
    <>
     
      {/* Background section */}
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        
        {/* DotGrid background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <DotGrid
            dotSize={5}
            gap={15}
            baseColor="#271E37"
            activeColor="#5227FF"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <FacialExpression setSongs={setSongs} />
      <MoodSongs songs={songs} />

        </div>

      </div>

      
    </>
  );
}

export default App;
