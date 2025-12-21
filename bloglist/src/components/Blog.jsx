import { useState } from 'react'

const Blog = ({ blog, handleBlogUpdate, handleBlogRemove, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenSameUser = { display: user.username === blog.user.username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const increaseLike = event => {
    event.preventDefault()
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    handleBlogUpdate(updatedBlog)
  }

  const removeBlog = event => {
    event.preventDefault()

    if (window.confirm('Remove blog ' + blog.title + ' by ' + blog.author)) {
      handleBlogRemove(blog)
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      <div>
        <div style={hideWhenVisible} className='blog-not-complete'>
          {blog.title} {blog.author} <button className="view-button" onClick={() => setVisible(true)}>view</button>
        </div>

        <div style={showWhenVisible} className='blog-complete'>
          {blog.title} {blog.author} <button onClick={() => setVisible(false)}>hide</button>
          <br />{blog.url}
          <br />likes {blog.likes} <button className="like-button" onClick={increaseLike}>like</button>
          <br />{blog.user.name}
          <div id='remove-blog-button' style={showWhenSameUser}>
            <button onClick={removeBlog}>remove</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Blog