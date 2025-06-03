import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Edit() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState('')

  const navigate = useNavigate()
  const { id } = useParams()

  
  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`http://localhost:3000/post${id}`)
     
        const data = await res.json()
        setTitle(data.title)
        setDescription(data.description)
        setAuthor(data.author)
      } catch (error) {
        console.error('Error fetching blog:', error)
      }
    }
    fetchBlog()
  }, [id])

  
  async function updatedBlog(e) {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/post${id}}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, author }),
      })

      if (!res.ok) throw new Error('Update failed')

      const result = await res.json()
      
      navigate('/view')
    } catch (error) {
      console.error('Error updating blog:', error)
    }
  }

  return (
    <div className="container">
      <div
        className="row justify-content-center align-content-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="col-md-10">
          <div className="card p-3 bg-light">
            <h4 className="p-2 text-center">Update blog</h4>
            <form onSubmit={updatedBlog}>
              <input
                type="text"
                className="form-control my-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="update a title"
                required
              />
              <textarea
                className="form-control my-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="update description"
                style={{ minHeight: '50vh' }}
                required
              ></textarea>
              <input
                type="text"
                className="form-control"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="update author"
                required
              />
              <button type="submit" className="btn btn-secondary form-control mt-2">
                Update Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit

