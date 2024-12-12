import { Autocomplete, FormControl, TextField } from '@mui/material';
import { Controller, Control } from 'react-hook-form';

interface ComboBoxComponentProps<T> {
    name?: string;
    control?: Control<any>;
    options?: any;
    label?: string;
    defaultValue?: T | null;
    isMultiple?: boolean;
    isFreeSolo?: boolean;
    getOptionLabel?: (option: any) => string;
    groupBy?: (option: T) => string;
    error?: object;
    sx?: object;
}

const ComboBoxComponent = <T,>({
    name,
    control,
    options,
    label = 'Select an option',
    defaultValue = null,
    isMultiple = false,
    isFreeSolo = false,
    getOptionLabel = (option: any) => option.label || '',
    groupBy,
    error = {},
    sx = {},
}: ComboBoxComponentProps<T>) => {
    return (
        <FormControl
            size="small"
            variant="outlined"
            fullWidth
            style={{ minWidth: '250px' }}
        >
            <Controller
                name={name || ""}
                control={control}
                defaultValue={defaultValue}
                rules={error}
                render={({ field, fieldState }) => (
                    <Autocomplete
                        size="small"
                        multiple={isMultiple}
                        freeSolo={isFreeSolo}
                        options={options || []}
                        getOptionLabel={getOptionLabel}
                        groupBy={groupBy}
                        value={options.find((opt:any) => opt.value === field.value) || null}
                        onChange={(event, value:any) => {
                            console.log(event)
                            field.onChange(value?.value || '') 
                        }}
                        sx={{ ...sx }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                variant="outlined"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                )}
            />
        </FormControl>
    );
};

export default ComboBoxComponent;
