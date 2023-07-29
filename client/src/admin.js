import { useNavigate } from 'react-router-dom';
import "../src/styles/index.css"
import { useState } from "react";
import axios from "axios";

function Admin() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function admin(){ 
      axios.post("http://localhost:4000/admin/login", { username, password }).then(({data})=>{
        console.log(data);
        if(data.token){
          localStorage.setItem("token", data.token);
          navigate("/admin/main");
        } else {
          alert(data.msg);
        }
      })
    }    

    return (
        <div className='admin-container'>
          <input type="text" placeholder="username" onChange={(e) => {setUsername(e.target.value)}} />
          <input type="password" placeholder="password" onChange={(e) => {setPassword(e.target.value)}} />
          <button onClick={()=> {admin();}}>Login</button>
        </div>
      );
  }
  
  export default Admin;