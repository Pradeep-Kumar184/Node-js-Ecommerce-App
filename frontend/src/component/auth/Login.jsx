
import React, { useState } from 'react'
import Layout from '../Layout'
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {toast} from "react-toastify"
import { useLocation, useNavigate } from 'react-router';
import axios from "axios"
import {  useAuth } from '../context/auth';
const Login = () => {
    const navigate = useNavigate();
    const location=useLocation()
    const [auth,setAuth]=useAuth()
    const [data,setData]=useState({
        email:"",
        password:"",
    })
    const handleInput=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
   try {
    let res=await axios.post(`http://localhost:5000/api/auth/login`,data);
    console.log(res)
     if(res.data.success){
    
        toast.success(res.data.message,{autoClose:1000})
        setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token
        })
        localStorage.setItem("auth",JSON.stringify(res.data))
        setTimeout(() => {
            navigate(location.state ||"/")
        }, 2000);
      }

     else {
        toast.error(res.data.error, { autoClose: 1000 });
      }
   } catch (error) {
    console.log(error)
    toast.error(error)
   }
    }
  return (
   
        <Layout>
        <div className='container m-3'>
        <div className='row justify-content-center'>
            
            <div className='col-md-6'>
                <div className='card p-3'>
                <Form onSubmit={handleSubmit} >
       
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email"  value={data.email}  onChange={handleInput} placeholder='Enter your email'/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" value={data.password} onChange={handleInput} placeholder='Enter your password' />
        </FormGroup>
        <div className='mb-3'>
        <Button color='success'className='w-100' onClick={()=>{navigate("/forgot-password")}}>Forgot Password</Button>
        </div>
        <Button color='success'className='w-100'>Login</Button>
      </Form>
      </div>
      </div>
            
        </div>
        </div>
    </Layout>
    
  )
}

export default Login
