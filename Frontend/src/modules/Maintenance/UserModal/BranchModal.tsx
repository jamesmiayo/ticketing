import { useEffect, useState } from "react";
import SelectItem from "../../../components/common/SelectItem";
import { Branch } from "../../../api/services/branch";
import { useForm } from "react-hook-form";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  branchUser,
  branchUserFormType,
} from "../../../schema/User/UpdateUserBranch";
import { User } from "../../../api/services/user";

export default function BranchModal({ data, setOpen, refetch }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<branchUserFormType>({
    resolver: yupResolver(branchUser),
  });

  const [dataValue, setDataValue] = useState([]);
  const getDataList = async () => {
    try {
      const response = await Branch.getBranch();
      const data = response.map((row: any) => ({
        value: row.id,
        label: row.branch_description,
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
      await User.updateUserBranch(data.id, formData);
      refetch();
    } catch (error) {}
    setOpen(false);
  };
  return (
    <>
      <DialogTitle>Select User Branch</DialogTitle>
      <DialogContent>
        <form style={{ marginTop: 10 }} onSubmit={handleSubmit(onSubmit)}>
          <SelectItem
            label="Branch"
            control={control}
            options={dataValue}
            errors={errors}
            name="branch_id"
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
