//* Library includes
import React from 'react';
import { useState } from 'react';

//* Stylesheet includes
import "./components/stylesheets/NoBorder.css"

//* Component includes
import Navbar from './components/Navbar';

const App : React.FC = () => {
  const [isLogged, setLogged] = useState<boolean>(false);
  
  return (
    <div>
      <Navbar isLoggedIn={isLogged}/>
    </div>
  );
}

export default App;
