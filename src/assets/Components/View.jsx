import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function View() {
  let [blog, setblog] = useState([])
  const navigate=useNavigate()

  

  async function get() {
    try {
      let res = await fetch("http://localhost:3000/post")
      let data = await res.json()
      setblog(data)
      

    } catch (err) {
      console.log("data error");
    }
  }
  useEffect(function () {
    get()
  }, [])
  async function Delete(id) {
  const confirm = window.confirm("Are you sure you want to delete this blog?");
  if (!confirm) return;

  try {
    let res = await fetch(`http://localhost:3000/post/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setblog((prevBlogs) => {
        const updatedBlogs = prevBlogs.filter((blog) => blog.id !== id);

        
        if (updatedBlogs.length === 0) {
          navigate("/");
        }

        return updatedBlogs;
      });
    } else {
      alert("Failed to delete blog");
    }
  } catch (err) {
    console.log("Delete error:", err);
    alert("An error occurred while deleting the blog.");
  }
}




  return (
    <>


      <div className="container row justify-content-center align-items-center p-0 m-0">
        
          <div className="col-md-10 p-5 ">

            {blog.map((data,index) =>
            (
             <div key={index}> <div className="card mb-5 border border-secondary w-100">
                <div className="card-body ">
                  <h5><i style={{color:"green"}}>Blog title</i> : <br /> <br/>{data.title}</h5>
                  <hr />
                  <h5><i style={{color:"green"}}>Blog description</i> : <br /> <br />{data.description}</h5>
                  <hr />
                  <h5><i style={{color:"green"}}>Blog author </i>: <br /><br />{data.author}</h5>

                  <Link to={`/edit/${data.id}`} className='btn btn-secondary form-control mb-2 mt-3'>Edit</Link>
                  <button onClick={()=>Delete(data.id)} className='btn btn-danger form-control'>Delete</button>

                </div>
              </div></div>


            )
            )}



          </div>
         
        
      </div>

    </>
  )
}

export default View