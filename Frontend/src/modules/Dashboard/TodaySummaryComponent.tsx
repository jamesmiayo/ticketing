import { Box, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material'
import React from 'react'
import {
    OpenInNew as OpenInNewIcon,
    CheckCircleOutline as CheckCircleOutlineIcon,
    AddCircleOutline as AddCircleOutlineIcon,
  } from "@mui/icons-material";
export default function TodaySummaryComponent({totalTicket}:any) {
  return (
    <Box sx={{ maxWidth: 400, width: "100%", mb: 4, height: "auto" }}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    background: "white",
                    borderRadius: 3,
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    height: "340px",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      mb: 2,
                      fontWeight: "600",
                      color: "text.primary",
                      textAlign: "center",
                    }}
                  >
                    Today's Issue Summary
                  </Typography>
                  <List
                    sx={{
                      display: "flex",
                      padding: 0,
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <ListItem
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 1,
                        backgroundColor: "rgba(63, 81, 181, 0.1)",
                        borderRadius: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: "auto" }}>
                          <OpenInNewIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Total Open"
                          primaryTypographyProps={{
                            variant: "body2",
                            sx: {
                              color: "text.secondary",
                              fontWeight: 500,
                            },
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "text.primary" }}
                      >
                        {totalTicket?.total_today_created_ticket?.total_open}
                      </Typography>
                    </ListItem>
                    <ListItem
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 1,
                        backgroundColor: "rgba(76, 175, 80, 0.1)",
                        borderRadius: 2,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <ListItemIcon sx={{ minWidth: "auto" }}>
                          <CheckCircleOutlineIcon color="success" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Total Solved"
                          primaryTypographyProps={{
                            variant: "body2",
                            sx: {
                              color: "text.secondary",
                              fontWeight: 500,
                            },
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "text.primary" }}
                      >
                        {totalTicket?.total_today_created_ticket?.total_resolved}
                        </Typography>
                    </ListItem>
                    <ListItem
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 1,
                        backgroundColor: "rgba(156, 39, 176, 0.1)",
                        borderRadius: 2,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <ListItemIcon sx={{ minWidth: "auto" }}>
                          <AddCircleOutlineIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Total Created"
                          primaryTypographyProps={{
                            variant: "body2",
                            sx: {
                              color: "text.secondary",
                              fontWeight: 500,
                            },
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "text.primary" }}
                      >
                        {totalTicket?.total_today_created_ticket?.total_created}
                        </Typography>
                    </ListItem>
                  </List>
                </Paper>
              </Box>
  )
}
