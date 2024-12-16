import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import { Description, AccessTime } from "@mui/icons-material";

// interface Document {
//   id: string;
//   title: string;
//   date: string;
//   time: string;
//   imageUrl: string;
// }

const TicketImages = ({ data }:any) => {
  return (
    <Card sx={{ margin: "auto"}}>
      <Box
        sx={{ bgcolor: "primary.main", color: "primary.contrastText", p: 2 }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Description />
          Ticket Images
        </Typography>
      </Box>
      <CardContent sx={{ minHeight: '700px'}}>
        <Grid container spacing={2}>
          {data?.flatMap((ticket:any) => ticket.documents).map((row:any) => (
            <Grid item xs={6} sm={4} key={row.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardActionArea
                  onClick={() => window.open(row.file_url, "_blank")}
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={row.file_url}
                    alt={row.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <Box sx={{ p: 1, flexGrow: 1 }}>
                    <Typography variant="subtitle1" component="div" noWrap>
                      {row.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mt: 0.5,
                        fontSize: "0.75rem",
                      }}
                    >
                      <AccessTime fontSize="small" />
                      {row.created_at}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TicketImages;
