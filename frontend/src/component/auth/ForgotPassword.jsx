import React,{useState}from 'react'
import Layout from '../Layout'
import { Button, Form, FormGroup, Input} from 'reactstrap';
import {toast} from "react-toastify"
// import {  useNavigate } from 'react-router';
import axios from "axios"

const ForgotPassword = () => {
    // const navigate = useNavigate();
    const [email,setEmail]=useState("")
    const[answer,setAnswer]=useState("")
    const[newPassword,setNewPassword]=useState("")
    // const [data,setData]=useState({
    //     email:"",
    //     newPassword:"",
    //     answer:""
    // })
    const handleSubmit=async(e)=>{
        e.preventDefault()
   try {
    let res=await axios.post(`http://localhost:5000/api/auth/login`,{email,newPassword,answer});
    console.log(res)
     if(res.data.success){
        toast.success(res.data.message,{autoClose:1000})
      }
     else {
        toast.error(res.data.error, { autoClose: 1000 });
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
          {/* <Label for="exampleEmail">Email</Label> */}
          <Input type="email" name="email"  value={email}  onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email'/>
        </FormGroup>
        <FormGroup>
          {/* <Label for="examplePassword">Password</Label> */}
          <Input type="Password" name="newPassword" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder='Enter new password' />
        </FormGroup>
        <FormGroup>
          {/* <Label for="examplePassword"></Label> */}
          <Input type="text" name="answer" value={answer} onChange={(e)=>setAnswer(e.target.value)} placeholder='Your favorite sports' />
        </FormGroup>
     
        <Button color='success'className='w-100'>Reset</Button>
      </Form>
      </div>
      </div>
            
        </div>
        </div>
    </Layout>
  )
}

export default ForgotPassword
