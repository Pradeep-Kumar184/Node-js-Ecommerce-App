import React from 'react'
import Layout from '../component/Layout'
import { useAuth } from '../component/context/auth'
const Home = () => {
  const[auth,setAuth]=useAuth()
  return (
    <Layout>
        <pre>
          {
            JSON.stringify(auth,null,4)
          }
        </pre>
    </Layout>
  )
}

export default Home
