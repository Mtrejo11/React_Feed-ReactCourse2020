import React, { Component } from 'react';
import Post from '../../components/Feed/Post'
import { Helmet } from "react-helmet"
import Navbar from '../Navbar/NavbarComponent'
import EditablePost from '../EditablePost/EditablePost';

const initStates = {
    title: '',
    text: '',
    image: '',
}
class PersonalPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...initStates,
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
                console.log('received data: ', data);
                const auxPost = data.filteredPosts.filter(element => {
                    return element.user === localStorage.getItem('username')
                })
                let myPosts = []
                auxPost.forEach(post => {
                    myPosts.push({ ...post, selected: false })
                });




                this.setState({
                    posts: myPosts || []
                })

            })
    }

    logOutHandler = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    componentDidMount() {
        this.fetchData();
    }


    changeHandler = (event, index) => {
        const change = event.target.value
        const id = event.target.id
        let postAux = this.state.posts
        let singlePost = { ...postAux[index], [id]: change }
        postAux[index] = singlePost
        this.setState({
            posts: postAux
        })
    }




    updatePostHandler = (index) => {

        const post = {
            _id: this.state.posts[index]._id,
            title: this.state.posts[index].title,
            text: this.state.posts[index].text,
            image: this.state.posts[index].image
        }

        let config = {
            method: "PUT",
            headers: {
                'Content-type': 'Application/json',
                'authorization': `Bearer ${this.state.token}`
            },
            body: JSON.stringify(post)
        }



        fetch('https://reactcourseapi.herokuapp.com/post', config)
            .then(res => res.json())
            .then(data => {
                console.log('received from post: ', data);
                this.fetchData()
            })
    }



    handleEditable = (i) => {
        let editablePosts = this.state.posts
        for (let index = 0; index < editablePosts.length; index++) {
            if (i === index) {
                editablePosts[index].selected = !editablePosts[index].selected
            } else {
                editablePosts[index].selected = false

            }
        }
        console.log(editablePosts);

        this.setState({ posts: editablePosts })
    }

    render() {
        const postsComponents = this.state.posts.map((post, index) => {

            return post.selected ?

                (<EditablePost
                    handleEditable={() => this.handleEditable(index)}
                    changeHandler={(event) => this.changeHandler(event, index)}
                    editable={true}
                    key={index}
                    name={post.user}
                    selected={post.selected}
                    likes={post.likes}
                    title={post.title}
                    text={post.text}
                    updateHandler={() => this.updatePostHandler(index)}
                    image={post.image}
                    onClick={() => this.likeHandler(index)}
                />)
                : (<Post
                    handleEditable={() => this.handleEditable(index)}
                    editable={true}
                    key={index}
                    name={post.user}
                    likes={post.likes}
                    title={post.title}
                    text={post.text}
                    image={post.image}
                    onClick={() => this.likeHandler(index)}
                />)

        });

        return (
            <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>React Feed</title>
                </Helmet>

                <Navbar logOutHandler={this.logOutHandler} />
                <div className="container pt-5">
                    <h1 className="display-3">ReactFeed</h1>


                    <div className="d-flex flex-row bd-highlight mb-3 justify-content-between border-bottom p-3" >
                        <h2>My posts</h2>
                    </div>
                    <div className="posts">
                        {postsComponents}
                    </div>
                </div>
            </>
        );
    }
}

export default PersonalPosts;
