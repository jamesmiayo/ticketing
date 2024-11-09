import React from 'react';
import { Box, Typography } from '@mui/material'; // We only need Box and Typography
import UserCard from '../../components/common/UserCard';

// Sample user data
const user = {
  name: 'James Miayo',
  branch: 'Head office',
  position: 'Fullstack developer',
  number: '1239456890',
  computer: 'Dell XPS 13',
  userType: 'Tech',
};

const UserPage: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        User Details
      </Typography>

      {/* Centering the UserCard using Box */}
      <Box
        sx={{
          display: 'flex', // Use flexbox layout
          justifyContent: 'left', // Center the content horizontally
          alignItems: 'center', // Center the content vertically (in case of a tall screen)
        }}
      >
        <UserCard user={user} /> {/* Pass the user data as prop */}
      </Box>
    </div>
  );
};

export default UserPage;
