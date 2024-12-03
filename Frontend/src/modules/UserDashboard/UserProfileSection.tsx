"use client";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  Link,
  Skeleton,
  Typography,
  styled,
} from "@mui/material";
import {
  Edit,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { User } from "../../api/services/user";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}));

// const ActionLink = styled(Link)(({ theme }) => ({
//   color: theme.palette.primary.main,
//   textDecoration: "none",
//   display: "inline-flex",
//   alignItems: "center",
//   "&:hover": {
//     textDecoration: "underline",
//   },
// }));

export default function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);

  const dashboardFetchData = async () => {
    try {
      setLoading(true);
      const result = await User.getUserProfile();
      setData(result?.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    dashboardFetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <StyledCard sx={{ mb: 4 }}>
        <CardContent sx={{ width: "100%", textAlign: "center" }}>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Avatar
              src="/placeholder.svg"
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                bottom: 16,
                right: 0,
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {loading ? (
              <>
                <Skeleton variant="text" width="50%" height={30} />
                <Skeleton variant="text" width="70%" height={25} />
                <Skeleton variant="text" width="60%" height={25} />
                <Skeleton variant="text" width="60%" height={25} />
                <Skeleton
                  variant="rectangular"
                  width="30%"
                  height={30}
                  sx={{ mt: 2 }}
                />
              </>
            ) : (
              <>
                <Typography variant="h5" gutterBottom>
                  {data?.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {data?.section?.department?.division?.division_description}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {data?.section?.department?.department_description}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {data?.section?.section_description}
                </Typography>
                <Link
                  href={`mailto:${data?.email}`}
                  color="primary"
                  sx={{ mb: 2, display: "block" }}
                >
                  {data?.email}
                </Link>
              </>
            )}
          </Box>
        </CardContent>
      </StyledCard>
      {/* <TicketList
        ticketList={totalTicket?.total_ticket_count}
        isLoading={loading}
      /> */}
    </Container>
  );
}
