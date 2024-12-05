import React, { useState, useEffect } from 'react'
import { Button, Box, Grid, CircularProgress } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputComponent from '../../components/common/InputComponent'
import { useExecuteToast } from '../../context/ToastContext'
import { role, roleFormtype } from '../../schema/Role/role'
import { Role } from '../../api/services/role'
import {
  permission,
  permissionFormtype,
} from '../../schema/Permission/permission'
import { Permission } from '../../api/services/permission'

interface Props {
  refetch: () => void
  onClose: () => void
  defaultValues?: any
}

const PermissionForm: React.FC<Props> = ({
  refetch,
  onClose,
  defaultValues,
}) => {
  const [loading, setLoading] = useState(false)
  const toast = useExecuteToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<permissionFormtype>({
    resolver: yupResolver(permission),
  })

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.label,
      })
    }
  }, [defaultValues, reset])

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      if (defaultValues) {
        const response = await Permission.updatePermission({
          id: defaultValues.id,
          body: data,
        })
        toast.executeToast(response.message, 'top-center', true, {
          type: 'success',
        })
      } else {
        const response = await Permission.newPermission(data)
        toast.executeToast(response.message, 'top-center', true, {
          type: 'success',
        })
      }
      refetch()
      onClose()
    } catch (error) {
      console.error('Error saving category:', error)
      toast.executeToast(
        'Failed to save Permission. Please try again.',
        'top-center',
        true,
        { type: 'error' }
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: 1,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputComponent
              name="name"
              label="Permission"
              register={register}
              errors={errors}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : defaultValues ? (
                'Update'
              ) : (
                'Create'
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default PermissionForm
