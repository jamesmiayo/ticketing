import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

interface DataGridProps<T> {
  columns: GridColDef[];
  rows: GridRowsProp;
  height?: number;
  width?: string;
}

const TableComponents = <T,>({ columns, rows , height = 400 , width = '100%' }: DataGridProps<T>) => {
  return (
    <div style={{ height: height , width: width }}>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter 
        sx={{
          backgroundColor: 'white',
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
