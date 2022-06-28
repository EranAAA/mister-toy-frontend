
import React from 'react'
import PropTypes from 'prop-types';

export class LoginSignup extends React.Component {

    state = {
        credentials: {
            username: '',
            password: '',
            fullname: '',
            credit: 1000
        },
        isSignup: false
    }

    clearState = () => {
        const clearTemplate = {
            credentials: {
                username: '',
                password: '',
                fullname: '',
                credit: 1000,
            },
            isSignup: false
        }
        this.setState({ clearTemplate })
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ credentials: { ...this.state.credentials, [field]: value } });
    }

    onLogin = (ev = null) => {
        if (!this.state.credentials.username || !this.state.credentials.password) return;
        if (ev) ev.preventDefault();
        this.props.onLogin(this.state.credentials);
        this.clearState()
    }

    onSignup = (ev = null) => {
        if (!this.state.credentials.username || !this.state.credentials.password || !this.state.credentials.fullname) return;
        if (ev) ev.preventDefault();
        // console.log('credentials', this.state.credentials);
        this.props.onSignup(this.state.credentials);
        this.clearState()
    }

    toggleSignup = () => {
        this.setState({ isSignup: !this.state.isSignup })
    }

    render() {
        const { username, password, fullname } = this.state.credentials;
        const { isSignup } = this.state;
        // const { heading } = this.props;
        return (
            <div className="login-page">
                {/* <div>{heading}</div> */}
                <p> <a className="signup" href="#" onClick={this.toggleSignup}>{!isSignup ? 'Change to Signup' : 'Change to Login'}</a> </p>
                {!isSignup && <form className="login-form" onSubmit={this.onLogin}>
                    <input type="text" name="username" value={username} placeholder="Username" onChange={this.handleChange} required autoFocus />
                    <input type="password" name="password" value={password} placeholder="Password" onChange={this.handleChange} required />
                    <button>Login!</button>
                </form>}

                <div className="signup-section">
                    {isSignup && <form className="login-form" onSubmit={this.onSignup}>
                        <input type="text" name="fullname" value={fullname} placeholder="Fullname" onChange={this.handleChange} required />
                        <input type="text" name="username" value={username} placeholder="Username" onChange={this.handleChange} required />
                        <input type="password" name="password" value={password} placeholder="Password" onChange={this.handleChange} required />
                        <button >Signup!</button>
                    </form>}
                </div>
            </div>
        )
    }
}

LoginSignup.propTypes = {
    heading: PropTypes.string.isRequired,
    // we tell the developer the props we pass from the father must include STRING.
    // if we add "isRequired" it mean that if we MUST pass props name heading from type STRING
    onLogin: PropTypes.func.isRequired 
    // we tell the developer the props we pass from the father must include the func onLogin.
    // if we remove "isRequired" it mean that if we pass props name onLogin it we must be function.
}

LoginSignup.defaultProps = {
    heading: 'Come as you are'
}