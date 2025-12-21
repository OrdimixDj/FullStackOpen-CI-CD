import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
          <div>
              title:<input id="title-input" type="text" value={title} name="Title" placeholder='title' onChange={({ target }) => setTitle(target.value)}/>
              <br/>
              author:<input id="author-input" type="text" value={author} name="Author" placeholder='author' onChange={({ target }) => setAuthor(target.value)}/>
              <br/>
              url:<input id="url-input" type="text" value={url} name="Url" placeholder='url' onChange={({ target }) => setUrl(target.value)}/>
          </div>
          <button id="create-blog-button" type="submit">create</button>
        </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm