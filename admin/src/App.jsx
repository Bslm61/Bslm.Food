import React from 'react'
import { Navbar } from './components/Navbar/Navbar.jsx'
import { Sidebar } from './components/Sidebar/Sidebar.jsx'

export const App = () => {
  return (
    <div className='p-0 m-0 box-border font-outfit min-h-screen bg-[#fcfcfc] decoration-0 text-inherit  '>
      <Navbar />
      <hr />
      {/* app-content */}
      <div>
        <Sidebar />
      </div>
    </div>
  )
}
