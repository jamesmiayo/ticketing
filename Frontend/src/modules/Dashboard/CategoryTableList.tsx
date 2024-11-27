import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import TableComponents from '../../components/common/TableComponents';

export default function CategoryTableList({data , isLoading}:any) {
    const columns = [
        { field: "category", headerName: "Category", width: 200 },
        { field: "sub_category", headerName: "Sub Category", width: 180 },
        { field: "total_tickets", headerName: "Total Ticket", width: 100 },
      ];
  return (
    <Paper
    elevation={4}
    sx={{
      p: 3,
      background: "white",
      borderRadius: 3,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      flex: 1,
      minWidth: "30%",
    }}
  >
    <Box>
    <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Category List</Typography>
      </Box>
      <TableComponents
        columns={columns}
        rows={data}
        height={350}
        isLoading={isLoading}
      />
    </Box>
  </Paper>
  )
}
