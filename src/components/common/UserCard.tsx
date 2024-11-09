import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Stack from '@mui/material/Stack';
import userImage from '../../assets/images/user.png';

export default function UserCard() {
  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardActionArea>
        <Stack direction="row" spacing={3}>
          <CardMedia
            component="img"
            height="250"
            image={userImage}
            alt="user image"
          />
          <CardContent sx={{ width: '100%' }}>
            <Typography gutterBottom variant="h6" component="div">
              Details
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Name:
              <span style={{ color: 'text.secondary', marginLeft: '8px' }}>
                James Miayo
              </span>
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Branch:
              <span style={{ color: 'text.secondary', marginLeft: '8px' }}>
                Head office
              </span>
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Position:
              <span style={{ color: 'text.secondary', marginLeft: '8px' }}>
                Fullstack developer
              </span>
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Number:
              <span style={{ color: 'text.secondary', marginLeft: '8px' }}>
                1239456890
              </span>
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Computer:
              <span style={{ color: 'text.secondary', marginLeft: '8px' }}>
                Dell XPS 13
              </span>
            </Typography>
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
