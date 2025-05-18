import React, { useState } from 'react'
import PostingPets from './PostingPets'
import AdoptingRequests from './AdoptingRequests'
import AdoptedHistory from './AdoptedHistory'
import ApprovedRequests from './ApprovedRequests'
import AppointmentRequests from './AppointmentRequests'

const AdminScreen = () => {
  const [screen, setScreen] = useState('postingPet')

  return (
    <div className='admin-screen-container'>
      <div className='admin-screen-left'>
        <div>
          <p onClick={() => setScreen('postingPet')}>Sell Pet Requests</p>
          <p onClick={() => setScreen('approvedRequests')}>List Approved Pets</p>
          <p onClick={() => setScreen('adoptingPet')}>Adoption Requests</p>
          <p onClick={() => setScreen('adoptedHistory')}>Adopted History</p>
          <p onClick={() => setScreen('appointments')}>Vet Appointments</p>
        </div>
      </div>
      <div className='admin-screen-right'>
        {screen === 'postingPet' && <PostingPets />}
        {screen === 'approvedRequests' && <ApprovedRequests />}
        {screen === 'adoptingPet' && <AdoptingRequests />}
        {screen === 'adoptedHistory' && <AdoptedHistory />}
        {screen === 'appointments' && <AppointmentRequests />}
      </div>
    </div>
  )
}

export default AdminScreen
