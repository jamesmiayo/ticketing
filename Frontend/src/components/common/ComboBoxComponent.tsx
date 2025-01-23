import { Autocomplete, FormControl, TextField } from '@mui/material';
import { Controller, Control } from 'react-hook-form';

interface ComboBoxComponentProps<T> {
    name?: string;
    control?: Control<any>;
    options?: any[];
    label?: string;
    defaultValue?: T | null;
    isMultiple?: boolean;
    isFreeSolo?: boolean;
    getOptionLabel?: (option: any) => string;
    groupBy?: (option: T) => string;
    error?: object;
    sx?: object;
    onChange?: (value: any) => void; 
}

const ComboBoxComponent = <T,>({
    name,
    control,
    options = [],
    label = 'Select an option',
    defaultValue = null,
    isMultiple = false,
    isFreeSolo = false,
    getOptionLabel = (option: any) => option.label || '',
    groupBy,
    error = {},
    sx = {},
    onChange, 
}: ComboBoxComponentProps<T>) => {
    return (
        <FormControl
            size="small"
            variant="outlined"
            fullWidth
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
                        options={options}
                        getOptionLabel={getOptionLabel}
                        groupBy={groupBy}
                        value={
                            isMultiple
                                ? options.filter((opt) => field.value?.includes(opt.value))
                                : options.find((opt) => opt.value === field.value) || null
                        }
                        onChange={(event:any, value:any) => {
                            const newValue = isMultiple
                                ? value.map((v: any) => v.value)
                                : value?.value || '';

                            field.onChange(newValue); 
                            if (onChange && event) onChange(newValue);
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
