import React,  {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import './index.css'

class Signup extends Component {
    state = {user_firstname:"",user_email:"",user_phone:"",user_password:"",showPassword: false, showSubmitError: false,errorMsg: '', fNameErr: false,emailErr: false, phoneErr: false, passwordErr: false }
    

    handleInputs = (value, fieldName) => {
        // console.log(value, fieldName)
        if (fieldName === "user_firstname") {
            this.setState({user_firstname: value})
        }else if (fieldName === "user_email") {
            this.setState({user_email: value})
        }else if (fieldName === "user_phone") {
            this.setState({user_phone: value})
        }else if (fieldName === "user_password") {
            this.setState({user_password: value})
        }
    }

    handleBlur = (value, fieldName)=> {
        // console.log(value, fieldName)
        if (fieldName === "user_firstname") {
            this.setState({fNameErr: value === "" ? true : false})
        }else if (fieldName === "user_email") {
            this.setState({emailErr: value === "" ? true : false})
        }else if (fieldName === "user_phone") {
            this.setState({phoneErr: value === "" ? true : false})
        }else if (fieldName === "user_password") {
            this.setState({passwordErr: value === "" ? true : false})
        }
    }
    
    handleShowPassword = () => {
        this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
      };
    

    handleFormValidation = () => {
        const {user_firstname,user_email,user_phone,user_password} = this.state
        let checkValues = true 
        if (user_firstname === "") {
            checkValues = false
            this.setState({fNameErr: user_firstname === "" ? true : false})
        }
        if (user_email === "") {
            checkValues = false
            this.setState({emailErr: user_email === "" ? true : false})
        }
        if (user_phone === "") {
            checkValues = false
            this.setState({phoneErr: user_phone === "" ? true : false})
        }
        if (user_password === "") {
            checkValues = false
            this.setState({passwordErr: user_password === "" ? true : false})
        }
        return checkValues
    }

    onSubmitSuccess = () => {
        const {history} = this.props
        this.setState({user_firstname:"",user_email:"",user_phone:"",user_password:"",showPassword: false, showSubmitError: false,errorMsg: '', fNameErr: false,emailErr: false, phoneErr: false, passwordErr: false })
        history.replace('/login')
      }

    onSubmitFailure = msg => {
        this.setState({showSubmitError: true, errorMsg: msg})
      }

    submitForm = async (event) => {
        event.preventDefault()
        if (this.handleFormValidation()) {
            this.setState({showSubmitError: false, errorMsg: ""})
            const {user_firstname,user_email,user_phone,user_password} = this.state
            const payload ={
                        "user_firstname":user_firstname,
                        "user_email":user_email,
                        "user_phone":user_phone,
                        "user_password":user_password,
                        "user_lastname":"ni",
                        "user_city":"Hyderabad",
                        "user_zipcode": "500072"
                    }
            const signupUrl = 'https://syoft.dev/Api/user_registeration/api/user_registeration'
            const options = {
                method: "POST",
                body: JSON.stringify(payload)
            }
            const response = await fetch(signupUrl, options)
            const data = await response.json()
            if (response.ok === true && data.msg === 'Registered Successfully') {
                this.onSubmitSuccess()
              } else {
                this.onSubmitFailure(data.msg)
              }
            
        }
        
    }
    

    renderLogocard = () => {
        return(
            <div className='image-card'>
                <img className='img' src="https://ncetir.com/Images/login@4x.png" alt="login-image" />
            </div>
        )
    }


    renderSignupcard = () => {
        const {user_firstname,user_email,user_phone,user_password, showPassword, showSubmitError, errorMsg, fNameErr, emailErr, phoneErr, passwordErr} = this.state
        const errBorder = "error-border"
        return(
            <div className='signup-card'>
                
                <form className='signup-form' onSubmit={this.submitForm}>
                <div className='logo-card'>
                    <img className='logo-img' src="https://www.syoft.com/assets/img/logo-color.png" alt="logo" />
                    <h1 className='signup-text'>Sign up</h1>
                    <p className='Already-text'>Already have an account ? <Link className='link' to="/login">Sign In</Link></p>
                </div>
                <div className="input-container">
                    <label className="input-label" htmlFor="firstname">
                        First name *
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        className={`input-filed ${fNameErr === true && errBorder}`}
                        value={user_firstname}
                        onChange={(event)=>{this.handleInputs(event.target.value, "user_firstname")}}
                        onBlur = {(event) =>{this.handleBlur(event.target.value, "user_firstname")}} 
                        placeholder='Enter Firstname'
                    />
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
                    <label className="input-label" htmlFor="phone">
                        Phone no *
                    </label>
                    <input
                        type="text"
                        id="phone"
                        className={`input-filed ${phoneErr === true && errBorder}`}
                        value={user_phone}
                        onChange={(event)=>{this.handleInputs(event.target.value, "user_phone")}}
                        onBlur = {(event) =>{this.handleBlur(event.target.value, "user_phone")}}
                        placeholder='Enter Phone no'
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
                    Sign Up
                </button>
                {showSubmitError && <p className={errorMsg==='Registered Successfully' ? "green" :"error-message" }>*{errorMsg}</p>}
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
                {this.renderSignupcard()}
            </div>
        )
    }
}

export default Signup