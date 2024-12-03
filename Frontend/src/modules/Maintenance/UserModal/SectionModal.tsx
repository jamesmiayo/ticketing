import { useEffect, useState } from "react";
import { Department } from "../../../api/services/department";
import {
  sectionUser,
  sectionUserFormType,
} from "../../../schema/User/UpdateUserSection";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Division } from "../../../api/services/division";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SelectItem from "../../../components/common/SelectItem";
import { User } from "../../../api/services/user";

export default function SectionModal({ data, setOpen, refetch }: any) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<sectionUserFormType>({
    resolver: yupResolver(sectionUser),
  });

  const [dataValue, setDataValue] = useState<any>([]);
  const [department, setDepartment] = useState<any>([]);
  const [section, setSection] = useState<any>([]);
  const getDataList = async () => {
    try {
      const response = await Division.getDivision();
      const data = response.map((row: any) => ({
        value: row.id,
        label: row.division_description,
        department: row.department,
      }));
      setDataValue(data);
    } catch (error) {
      console.error("Error fetching category list:", error);
      throw error;
    }
  };
  useEffect(() => {
    getDataList();
  }, []);

  const onSubmit = async (formData: any) => {
    try {
      await User.updateUserSection(data.id, formData);
      refetch();
    } catch (error) {}
    setOpen(false);
  };

  function handleDivisionChange(division: any) {
    const data = dataValue
      ?.find((row: any) => row?.value == division)
      .department.map((row: any) => {
        return {
          value: row.id,
          label: row.department_description,
          section: row.section,
        };
      });

    setDepartment(data);
  }

  function handleDepartmentChange(section: any) {
    const data = department
      ?.find((row: any) => row?.value === section)
      .section.map((row: any) => {
        return { value: row.id, label: row.section_description };
      });
    setSection(data);
  }
  return (
    <>
      <DialogTitle>Select User Section</DialogTitle>
      <DialogContent>
        <form style={{ marginTop: 10 }} onSubmit={handleSubmit(onSubmit)}>
          <SelectItem
            label="Division"
            control={control}
            options={dataValue}
            errors={errors}
            name="division_id"
            onChange={(e: any) => handleDivisionChange(e)}
            fullWidth
          />
          <SelectItem
            label="Department"
            control={control}
            options={department}
            errors={errors}
            name="department_id"
            onChange={(e: any) => handleDepartmentChange(e)}
            fullWidth
          />
          <SelectItem
            label="Section"
            control={control}
            options={section}
            errors={errors}
            name="section_id"
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </>
  );
}
