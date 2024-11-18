import { Box, Grid, Button, Pagination, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import InputComponent from "./InputComponent";
import SelectItem from "./SelectItem";
import InputDateComponent from "./InputDateComponent";

interface DataGridProps<T> {
  columns: GridColDef[];
  rows: GridRowsProp;
  height?: number;
  width?: string;
  onPageChange: (page: number) => void;
  pageProps: string;
  customInputs?: {
    name: string;
    label: string;
    register: any;
    errors: any;
    multiline?: boolean;
    rows?: number;
    rest?: any;
    type: string;
  }[];
  onSubmit: () => void;
  maxCount: string;
  isLoading?: boolean;
}

const TableComponents = <T,>({
  columns,
  rows,
  onPageChange,
  pageProps,
  height = 400,
  width = "100%",
  customInputs = [],
  onSubmit,
  maxCount,
  isLoading = false,
}: DataGridProps<T>) => {
  const [page, setPage] = useState(Number(pageProps));
  const [, setSearchParams] = useSearchParams();

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
    setSearchParams({ page: newPage.toString() });
    onPageChange(newPage);
  };

  return (
    <>
      <div style={{ height: height, width: width }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {customInputs.length > 0 && (
            <Grid container spacing={2} mb={4}>
              {customInputs.map((inputProps, index) => (
                <Grid item key={index}>
                  {inputProps.type === "text" ? (
                    <InputComponent {...inputProps} />
                  ) : inputProps.type === "select" ? (
                    <SelectItem {...inputProps}/>
                  ) : inputProps.type === "date" ? (
                    <InputDateComponent {...inputProps}/>
                  ) : null}
                </Grid>
              ))}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "12px",
                  gap: 1
                }}
              >
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
                <Button variant="contained" color="secondary" type="submit">
                  Clear
                </Button>
              </Box>
            </Grid>
          )}
        </form>

        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter
          loading={isLoading}
          sx={{
            bgcolor: "#d0e1e9",
            "& .MuiDataGrid-cell": {
              textAlign: "center",
              bgcolor: "#d0e1e9",
            },
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "#d0e1e9",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#000", // Adjust text color if needed for better visibility
            },
            "& .MuiDataGrid-row": {
              bgcolor: "#d0e1e9",
            },
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          {maxCount && (
            <Stack spacing={2}>
              <Pagination
                count={Number(maxCount)}
                page={page}
                onChange={handlePageChange}
                shape="rounded"
                variant="outlined"
              />
            </Stack>
          )}
        </Box>
      </div>
    </>
  );
};

export default TableComponents;
