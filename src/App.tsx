//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './components';
import { AllRouters } from './routes/AllRoutes';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <AllRouters />
        
    </>
  )
}

export default App
