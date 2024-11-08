import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import Stack from '@mui/material/Stack'
import userImage from '../../assets/images/user.png'

export default function ActionAreaCard() {
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
          <CardContent>
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
              Branch: Some Branch Name
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Position: Manager
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Number: 123-456-789
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Computer: Dell XPS 13
            </Typography>
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  )
}
