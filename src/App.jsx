import { useState } from 'react'

import './App.css'
import Navbar from './assets/Components/Navbar'
import Home from './assets/Components/Home'
import Create from './assets/Components/Create'

import { Route, Routes } from 'react-router-dom'
import View from './assets/Components/View'
import Edit from './assets/Components/Edit'




function App() {


  return (
    <>
   <Navbar/>
   <Routes>
    <Route path='/' element={<Home></Home>}/>
    <Route path='/create' element={<Create></Create>}/>
    <Route path='/view' element={<View></View>}/>
    <Route path='/edit/:id' element={<Edit></Edit>}/>
    
    
  
   </Routes>
    
    </>
  )
}

export default App
