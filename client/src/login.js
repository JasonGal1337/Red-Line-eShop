import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import "../src/styles/index.css"
import { useState } from "react";
import axios from "axios";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
          navigate("/homepage");
      }
  }, []);

    function toSignup() {
        navigate("/signup");
    }

    function login(){ 
      axios.post("http://localhost:4000/user/login", { email, password }).then(({data})=>{
        console.log(data);
        if(data.token){
          localStorage.setItem("token", data.token);
          navigate("/homepage");
          window.location.reload();
        } else {
          alert(data.msg);
        }
      })
    }    

    return (
      <div className='login-container'>
        <input type="email" placeholder="email" onChange={(e) => {setEmail(e.target.value)}} />
        <input type="password" placeholder="password" onChange={(e) => {setPassword(e.target.value)}} />
        <button onClick={()=> {login();}}>Login</button>
        <p>Don't have an account?</p>
        <a onClick={() => {
            toSignup();
        }}>Create Account</a>
      </div>
    );
  }
  
  export default Login;