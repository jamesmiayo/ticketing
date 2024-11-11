import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from '@mui/material';
import userImage from '../../assets/images/user.png'; // Your user image path

// Define User type
interface User {
  name: string;
  branch: string;
  position: string;
  number: string;
  computer: string;
  userType: string;
}

// UserCard Component to display individual user info
const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardActionArea>
        <Stack direction="row" spacing={3}>
          <CardMedia
            component="img"
            height="250"
            image={userImage} // Replace with your actual image
            alt="user image"
          />
          <CardContent sx={{ width: '100%' }}>
            <Typography gutterBottom variant="h6" component="div">
              {user.name}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Branch:
              <span style={{ color: 'text.secondary', marginLeft: '8px' }}>
                {user.branch}
              </span>
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Position:
              <span style={{ color: 'text.secondary', marginLeft: '8px' }}>
                {user.position}
              </span>
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Number:
              <span style={{ color: 'text.secondary', marginLeft: '8px' }}>
                {user.number}
              </span>
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Computer:
              <span style={{ color: 'text.secondary', marginLeft: '8px' }}>
                {user.computer}
              </span>
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              User Type:
              <span style={{ color: 'text.secondary', marginLeft: '8px' }}>
                {user.userType}
              </span>
            </Typography>
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default UserCard;
