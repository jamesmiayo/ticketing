import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import SelectItem from "./SelectItem";
import InputDateComponent from "./InputDateComponent";
import ComboBoxComponent from "./ComboBoxComponent";
import { User } from "../../api/services/user";
import { Branch } from "../../api/services/branch";
import { Division } from "../../api/services/division";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { csatFormtype, csatType } from "../../schema/Csat/csat";

export default function GlobalFilterComponents({
  onReset,
  onSubmit,
}: any) {
  const [branch, setBranch] = useState<any>([]);
  const [division, setDivision] = useState<any>([]);
  const [department, setDepartment] = useState<any>([]);
  const [section, setSection] = useState<any>([]);
  const [userData, setUserData] = useState<any>([]);
  const [userOption, setUserOption] = useState<any>([]);

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<csatFormtype>({
    resolver: yupResolver(csatType),
  });

  const fetchBranchData = async () => {
    try {
      const response = await Branch.getBranchList();
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
      const response = await Division.getDivisionList();
      const data = response?.map((row: any) => ({
        value: row.id,
        label: row.division_description,
        department: row.active_department,
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
          section: row.active_section,
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

  const getUser = async () => {
    try {
      const response = await User.getUser(null);
      setUserData(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchBranchData();
    fetchDivisionData();
    getUser();
  }, []);

  const searchFilter = [
    {
      name: "branch_id",
      label: "Branch",
      register,
      control,
      errors,
      options: branch,
      type: "combobox",
    },
    {
      name: "division_id",
      label: "Division",
      register,
      errors,
      control,
      options: division,
      type: "combobox",
      onChange: (e: any) => handleDivision(e),
    },
    {
      name: "department_id",
      label: "Department",
      register,
      errors,
      control,
      options: department,
      type: "combobox",
      onChange: (e: any) => handleDepartment(e),
    },
    {
      name: "section_id",
      label: "Section",
      register,
      errors,
      control,
      options: section,
      type: "combobox",
      onChange: (e: any) => handleSection(e),
    },
    {
      name: "user_id",
      label: "User",
      register,
      errors,
      control,
      options: userOption,
      type: "combobox",
    },
    {
      name: "start_date",
      label: "Start Date",
      register: register,
      control: control,
      errors: errors,
      type: "date",
    },
    {
      name: "end_date",
      label: "End Date",
      register: register,
      control: control,
      errors: errors,
      type: "date",
    },
  ];

  const handleResetClick = () => {
    onReset();
    reset();
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: 2,
        marginBottom: 1,
        borderRadius: 2,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} alignItems="center">
          {searchFilter.map((inputProps: any, index: any) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              {inputProps.type === "text" ? (
                <InputComponent {...inputProps} />
              ) : inputProps.type === "select" ? (
                <SelectItem {...inputProps} />
              ) : inputProps.type === "date" ? (
                <InputDateComponent {...inputProps} />
              ) : inputProps.type === "combobox" ? (
                <ComboBoxComponent {...inputProps} />
              ) : null}
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4} lg={2}>
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
                onClick={handleResetClick}
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
