import { useContext, useEffect, useState } from "react";
import { Announcement } from "../../api/services/announcement";
import { Box, Button, Dialog, Paper, Tooltip, Typography } from "@mui/material";
import { IoAddCircleSharp } from "react-icons/io5";
import AnnouncementForm from "./AnnouncementForm";
import { PermissionContext } from "../../helpers/Providers/PermissionProvider";
import { AccessTime } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FaFileAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

export default function AnnouncementPage() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState([]);
  const { permission } = useContext(PermissionContext);
  const fetchData = async () => {
    try {
      const response = await Announcement.getAnnouncement();
      setData(response);
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileClick = (file: any) => {
    if (file) {
      window.open(file, "_blank");
    } else {
      console.error("File URL is missing");
    }
  };

  function handleAnnouncement(value: any) {
    setDefaultValue(value);
    setOpen(true);
  }
  return (
    <>
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        maxWidth="md"
        fullWidth
      >
        <AnnouncementForm
          setOpen={setOpen}
          refetch={fetchData}
          defaultValue={defaultValue}
        />
      </Dialog>
      <Box
        component="main"
        sx={{
          p: 3,
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Announcement List
        </Typography>
        {permission?.includes("Can Create Announcement") && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleAnnouncement(null)}
              startIcon={<IoAddCircleSharp />}
            >
              Create Announcement
            </Button>
          </Box>
        )}

        <Box
          sx={{
            height: "80vh",
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            overflowY: "auto",
          }}
        >
          <Box sx={{ padding: 3 }}>
            {data && data.length > 0 ? (
              data.map((row: any, index: number) => (
                <Paper
                  key={index}
                  elevation={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      {row?.title || "No Title"}
                    </Typography>
                    {permission?.includes("Can Update Announcement") && (
                      <Tooltip title="Edit Announcement">
                        <FaPencilAlt
                          onClick={() => handleAnnouncement(row)}
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    )}
                  </Box>
                  <Typography variant="body1">
                    {row?.description || "No Description"}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Created By:
                      {row?.created_by?.name || "Unknown"}
                    </Typography>
                    {row?.updated_by !== null && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Updated By:
                        {row?.updated_by?.name || "Unknown"}
                      </Typography>
                    )}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <AccessTime fontSize="small" sx={{ mr: 0.5 }} />
                      {row?.created_at}
                    </Typography>
                    {row?.attachments !== null && (
                      <Typography
                        onClick={() => handleFileClick(row?.attachments)}
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <FaFileAlt fontSize="small" />
                        File Attached
                      </Typography>
                    )}
                  </Box>
                </Paper>
              ))
            ) : (
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
              >
                No announcements to display.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
