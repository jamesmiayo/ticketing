import { useEffect, useState } from "react";
import { Branch } from "../../api/services/branch";
import { Division } from "../../api/services/division";
import { Box, Button, Grid } from "@mui/material";
import { useExecuteToast } from "../../context/ToastContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  updateUserBranchSection,
  updateUserBranchSectionFormType,
} from "../../schema/User/UpdateUserBranchSection";
import SelectItem from "../../components/common/SelectItem";
import { User } from "../../api/services/user";
import { useAuth } from "../../context/AuthContext";

export default function UpdateUserBranchSection({ onClose }: any) {
  const [branch, setBranch] = useState<any>([]);
  const [division, setDivision] = useState<any>([]);
  const [department, setDepartment] = useState<any>([]);
  const [section, setSection] = useState([]);
  const { setUser } = useAuth();

  const toast = useExecuteToast();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<updateUserBranchSectionFormType>({
    resolver: yupResolver(updateUserBranchSection),
  });

  const fetchBranch = async () => {
    try {
      const response = await Branch.getBranch();
      const data = response.map((row: any) => {
        return {
          value: row.id,
          label: row.branch_description,
        };
      });
      setBranch(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDivision = async () => {
    try {
      const response = await Division.getDivision();
      const data = response.map((row: any) => {
        return {
          value: row.id,
          label: row.division_description,
          department: row.department,
        };
      });
      setDivision(data);
    } catch (err) {
      console.log(err);
    }
  };

  function handleDivisionChange(divisionID: any) {
    const data = division
      ?.find((row: any) => row?.value == divisionID)
      .department.map((row: any) => {
        return {
          value: row.id,
          label: row.department_description,
          section: row.section,
        };
      });

    setDepartment(data);
    setSection([]);
  }

  function handleDepartmentChange(section: any) {
    const data = department
      ?.find((row: any) => row?.value === section)
      .section.map((row: any) => {
        return { value: row.id, label: row.section_description };
      });
    setSection(data);
  }

  const onSubmit: SubmitHandler<updateUserBranchSectionFormType> = async (
    formData: any
  ) => {
    try {
      const response = await User.updateUserBranchSection(formData);
      setUser(response.data);
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      onClose(false);
    }
  };
  useEffect(() => {
    fetchBranch();
    fetchDivision();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 1,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SelectItem
              label="Branch"
              control={control}
              options={branch}
              name="branch_id"
              errors={errors}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <SelectItem
              label="Division"
              control={control}
              options={division}
              errors={errors}
              name="division_id"
              onChange={(e: any) => handleDivisionChange(e)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <SelectItem
              label="Department"
              control={control}
              options={department}
              errors={errors}
              name="department_id"
              onChange={(e: any) => handleDepartmentChange(e)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <SelectItem
              label="Section"
              control={control}
              options={section}
              errors={errors}
              name="section_id"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <Button type="submit" variant="contained" color="success" fullWidth>
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
