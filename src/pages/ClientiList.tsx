import React, { useEffect, useState } from 'react';
import { IList, IPageInfo } from '../models/clienti';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getCustomers } from '../services/nocodb.service';
import { nanoid } from 'nanoid';
import { isEmptyArray } from 'formik';

function ClientiList() {
  const [rows, setRows] = useState<IList[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    isFirstPage: true,
    isLastPage: false,
    page: 1,
    pageSize: 10,
    totalRows: 0,
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    if (!isEmptyArray(rows)) {
      setColumns(
        Object.keys(rows[0]).map((key, index) => {
          return { field: key, headerName: key, width: 110 };
        })
      );
    }
  }, [rows]);

  function loadCustomers() {
    getCustomers()
      .then(res => {
        setRows(res.list);
        setPageInfo(res.pageInfo);
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
        columns={columns.filter((item, index) => {
          if (index <= 7) {
            return item;
          }
        })}
        pageSize={pageInfo?.pageSize}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default ClientiList;
