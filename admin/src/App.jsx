import React from 'react'
import { AdminNavbar } from './components/Navbar/AdminNavbar.jsx'
import { Sidebar } from './components/Sidebar/Sidebar.jsx'
import { Routes,Route } from "react-router-dom";
import { Add } from "./pages/Add/Add.jsx";
import { List } from "./pages/List/List.jsx";
import { Orders } from "./pages/Orders/Orders.jsx";


export const App = () => {
  return (<>
 
  <div className='p-0 m-0 box-border font-outfit min-h-screen bg-[#fcfcfc] decoration-0 text-inherit  '>
      <AdminNavbar />
      <hr  className='border-none h-px bg-[#a9a9a9]'/>
      {/* app-content */}
      <div className='flex '>
        <Sidebar />
        <Routes>
          <Route path="/add" element={<add/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/orders" element={<Orders/>}/>

        </Routes>
      </div>
    </div> 
    </>
  )
}
