import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

function SignUp() {

  const {handleUserSignUp} = useAuth();

  const [credentials,setCredentials] = React.useState({
    name:'',
    email:'',
    password:'',
    password2:''
});

const handleInputChange =(e)=>{
  let name = e.target.name;
  let value = e.target.value;

  setCredentials({...credentials,[name]:value});
}

  return (
    <div className="auth--container">
    <div className="form--wrapper">
        <form onSubmit={(e)=>{handleUserSignUp(e,credentials)}}>
            <div className="field--wrapper">
                <label >Name:</label>
                <input type="text"
                 name='name' 
                 required 
                 placeholder='Enter your Full Name...'
                 value={credentials.name}
                 onChange={handleInputChange}
                 />
            </div>
            <div className="field--wrapper">
                <label >Email:</label>
                <input type="email"
                 name='email' 
                 required 
                 placeholder='Enter your Email...'
                 value={credentials.email}
                 onChange={handleInputChange}
                 />
            </div>
            <div className="field--wrapper">
                <label >Password:</label>
                <input type="password"
                 name='password' 
                 required 
                 placeholder='Enter Password...'
                 value={credentials.password}
                 onChange={handleInputChange}
                 />
            </div>
            <div className="field--wrapper">
                <label >Password:</label>
                <input type="password"
                 name='password2' 
                 required 
                 placeholder='Confirm your Password...'
                 value={credentials.password2}
                 onChange={handleInputChange}
                 />
            </div>
            <div className="field--wrapper">
                <input className='btn btn--lg btn--main' type="submit" value="SignUp" />
            </div>
        </form>
        <p>Already have an account? LogIn <Link to={"/login"}>here</Link></p>
    </div>
</div>
  )
}

export default SignUp;