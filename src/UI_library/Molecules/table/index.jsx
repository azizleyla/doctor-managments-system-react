import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export default function MuiDataTable({ rows, columns, sx }) {
  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        getRowId={(row) => row._id}
        sx={{
          ...sx,
        }}
        rows={rows}
        disableColumnResize={true}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
