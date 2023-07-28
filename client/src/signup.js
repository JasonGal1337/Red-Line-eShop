import { useNavigate } from 'react-router-dom';
import "../src/styles/index.css"
import { useState } from "react";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [addedToCart, setAddedtoCart] = useState([]);
  const [boughtBefore, setBoughtBefore] = useState([]);

  function toLogin() {
      navigate("/");
  }

  function signup(){ 
    axios.post("http://localhost:4000/user/signup", { email, password, name, surname, address, zip, addedToCart, boughtBefore }).then(({data})=>{
      console.log(data);
      if(data.token){
        localStorage.setItem("token", data.token);
        navigate("/homepage");
      } else {
        alert(data.msg);
      }
    })
  }

    return (
      <div className='signup-container'>
        <input type="email" placeholder="email" onChange={(e) => {setEmail(e.target.value)}} />
        <input type="password" placeholder="password" onChange={(e) => {setPassword(e.target.value)}} />
        <input type="text" placeholder="name" onChange={(e) => {setName(e.target.value)}} />
        <input type="text" placeholder="surname" onChange={(e) => {setSurname(e.target.value)}} />
        <input type="text" placeholder="address" onChange={(e) => {setAddress(e.target.value)}} />
        <input type="number" placeholder="zip" onChange={(e) => {setZip(e.target.value)}} />
        <button onClick={()=> {signup();}}>Create Account</button>
        <p>Already have an account?</p>
        <a onClick={() => {
            toLogin();
        }}>Login</a>
      </div>
    );
  }
  
  export default Signup;