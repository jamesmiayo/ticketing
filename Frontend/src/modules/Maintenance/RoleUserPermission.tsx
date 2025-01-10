"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { Permission } from "../../api/services/permission";
import { useExecuteToast } from "../../context/ToastContext";
import { FaSpinner } from "react-icons/fa";

interface PermissionType {
  id: string;
  name: string;
  checked: boolean;
  permissions: any;
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
          data?.permissions?.some((item: any) => item.id === perm.id) || false,
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
      toast.executeToast("Failed to fetch permissions", "top-center", true, {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPermission();
  }, [data]);

  const onSubmit = async (formData: { permissions: PermissionType[] }) => {
    const checkedPermissions = formData.permissions
      .filter((permission) => permission.checked)
      .map((permission) => permission.name);
    try {
      setLoading(true);
      const response: any = await Permission.assignRolePermission(
        data?.id,
        checkedPermissions
      );
      toast.executeToast(response.message, "top-center", true, {
        type: "success",
      });
      refetch();
      onClose(false);
    } catch (e) {
      toast.executeToast("Failed to assign permissions", "top-center", true, {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: "100%", mx: "auto", p: 3 }}>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={200}
        >
          <CircularProgress />
        </Box>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {permissions?.map((permission: any, index: any) => (
              <Grid item xs={12} sm={6} md={3} key={permission.id}>
                <Controller
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
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "0.875rem",
                          fontWeight: 500,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading && <FaSpinner className="animate-spin" />}
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </Paper>
  );
}
