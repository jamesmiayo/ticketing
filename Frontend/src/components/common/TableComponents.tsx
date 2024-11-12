import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

interface DataGridProps<T> {
  columns: GridColDef[];
  rows: GridRowsProp;
}

const TableComponents = <T,>({ columns, rows }: DataGridProps<T>) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        sx={{
          '& .MuiDataGrid-cell': {
            textAlign: 'center', 
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold', 
            textAlign: 'center', 
          },
        }}
      />
    </div>
  );
};

export default TableComponents;
