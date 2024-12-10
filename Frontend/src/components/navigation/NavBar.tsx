import React from "react";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../../context/AuthContext";

const NavBar: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        padding: 1,
        position: "fixed",
        right: 0,
      }}
    >
      <Toolbar>
        <Box>
          <Avatar
            src={user?.profile_picture}
            sx={{
              cursor: "pointer",
              width: 40,
              height: 40,
              marginLeft: 2,
              "&:hover": {
                opacity: 0.8,
              },
            }}
            component={Link}
            to="/profile"
          />
        </Box>
      </Toolbar>
    </Box>
  );
};

export default NavBar;
