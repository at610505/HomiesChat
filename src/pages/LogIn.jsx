import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

function LogIn() {
    const {user, handleUserLogin} = useAuth();
    const navigate = useNavigate();

    const [credentials,setCredentials] = React.useState({
        email:'',
        password:''
    });

    useEffect(()=>{
        if(user){
            navigate('/');
        }
    },[])

    const handleInputChange =(e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setCredentials({...credentials,[name]:value});
        // console.log(credentials);
    }

  return (
    <div className="auth--container">
        <div className="form--wrapper">
            <form onSubmit={(e)=>{handleUserLogin(e,credentials)}}>
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
                    <input className='btn btn--lg btn--main' type="submit" value="Login" />
                </div>
            </form>
            <p>Don't have an account? Register <Link to={"/signup"}>here</Link></p>
        </div>
    </div>
  )
}

export default LogIn;