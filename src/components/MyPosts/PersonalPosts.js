import React, { Component } from 'react';
import Post from '../../components/Feed/Post'
import { Helmet } from "react-helmet"
import Navbar from '../Navbar/NavbarComponent'

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
                const myPosts = data.filteredPosts.filter(element => {
                    return element.user === localStorage.getItem('username')
                })
                console.log('my posts:', myPosts);

                this.setState({
                    posts: myPosts || []
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


    changeHandler = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault()

        const post = {
            title: this.state.title,
            text: this.state.text,
            image: this.state.image
        }

        let config = {
            method: "POST",
            headers: {
                'Content-type': 'Application/json',
                authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify(post)
        }



        fetch('https://reactcourseapi.herokuapp.com/post', config)
            .then(res => res.json())
            .then(data => {
                console.log('received from post: ', data);
                let prevPosts = this.state.posts
                prevPosts.push(data.post)
                this.setState({
                    posts: prevPosts || [],
                    ...initStates
                })

            })
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
