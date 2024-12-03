import React, { useState } from "react";
import { Typography, Tabs, Tab, Paper, Box } from "@mui/material";
import CategoryManagementTable from "./CategoryManagementTable";
import DepartmentTable from "./DepartmentTable";
import SectionTable from "./SectionTable";
import SubCategoryTable from "./SubCategoryTable";
import BranchTable from "./BranchTable";
import RoleTable from "./RoleTable";
import UserManagementTable from "./UserManagementTable";

export default function MaintenancePage() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      component="main"
      sx={{
        p: 3,
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "#010001",
          borderRadius: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="maintenance tabs"
          allowScrollButtonsMobile
          sx={{
            "& .MuiTabs-indicator": {
              height: 3,
              borderRadius: "3px 3px 0 0",
              backgroundColor: "#fff",
            },
            "& .MuiTab-root": {
              color: "white",
            },
            "& .Mui-selected": {
              color: "#ffff",
              fontWeight: "bold",
            },
          }}
        >
          <Tab label="Users" />
          <Tab label="Category" />
          <Tab label="Sub Category" />
          <Tab label="Department" />
          <Tab label="Section" />
          <Tab label="Branch" />
          <Tab label="Roles" />
        </Tabs>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          backgroundColor: "transparent",
          width: "100%",
          mt: 2,
        }}
      >
        {value === 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Manage User Access
            </Typography>
            <Typography>Manage and organize your categories here.</Typography>
            <Box sx={{ mt: 5 }}>
              <UserManagementTable />
            </Box>
          </>
        )}
        {value === 1 && (
          <>
            <Typography variant="h6" gutterBottom>
              Category Management
            </Typography>
            <Typography>Manage and organize your categories here.</Typography>
            <Box sx={{ mt: 5 }}>
              <CategoryManagementTable />
            </Box>
          </>
        )}
        {value === 2 && (
          <>
            <Typography variant="h6" gutterBottom>
              Sub Category Management
            </Typography>
            <Typography>
              Manage and organize your sub categories here.
            </Typography>
            <Box sx={{ mt: 5 }}>
              <SubCategoryTable />
            </Box>
          </>
        )}
        {value === 3 && (
          <>
            <Typography variant="h6" gutterBottom>
              Department Overview
            </Typography>
            <Typography>View and edit department information.</Typography>
            <Box sx={{ mt: 5 }}>
              <DepartmentTable />
            </Box>
          </>
        )}
        {value === 4 && (
          <>
            <Typography variant="h6" gutterBottom>
              Section Control
            </Typography>
            <Typography>Adjust and monitor different sections.</Typography>
            <Box sx={{ mt: 5 }}>
              <SectionTable />
            </Box>
          </>
        )}
        {value === 5 && (
          <>
            <Typography variant="h6" gutterBottom>
              Branch Control
            </Typography>
            <Typography>Check and modify current Branches.</Typography>
            <Box sx={{ mt: 5 }}>
              <BranchTable />
            </Box>
          </>
        )}
        {value === 6 && (
          <>
            <Typography variant="h6" gutterBottom>
              Role Assignment
            </Typography>
            <Typography>Manage user roles and permissions.</Typography>
            <Box sx={{ mt: 5 }}>
              <RoleTable />
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}
