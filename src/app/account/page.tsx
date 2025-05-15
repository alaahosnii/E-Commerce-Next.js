import React from 'react'
import UserDetailsForm from '@/app/_components/UserDetailsForm/UserDetailsForm';
import PageNav from '@/app/_components/PageNav/PageNav';
import Welcome from '@/app/_components/Welcome/Welcome';
function Account() {

  return (
    <div >
      <div className='flex justify-between container mt-4'>
        <PageNav title="Account" />
        <Welcome />
      </div>
      <div className='container flex mt-5 justify-center' style={{ height: "100vh" }}>
        <UserDetailsForm />

      </div>

    </div>
  )
}

export default Account