import { Box, IconButton, Grid, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import InputComponent from "./InputComponent"; // Importing your custom InputComponent

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
  }[]; // Updated type for custom inputs
  onSubmit: () => void; // Submit handler passed from parent
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
}: DataGridProps<T>) => {
  const [page, setPage] = useState(Number(pageProps));
  const [, setSearchParams] = useSearchParams();

  const handleNext = () => {
    const newPage = page + 1;
    setPage(newPage);
    setSearchParams({ page: newPage.toString() });
    onPageChange(newPage);
  };

  const handlePrev = () => {
    const newPage = Math.max(page - 1, 1);
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
            justifyContent: "end",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              aria-label="Previous page"
              onClick={handlePrev}
              disabled={page === 1} // Disable when on first page
              sx={{
                bgcolor: "background.paper",
                boxShadow: 2,
                "&:hover": {
                  bgcolor: "background.paper",
                  boxShadow: 4,
                },
                transition: "box-shadow 0.3s ease-in-out",
              }}
            >
              <IoIosArrowDropleftCircle />
            </IconButton>
            <IconButton
              aria-label="Next page"
              onClick={handleNext}
              sx={{
                bgcolor: "background.paper",
                boxShadow: 2,
                "&:hover": {
                  bgcolor: "background.paper",
                  boxShadow: 4,
                },
                transition: "box-shadow 0.3s ease-in-out",
              }}
            >
              <IoIosArrowDroprightCircle />
            </IconButton>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default TableComponents;
