import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './page/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <link href="/dist/styles.css" rel="stylesheet"></link> */}
      {/* <div className='text-3xl font-bold underline '>Hello world</div>
       */}
       <Home/>
    </>
  )
}

export default App
