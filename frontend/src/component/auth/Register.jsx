import React, { useState } from 'react'
import Layout from '../Layout'
import { Button, Form, FormGroup, Input} from 'reactstrap';
import {toast} from "react-toastify"
import { useNavigate } from 'react-router';
import axios from "axios"
const Register = () => {
    const navigate=useNavigate()
    const [data,setData]=useState({
        name:"",
        email:"",
        password:"",
        answer:"",
    })
    const handleInput=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
   try {
    let res=await axios.post(`http://localhost:5000/api/auth/register`,data);
    console.log(res)
     if(res.data.success){
      if(res.status===200){
        toast.success(res.data.message,{autoClose:1000})
      }
      if(res.status===201){
        toast.success(res.data.message,{autoClose:1000})
      }
      toast.success(res.data.message,{autoClose:1000})
      setTimeout(() => {
        navigate('/login')
      }, 1000);
    }
   } catch (error) {
    console.log(error)
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
          <Input type="text" name="name" value={data.name} onChange={handleInput} placeholder='Enter your name' />
        </FormGroup>
        <FormGroup>
          <Input type="email" name="email"  value={data.email}  onChange={handleInput} placeholder='Enter your email'/>
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password" value={data.password} onChange={handleInput} placeholder='Enter your password' />
        </FormGroup>
        <FormGroup>
          <Input type="text" name="answer" value={data.answer} onChange={handleInput} placeholder='Enter your sports' />
        </FormGroup>
        <Button color='success'className='w-100'>Register</Button>
      </Form>
      </div>
      </div>
            
        </div>
        </div>
    </Layout>
  )
}

export default Register
