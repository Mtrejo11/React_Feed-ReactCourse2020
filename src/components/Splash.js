import React from 'react'
import '../App.css'
import { withRouter } from 'react-router-dom'


class Splash extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        if (token) {
            this.verifyToken(token)
        }
        else {
            this.props.history.push('/login')
        }
    }


    verifyToken = async (token) => {
        let config = {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        }
        fetch('https://reactcourseapi.herokuapp.com/verifytoken', config).then(response => {
            if (response.ok) {
                // this.props.history.push('/feed')

                this.setState({
                    loading: false
                })

            } else {
                this.props.history.push('/login')

            }
        }).catch(err => console.error(err))
    }

    render() {
        const splash = (
            <div className='full-centered'>
                <h1>Loading...</h1>
            </div>
        )
        return this.state.loading ? splash : this.props.children
    }

}
export default withRouter(Splash) 