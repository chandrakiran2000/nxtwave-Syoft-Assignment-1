import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import './index.css'

class Signup extends Component {
    state = {user_email:"",user_password:"", showPassword: false, showSubmitError: false,errorMsg: '', emailErr: false, passwordErr: false }
    

    handleInputs = (value, fieldName) => {
        // console.log(value, fieldName)
        if (fieldName === "user_email") {
            this.setState({user_email: value})
        }else if (fieldName === "user_password") {
            this.setState({user_password: value})
        }
    }

    handleBlur = (value, fieldName)=> {
        // console.log(value, fieldName)
        if (fieldName === "user_email") {
            this.setState({emailErr: value === "" ? true : false})
        }else if (fieldName === "user_password") {
            this.setState({passwordErr: value === "" ? true : false})
        }
    }

    handleShowPassword = () => {
        this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
      };

    handleFormValidation = () => {
        const {user_email,user_password} = this.state
        let checkValues = true 
        
        if (user_email === "") {
            checkValues = false
            this.setState({emailErr: user_email === "" ? true : false})
        }
        
        if (user_password === "") {
            checkValues = false
            this.setState({passwordErr: user_password === "" ? true : false})
        }
        return checkValues
    }

    onSubmitSuccess = (userDatails) => {
        localStorage.setItem('userData', JSON.stringify(userDatails));
        this.setState({user_email:"",user_password:"", showPassword: false, showSubmitError: false,errorMsg: '', emailErr: false, passwordErr: false })
        const {history} = this.props
        history.replace('/')
      }

    onSubmitFailure = msg => {
        this.setState({showSubmitError: true, errorMsg: msg})
      }

    submitForm = async (event) => {
        event.preventDefault()
        if (this.handleFormValidation()) {
            this.setState({showSubmitError: false, errorMsg: ""})
            const {user_email,user_password} = this.state
            const payload ={
                        "user_email":user_email,
                        "user_password":user_password,
                        }
            const signinUrl = 'https://syoft.dev/Api/userlogin/api/userlogin'
            const options = {
                method: "POST",
                body: JSON.stringify(payload)
            }
            const response = await fetch(signinUrl, options)
            const data = await response.json()

            const {user_data} = data
            
            if (response.ok === true && data.msg === 'User found') {
                this.onSubmitSuccess(user_data)
              } else {
                this.onSubmitFailure(data.msg)
              }
            
        }
    }
    

    renderLogocard = () => {
        return(
            <div className='image-card'>
                <img className='img' src="https://ncetir.com/Images/login@4x.png" alt="" />
            </div>
        )
    }

    renderSignincard = () => {
        const {user_email,user_password, showPassword,showSubmitError, errorMsg, emailErr, passwordErr} = this.state
        const errBorder = "error-border"
        return(
            <div className='login-card'>
                
                <form className='login-form' onSubmit={this.submitForm}>
                <div className='logo-card'>
                    <img className='logo-img' src="https://www.syoft.com/assets/img/logo-color.png" alt="" />
                    <h1 className='login-text'>Sign In</h1>
                    <p className='Already-text'>Don't have an account? <Link className='link' to="/signup">Sign Up</Link></p>
                </div>
                
                <div className="input-container">
                    <label className="input-label" htmlFor="email">
                        Email address *
                    </label>
                    <input
                        type="text"
                        id="email"
                        className={`input-filed ${emailErr === true && errBorder}`}
                        value={user_email}
                        onChange={(event)=>{this.handleInputs(event.target.value, "user_email")}}
                        onBlur = {(event) =>{this.handleBlur(event.target.value, "user_email")}}
                        placeholder='Enter Email'
                    />
                </div>
                
                <div className="input-container">
                    <label className="input-label" htmlFor="password">
                        Password *
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className={`input-filed ${passwordErr === true && errBorder}`}
                        value={user_password}
                        onChange={(event)=>{this.handleInputs(event.target.value, "user_password")}}
                        onBlur = {(event) =>{this.handleBlur(event.target.value, "user_password")}}
                        placeholder='Enter Password'
                    />
                </div>
                <div className="input-container">
                    <label className="input-label">
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={this.handleShowPassword}
                    />
                    Show Password
                    </label>
                </div>
                <button type="submit" className="login-button">
                    Sign In
                </button>
                {showSubmitError && <p className="error-message">*{errorMsg}</p>}
                </form>
            </div>
        )
    }

    render(){
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData !== null){
            return <Redirect to='/' />
        }
        return(
            <div className='main-card'>
                {this.renderLogocard()}
                {this.renderSignincard()}
            </div>
        )
    }
}

export default Signup