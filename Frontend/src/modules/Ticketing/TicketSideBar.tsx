import { ListItemButton, ListItemText, Paper } from "@mui/material";

export default function TicketSideBar({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
}) {
  const items = [
    { label: "Ticket" },
    { label: "Costs" },
    { label: "Historical" },
    { label: "All" },
  ];

  return (
    <Paper
      elevation={2}
      sx={{
        backgroundColor: "white",
        padding: 2,
        width: "200px",
        height: "300px",
      }}
    >
      {items.map((item, index) => (
        <ListItemButton
          key={index}
          component="a"
          onClick={() => setActiveSection(item.label)}
          sx={{
            backgroundColor:
              activeSection === item.label ? "primary.light" : "white",
            "&:hover": {
              backgroundColor: "primary.light",
            },
            borderRadius: "4px",
            mb: 1,
          }}
        >
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              color:
                activeSection === item.label ? "primary.main" : "text.primary",
              fontWeight: activeSection === item.label ? "bold" : "normal",
            }}
          />
        </ListItemButton>
      ))}
    </Paper>
  );
}
