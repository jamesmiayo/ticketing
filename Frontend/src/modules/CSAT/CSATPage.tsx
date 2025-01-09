import { useEffect, useState } from "react";
import { CSAT } from "../../api/services/csat";
import { Box, Button, Dialog, Grid, Typography } from "@mui/material";
import ComboBoxComponent from "../../components/common/ComboBoxComponent";
import CSATBarGraph from "./CSATBarGraph";
import CSATPercentage from "./CSATPercentage";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import CSATStats from "./CSATStats";
import { BsEmojiFrown } from "react-icons/bs";
import { BsEmojiLaughing } from "react-icons/bs";
import { Branch } from "../../api/services/branch";
import { Division } from "../../api/services/division";
import { csatFormtype, csatType } from "../../schema/Csat/csat";
import InputDateComponent from "../../components/common/InputDateComponent";
import { User } from "../../api/services/user";
import { BsEmojiNeutral } from "react-icons/bs";
import TableComponents from "../../components/common/TableComponents";
import { FaStar } from "react-icons/fa";
import CSATTicketSatisfactoryData from "./CSATTicketSatisfactoryData";

export default function CSATPage() {
  const [csat, setCsat] = useState<any>([]);
  const [branch, setBranch] = useState<any>([]);
  const [division, setDivision] = useState<any>([]);
  const [department, setDepartment] = useState<any>([]);
  const [section, setSection] = useState<any>([]);
  const [userData, setUserData] = useState<any>([]);
  const [userOption, setUserOption] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rowData, setRowData] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<csatFormtype>({
    resolver: yupResolver(csatType),
  });

  const fetchData = async (params?: any) => {
    setIsLoading(true);
    try {
      const response = await CSAT.getCSAT(params);
      setCsat(response);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const response = await User.getUser(null);
      setUserData(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchBranchData = async () => {
    try {
      const response = await Branch.getBranch();
      const data = response.map((row: any) => {
        return { value: row.id, label: row.branch_description };
      });
      setBranch(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDivisionData = async () => {
    try {
      const response = await Division.getDivision();
      const data = response?.map((row: any) => ({
        value: row.id,
        label: row.division_description,
        department: row.department,
      }));
      setDivision(data);
    } catch (error) {
      console.error("Failed to fetch division:", error);
    }
  };

  const handleDivision = (department: string) => {
    const data = division
      .find((row: any) => row.value == department)
      ?.department?.map((row: any) => {
        return {
          value: row.id,
          label: row.department_description,
          section: row.section,
        };
      });
    setDepartment(data || []);
    setSection([]);
    setUserOption([]);
  };

  const handleSection = (section: any) => {
    const data = userData
      .filter((row: any) => row.section_id === section)
      ?.map((row: any) => ({
        value: row.id,
        label: row.name,
      }));
    setUserOption(data);
  };

  const handleDepartment = (departmentId: any) => {
    const data = department
      ?.find((department: any) => department.value === departmentId)
      ?.section?.map((row: any) => ({
        value: row.id,
        label: row.section_description,
      }));
    setSection(data || []);
    setUserOption([]);
  };

  const onSubmit: SubmitHandler<csatFormtype> = async (formData: any) => {
    try {
      await fetchData(formData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleReset = () => {
    fetchData();
    reset();
  };

  useEffect(() => {
    fetchBranchData();
    fetchData();
    fetchDivisionData();
    getUser();
  }, []);

  const columns = [
    {
      field: "ticket_id",
      headerName: "Ticket ID",
      width: 250,
      renderCell: (params: any) => params?.row?.ticket_id,
    },
    {
      field: "ticket_name",
      headerName: "Ticket Name",
      width: 250,
      renderCell: (params: any) => params?.row?.title,
    },
    {
      field: "assigneed",
      headerName: "Facilitator",
      width: 250,
      renderCell: (params: any) =>
        params?.row?.ticket_logs_latest?.assignee?.name,
    },
    {
      field: "satisfactory",
      headerName: "Overall Satisfaction",
      width: 250,
      renderCell: (params: any) => {
        return (
          <div>
            {params?.row?.ticket_satisfactory === null ? (
              "Unanswered Question"
            ) : (
              <>
                {params?.row?.ticket_satisfactory?.satisfactory_1}{" "}
                <FaStar color={"rgba(31, 80, 154 , 0.5)"} />
              </>
            )}
          </div>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Created On",
      width: 250,
      renderCell: (params: any) => params?.row?.created_at,
    },
  ];

  const handleRowClick = (params: any) => {
    setRowData(params.row);
    setOpen(true);
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={() => setOpen(false)}
      >
        <CSATTicketSatisfactoryData data={rowData} />
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
          Ticket Customer Satisfaction
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              backgroundColor: "white",
              height: "auto",
              padding: 3,
              mb: 2,
              borderRadius: 3,
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4} md={3} lg={2}>
                <ComboBoxComponent
                  label="Branch Name"
                  control={control}
                  error={errors}
                  options={branch}
                  name="branch_id"
                />
              </Grid>

              <Grid item xs={12} sm={4} md={3} lg={2}>
                <ComboBoxComponent
                  label="Division Name"
                  control={control}
                  options={division}
                  error={errors}
                  name="division_id"
                  onChange={(e: any) => handleDivision(e)}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={3} lg={2}>
                <ComboBoxComponent
                  label="Department Name"
                  control={control}
                  options={department}
                  error={errors}
                  name="department_id"
                  onChange={(e: any) => handleDepartment(e)}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={3} lg={2}>
                <ComboBoxComponent
                  label="Section Name"
                  control={control}
                  options={section}
                  error={errors}
                  name="section_id"
                  onChange={(e: any) => handleSection(e)}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={3} lg={2}>
                <ComboBoxComponent
                  label="User Name"
                  error={errors}
                  control={control}
                  options={userOption}
                  name="user_id"
                />
              </Grid>

              <Grid item xs={12} sm={4} md={3} lg={2}>
                <InputDateComponent
                  label="Start Date"
                  control={control}
                  name="start_date"
                />
              </Grid>

              <Grid item xs={12} sm={4} md={3} lg={2}>
                <InputDateComponent
                  label="End Date"
                  control={control}
                  name="end_date"
                />
              </Grid>

              <Grid item xs={12} sm={4} md={3} lg={2}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    type="button"
                    onClick={handleReset}
                  >
                    Clear
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </form>

        <Box>
          <CSATStats data={csat} isLoading={isLoading} />
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, marginBottom: 1, alignItems: "center" }}>
    <CSATPercentage
      data={csat?.average_satisfactory}
      isPassed={csat?.csat_passed}
    />
      <Box sx={{ flex: 1, minWidth: 0 }}>
    <TableComponents
      rows={csat?.data}
      columns={columns}
      onRowClick={handleRowClick}
    />
  </Box>
</Box>


          <Box sx={{ display: "flex", gap: 2 }}>
            <Box
              sx={{
                backgroundColor: "white",
                width: "25%",
                borderRadius: 3,
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "rgba(31, 80, 154 , 1)",
                }}
              >
                Total Ticket Satisfactory
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BsEmojiLaughing color={"green"} size={40} />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {csat?.total_satisfied} Satisfied
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BsEmojiNeutral color={"rgba(31, 80, 154 , 0.5)"} size={40} />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {csat?.total_neutral} Neutral
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BsEmojiFrown color={"red"} size={40} />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {csat?.total_unsatisfied} Not Satisfied
                </Typography>
              </Box>
            </Box>
            <Box
                sx={{
                  backgroundColor: "white",
                  padding: 2,
                  borderRadius: 2,
                  display: "flex",
                  width: "100%",                  
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CSATBarGraph data={csat?.satisfactory} />
              </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
