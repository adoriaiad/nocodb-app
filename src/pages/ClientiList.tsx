import React, { useEffect, useState } from 'react';
import { IList, IPageInfo } from '../models/clienti';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getCustomers } from '../services/nocodb.service';
import { nanoid } from 'nanoid';

function ClientiList() {
  const [rows, setRows] = useState<IList[]>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    isFirstPage: true,
    isLastPage: false,
    page: 1,
    pageSize: 10,
    totalRows: 0,
  });

  const columns: GridColDef[] = Object.keys(rows).map(key => {
    return { field: key, headerName: key, width: 110 };
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  function loadCustomers() {
    getCustomers()
      .then(res => {
        setRows(res.list);
        setPageInfo(res.PageInfo);
      })
      .catch(err => console.log(err));
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <span>
        <h2>Clienti</h2>
      </span>
      <DataGrid
        getRowId={() => nanoid()}
        rows={rows}
        columns={columns}
        pageSize={pageInfo?.pageSize}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default ClientiList;
