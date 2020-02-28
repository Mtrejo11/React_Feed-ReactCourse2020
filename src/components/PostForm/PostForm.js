import React from 'react'
import './PostForm.css'

const PostForm = (props) => {
    return (
        <div className='d-flex bg-light flex-column align-items-center p-4 border border-secondary rounded-xlg m-5 shadow-sm' >
            <h1>New Post</h1>

            {/* <form className='d-flex flex-column align-items-end formContainer'>
                <div className="form-group">

                    <label>Title:   </label>
                    <input type={'text'} className='form-control' value={props.title} id={'title'} className='ml-2' />
                </div>
                <div>

                    <label>Text:   </label>
                    <input type={'text'} value={props.text} id={'text'} className='ml-2' />
                </div>
                <div>

                    <label>Image:   </label>
                    <input type={'text'} value={props.image} id={'image'} className='ml-2' />
                </div>
                <button type="button" className="btn btn-primary align-self-center">Share Post</button>
            </form> */}
            <form onSubmit={props.submitHandler}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Post title</label>
                    <input type="text" className="form-control" id="title" placeholder="Title" value={props.title} onChange={props.changeHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Post text</label>
                    <input type="text" className="form-control" id="text" placeholder="Text" value={props.text} onChange={props.changeHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Post image</label>
                    <input type="text" className="form-control" id="image" placeholder="URL" value={props.img} onChange={props.changeHandler} />
                </div>


                <button type="submit" className="btn btn-outline-primary">Share</button>
            </form>
        </div>
    )
}
export default PostForm



