import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { jsxs } from 'react/jsx-runtime'

function Home() {
  const navigate = useNavigate()

  
  const [blog, setblog] = useState({})
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState('')
  async function getBlog() {

    let responce = await fetch("http://localhost:3000/post")
    let data = await responce.json()
    setblog(data)
   

  }
  async function submitHandle(e) {
    if (title==="" || description===""||author==="") {
      
      alert("Please fill all the inputs")
     
      e.preventDefault()
    }else{

      try {
       e.preventDefault()
      await fetch('http://localhost:3000/post',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({title,description,author})
      })
      
  
        getBlog() 
        navigate('/Create')
      
      
     } catch (error) {
      console.log("error",error);
      
     }
    }  
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-content-center" style={{ minHeight: "100vh" }}>
        <div className="col-md-10">
          <div className="card p-3 bg-black">
            <h4 className='text-white p-2 text-center'>Blog app</h4>
            
            <form onSubmit={submitHandle}>
              <input type="text" className='form-control my-2' onChange={(e)=>setTitle(e.target.value)} placeholder='write a title' />
              <textarea name="" id="" className='form-control my-2' onChange={(e)=>setDescription(e.target.value)} placeholder='write a description' style={{minHeight:"50vh"}}></textarea>
              <input type="text" className='form-control' onChange={(e)=>setAuthor(e.target.value)} placeholder='write a author' />
              <button className= 'btn btn-primary form-control mt-2'>submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home