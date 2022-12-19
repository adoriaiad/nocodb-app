import React, { useEffect, useState } from 'react';
import { IList, ILogo, IPageInfo } from '../models/clienti';
import { GridColDef } from '@mui/x-data-grid';
import { useNocodbApi } from '../services/nocodb.service';
import isEmpty from 'lodash.isempty';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

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
  const { getCustomers } = useNocodbApi();

  useEffect(() => {
    loadCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEmpty(rows)) {
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
        customizeRow(res.list);
        console.log('LIST', res.list);
        setPageInfo(res.pageInfo);
      })
      .catch(err => console.log(err));
  }

  function customizeRow(rows: any[]) {
    try {
      const customizedRows = rows.map(row => {
        const keys = Object.keys(row).map(key => {
          return key.replace(' ', '');
        });
        const logo = row.Logo ? (row.Logo as ILogo[])[0].url : '';
        return { ...row, Logo: logo };
      });

      setRows(customizedRows);
    } catch (error) {
      console.log('Error', error);
      setRows(rows);
    }
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <span>
        <h2>Clienti</h2>
      </span>
      <List
        sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
      >
        {rows.map((row, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start" key={index}>
              <ListItemButton key={index}>
                <ListItemAvatar key={index}>
                  <Avatar alt={''} src={row.Logo as string} />
                </ListItemAvatar>
                <ListItemText
                  key={index}
                  primary={''}
                  secondary={
                    <React.Fragment key={index}>
                      <Typography
                        key={index}
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {row['Nome Azienda']}
                      </Typography>
                      {row.Memo}
                    </React.Fragment>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" key={index} />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default ClientiList;
