import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

function Create() {
   const [blog, setblog] = useState([])
   useEffect(()=>{async function fun() {
    let response =await fetch('http://localhost:3000/post')
    let data=await response.json()
    setblog(data)

  

    
   }
  fun()},[])

  return (<>
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-10">
          {blog.map((blog,item)=>{
            console.log(blog);
            return(

            <div className="col-md-10"key={item}>
              <div className="card my-4 p-4">
                <h5>{blog.title}</h5>
                <hr />
                <h5>{blog.description}</h5>
                <hr />
                <h5>written by {blog.author}</h5>
                <Link className='btn btn-primary my-2 w-25'to={"/view"}>Read more</Link>
              </div>
            </div>)
          }
        )}
        
        </div>
      </div>
    </div>
  </>
  )
}

export default Create