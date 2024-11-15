import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface DataGridProps<T> {
  columns: GridColDef[];
  rows: GridRowsProp;
  onPageChange: (page: number) => void;
  pageProps: string;
}

const TableComponents = <T,>({
  columns,
  rows,
  onPageChange,
  pageProps,
}: DataGridProps<T>) => {
  const [page, setPage] = useState(Number(pageProps));
  const [, setSearchParams] = useSearchParams();

  const handleNext = () => {
    const newPage = page + 1;
    setPage(newPage);
    setSearchParams({ page: newPage.toString() });
    onPageChange(newPage); // Notify parent of page change
  };

  const handlePrev = () => {
    const newPage = Math.max(page - 1, 1);
    setPage(newPage);
    setSearchParams({ page: newPage.toString() });
    onPageChange(newPage); // Notify parent of page change
  };

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination={false}
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
      </div>
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
    </>
  );
};

export default TableComponents;
