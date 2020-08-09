import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateUser } from '../actions';
import Alert from '../../alerts/Alert';

class UpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.currentUser.user.username,
            image: this.props.currentUser.user.image
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.updateUser(this.props.currentUser.user.id, this.state.image, this.state.username)
        .then(() => {
            this.props.history.push(`/${this.props.currentUser.user.id}`);
        })
        .catch(() => {
            return;
        });
    }

    render() {
        const { username, image } = this.state;
        const { heading, path, buttonText, alerts, removeAlert } = this.props;
        // history.listen(() => {
        //     removeAlert();
        // });

        return (
            <div className='row justify-content-md-center text-center'>
                <div className='col-md-6'>
                    <form onSubmit={this.handleSubmit}>
                        <h2>Update {heading}</h2>
                        {alerts.message && 
                            <Alert alerts={alerts} removeAlert={removeAlert}/>
                        }
                        <label htmlFor='image'>Image Url:</label>
                        <input
                            autoComplete='off'
                            className='form-control'
                            id='image'
                            name='image'
                            onChange={this.handleChange}
                            type='text'
                            value={image}
                        />
                        <label htmlFor='username'>Username:</label>
                        <input
                            autoComplete='off'
                            className='form-control'
                            id='username'
                            name='username'
                            onChange={this.handleChange}
                            type='text'
                            value={username}
                        />
                        <button type='submit' className='btn btn-primary btn-block btn-lg mt-2'>
                            {buttonText}
                        </button>
                    </form>
                    <NavLink exact to={`/${path}`} className='btn btn-warning btn-block mt-2'>
                        Return
                    </NavLink>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, { updateUser })(UpdateForm);