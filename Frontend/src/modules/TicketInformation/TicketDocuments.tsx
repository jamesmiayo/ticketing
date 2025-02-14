import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  useTheme,
} from "@mui/material";
import { Description, AccessTime } from "@mui/icons-material";

// interface Document {
//   id: string;
//   title: string;
//   date: string;
//   time: string;
// }

const TicketDocuments = ({data} :any) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          p: 2,
          textAlign: "center",
        }}
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
          Ticket Documents
        </Typography>
      </Box>
      <CardContent sx={{ minHeight: '700px'}}>
        <List>
        {data?.flatMap((ticket:any) => ticket.documents).map((row:any) => (
            <ListItem
              onClick={() => window.open(row.file_url, "_blank")}
              key={row.id}
              sx={{
                cursor: "pointer",
                mb: 2,
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
                boxShadow: 1,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 3,
                },
              }}
            >
              <ListItemIcon>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  <Description />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Document File
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: theme.palette.text.secondary,
                      mt: 1,
                    }}
                  >
                    <AccessTime fontSize="small" sx={{ mr: 0.5 }} />
                    {`${row.created_at}`}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TicketDocuments;
