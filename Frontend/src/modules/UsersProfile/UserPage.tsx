import React from 'react'
import { Box } from '@mui/material'
import UserCard from '../../components/common/UserCard'

interface UserPageProps {
  user: {
    name: string
    branch: string
    position: string
    number: string
    computer: string
    userType: string
  }
}

const UserPage: React.FC<UserPageProps> = ({ user }) => {
  if (!user) {
    return <div>Loading...</div> // Show loading state if user data is not available yet
  }

  return (
    <Box sx={{ padding: 3 }}>
      <UserCard user={user} /> {/* Pass the user data as prop to UserCard */}
    </Box>
  )
}

export default UserPage
