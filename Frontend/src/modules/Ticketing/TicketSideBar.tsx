import {
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  Box,
  ListItemIcon,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ConfirmationNumber, Assignment } from "@mui/icons-material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1.5),
  maxWidth: "200px",
  height: "auto",
  boxShadow: theme.shadows[3],
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[6],
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(0.5),
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    transform: "translateX(5px)",
  },
}));

interface TicketSideBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function TicketSideBar({
  activeSection,
  setActiveSection,
}: TicketSideBarProps) {
  const items = [
    { label: "Ticket", icon: <ConfirmationNumber /> },
    { label: "Logs", icon: <Assignment /> },
  ];

  return (
    <StyledPaper sx={{ height: "400px" }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        Navigation
      </Typography>
      <Box>
        {items.map((item, index) => (
          <StyledListItemButton
            key={index}
            onClick={() => setActiveSection(item.label)}
            selected={activeSection === item.label}
            sx={{
              backgroundColor:
                activeSection === item.label
                  ? (theme) => theme.palette.primary.light
                  : "transparent",
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  activeSection === item.label
                    ? "primary.main"
                    : "text.secondary",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                color:
                  activeSection === item.label
                    ? "primary.main"
                    : "text.primary",
                fontWeight: activeSection === item.label ? 600 : 400,
              }}
            />
          </StyledListItemButton>
        ))}
      </Box>
    </StyledPaper>
  );
}
