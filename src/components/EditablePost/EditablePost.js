import React from 'react'
import { } from './EditablePost.module.css'
import PropTypes from 'prop-types'



const EditablePost = props => {
    return (
        <article className="post card">

            <header className="card-header">
                <div className='d-flex justify-content-between'>
                    <div>
                        <input className="form-control" type="text" placeholder="Edit title"  value={props.title} id='title' onChange={props.changeHandler}/>

                        {/* <h5>Neh: {props.name}</h5> */}
                    </div>
                    <div>

                        {
                            props.selected ? (

                                <button type='button' className='btn btn-outline-success' onClick={props.updateHandler} >Save</button>
                            ) : null
                        }

                        {
                            props.editable ? (

                                <button type='button' className='btn btn-outline-info ml-3' onClick={props.handleEditable} >{props.selected ? 'Exit' : 'Edit'}</button>
                            ) : null
                        }
                    </div>
                </div>
            </header>

            <main className="card-body">
                <input className="form-control mb-4" type="text" placeholder="Edit text" value={props.text} id='text' onChange={props.changeHandler}/>

                <input className="form-control mb-4" type="text" placeholder="Edit image" value={props.image} id='image' onChange={props.changeHandler}/>
                
                {/* <img src={props.image} alt={props.name} /> */}
            </main>

            <footer className="likes card-footer">
                <span> Likes: {props.likes} </span>
                <button type="button" className="btn btn-outline-primary" onClick={props.onClick}>Like!</button>
            </footer>
        </article>
    );
}

EditablePost.propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    onClick: PropTypes.func,
    likes: PropTypes.number,
    text: PropTypes.string
}

export default EditablePost;