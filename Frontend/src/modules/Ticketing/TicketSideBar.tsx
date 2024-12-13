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
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useContext } from "react";
import { PermissionContext } from "../../helpers/Providers/PermissionProvider";
import { IoDocuments } from "react-icons/io5";
import { FaImages } from "react-icons/fa";

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
  const { permission } = useContext(PermissionContext);

  const items = [
    { label: "Ticket", icon: <ConfirmationNumber />, show: true },
    { label: "Logs", icon: <Assignment />, show: true },
    {
      label: "Action Taken",
      icon: <HelpOutlineIcon />,
      show: permission?.includes("Can View Ticket Remarks"),
    },
    { label: "Documents", icon: <IoDocuments />, show: true },
    { label: "Images", icon: <FaImages />, show: true },
  ];

  return (
    <StyledPaper sx={{ height: "400px" }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        Navigation
      </Typography>
      <Box>
        {items
          .filter((item) => item.show)
          .map((item, index) => (
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
