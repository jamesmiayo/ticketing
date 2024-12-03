import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { Permission } from "../../api/services/permission";
import { useExecuteToast } from "../../context/ToastContext";

interface PermissionType {
  id: string;
  name: string;
  checked: boolean;
  permissions:any;
}
interface RoleUserPermissionProps {
  data: any;
  refetch: () => void;
  onClose: any;
}

export default function RoleUserPermission({
  data,
  refetch,
  onClose,
}: RoleUserPermissionProps) {
  const [permissions, setPermissions] = useState<PermissionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useExecuteToast();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      permissions: [] as PermissionType[],
    },
  });

  const getPermission = async () => {
    try {
      setLoading(true);
      const response = await Permission.getPermission();
      const permissionsWithChecked = response.map((perm: PermissionType) => ({
        ...perm,
        checked:
          data?.permissions?.some((item:any) => item.id === perm.id) || false,
      }));
      setPermissions(permissionsWithChecked);
      setValue(
        "permissions",
        permissionsWithChecked.map((perm: any) => ({
          id: perm.id,
          name: perm.name,
          checked: perm.checked,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch permissions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPermission();
  }, [data]);

  const onSubmit = (formData: { permissions: PermissionType[] }) => {
    const checkedPermissions = formData.permissions
      .filter((permission) => permission.checked)
      .map((permission) => permission.name);
    try {
      const response:any = Permission.assignRolePermission(
        data?.id,
        checkedPermissions
      );
      toast.executeToast(response.message, "top-center", true, {
        type: "success",
      });
      refetch();
      onClose(false);
    } catch (e) {}
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
            backgroundColor: "#f0f0f0", // Optional background color
          }}
        >
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {permissions?.map((permission:any, index:any) => (
            <Controller
              key={permission.id}
              name={`permissions.${index}.checked`} 
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        setPermissions((prev) =>
                          prev.map((perm, i) =>
                            i === index
                              ? { ...perm, checked: e.target.checked }
                              : perm
                          )
                        );
                      }}
                      color="primary"
                    />
                  }
                  label={permission.name}
                />
              )}
            />
          ))}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      )}
    </>
  );
}
