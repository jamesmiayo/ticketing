import { Box, Grid, Button, Pagination, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import InputComponent from "./InputComponent";

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
  }[];
  onSubmit: () => void;
  maxCount: string;
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
          <Grid container spacing={2} mb={4}>
            {customInputs.map((inputProps, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <InputComponent {...inputProps} />
              </Grid>
            ))}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                marginLeft: "12px",
              }}
            >
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Box>
          </Grid>
        </form>

        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter
          sx={{
            "& .MuiDataGrid-cell": {
              textAlign: "center",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
              textAlign: "center",
            },
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Stack spacing={2}>
            <Pagination
              count={Number(maxCount)}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              variant="outlined"
            />
          </Stack>
        </Box>
      </div>
    </>
  );
};

export default TableComponents;
