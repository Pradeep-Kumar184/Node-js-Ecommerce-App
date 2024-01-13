
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner'

export default function PrivateRoute() {
      const [ok,setOk]=useState(false)
      const [auth,setAuth] = useAuth()
       useEffect(()=>{
               const authCheck =()=>{
                const res = axios.get(`http://localhost:5000/api/auth/user-auth`,{
                    headers:{"Authorization":auth?.token}
                })
                if(res.data.ok)
                {
                 setOk(true)
                }
                else
                setOk(false)
               } 
               if(auth?.token)
               {
                authCheck()
               }

       },[auth?.token])
       
       return ok ?<Outlet/>:<Spinner/>

}
