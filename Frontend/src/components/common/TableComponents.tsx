import { Box, Grid, Button, Pagination, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import InputComponent from "./InputComponent";
import SelectItem from "./SelectItem";
import InputDateComponent from "./InputDateComponent";

interface DataGridProps {
  columns: any;
  rows: any;
  height?: number;
  width?: string;
  onPageChange?: (page: number) => void;
  pageProps?: string;
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
  onSubmit?: () => void;
  maxCount?: string;
  isLoading?: boolean;
  onReset?: () => void;
}

const TableComponents = ({
  columns,
  rows,
  onPageChange,
  pageProps,
  height = 300,
  width = "100%",
  customInputs = [],
  onSubmit,
  maxCount,
  isLoading = false,
  onReset,
}: DataGridProps) => {
  const [page, setPage] = useState(Number(pageProps));
  const [, setSearchParams] = useSearchParams();

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
    setSearchParams({ page: newPage.toString() });
    onPageChange?.(newPage);
  };

  return (
    <>
      {customInputs.length > 0 && (
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            marginBottom: 5,
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
            borderRadius: 5,
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit?.();
            }}
          >
            <Grid container spacing={2}>
              {customInputs.map((inputProps, index) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                  {inputProps.type === "text" ? (
                    <InputComponent {...inputProps} />
                  ) : inputProps.type === "select" ? (
                    <SelectItem {...inputProps} />
                  ) : inputProps.type === "date" ? (
                    <InputDateComponent {...inputProps} />
                  ) : null}
                </Grid>
              ))}
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                }}
              >
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  type="button"
                  onClick={onReset}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      )}

      <div style={{ height: height, width: width }}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter
          loading={isLoading}
          disableColumnMenu 
          sx={{
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
            bgcolor: "white",
            "& .MuiDataGrid-cell": {
              textAlign: "center",
              padding: "4px",
              fontSize: "0.875rem",
            },
            "& .MuiDataGrid-columnHeaders": {
              padding: "4px",
              fontSize: "0.875rem",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontSize: "0.875rem",
            },
            "& .MuiDataGrid-row": {
              maxHeight: "40px",
              minHeight: "40px",
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
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#3f51b5",
                    border: "1px solid #3f51b5",
                    backgroundColor: "#ffffff",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#3f51b5",
                    color: "#ffffff",
                  },
                  "& .MuiPaginationItem-root:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    overflowX: "auto !important",
                  },
                  "& .MuiDataGrid-root": {
                    overflowX: "visible",
                  },
                }}
              />
            </Stack>
          )}
        </Box>
      </div>
    </>
  );
};

export default TableComponents;
