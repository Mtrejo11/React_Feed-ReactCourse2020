import React, { Component } from 'react';
import Post from './Post'
import { Helmet } from "react-helmet"

class ReactFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      token: localStorage.getItem('token')
    }
  }

  likeHandler = index => {
    let postsAux = [...this.state.posts];

    // postsAux[index].likes += 1;

    const config = {
      method: "PUT",
      headers: {
        'Content-type': 'Application/json',
        authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify(postsAux[index])
    }

    fetch('https://reactcourseapi.herokuapp.com/post/like', config)
      .then(res => { this.fetchData() })

  }

  fetchData = () => {
    let config = {
      method: "GET",
      headers: {
        'Content-type': 'Application/json',
        authorization: `Bearer ${this.state.token}`
      }
    }

    fetch('https://reactcourseapi.herokuapp.com/post/', config)
      .then(res => res.json())
      .then(data => {
        this.setState({
          posts: data.filteredPosts || []
        })

      })
  }

  logOutHandler = () => {
    localStorage.clear()
    window.location.reload()
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const postsComponents = this.state.posts.map((post, index) => {

      return (<Post
        key={index}
        name={post.user}
        likes={post.likes}
        title={post.title}
        text={post.text}
        image={post.image}
        onClick={() => this.likeHandler(index)}
      />);

    });

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>React Feed</title>
        </Helmet>
        <div className="container">
          <h1 className="display-3">ReactFeed</h1>

          <div className="d-flex flex-row bd-highlight mb-3 justify-content-between border-bottom p-3" >
            <h2>Recent posts</h2>
            <button type="button" class="btn btn-outline-danger" onClick={this.logOutHandler}>Log out</button>
          </div>
          <div className="posts">
            {postsComponents}
          </div>
        </div>
      </>
    );
  }
}

export default ReactFeed;
