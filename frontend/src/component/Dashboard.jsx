import React from 'react'
import Layout from './Layout';

export default function Dashboard() {
  return (
    <Layout>
       <div className='row'>
        <div className='col-md-4'>left</div>
        <div className='col-md-8'>right</div>
       </div>
    </Layout>
  )
}
