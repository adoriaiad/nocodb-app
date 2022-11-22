import React, { useEffect, useState } from 'react';
import { ITeamMember } from '../models/type';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

function TeamList() {
  const [rows, setRows] = useState<ITeamMember[]>([]);

  const columns: GridColDef[] = [
    { field: 'Username', headerName: 'User Name', width: 110 },
    { field: 'Nome', headerName: 'Nome', width: 150, editable: true },
    { field: 'Cognome', headerName: 'Cognome', width: 150, editable: true },
    { field: 'Email', headerName: 'Email', width: 150, editable: true },
    { field: 'Progetti', headerName: 'Progetti', width: 160, editable: true },
  ];

  useEffect(() => {
    loadTeam();
  }, []);

  function loadTeam() {}

  return (
    <div style={{ height: 400, width: '100%' }}>
      <span>
        <h2>Team</h2>
      </span>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default TeamList;
