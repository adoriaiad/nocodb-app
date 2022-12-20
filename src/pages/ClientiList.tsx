import React, { useEffect, useState } from 'react';
import { IList, ILogo } from '../models/clienti';
import { useNocodbApi } from '../services/nocodb.service';
import isEmpty from 'lodash.isempty';
import {
  Avatar,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import ReferentsGrid from './components/ReferentsGrid';

function ClientiList() {
  const [rows, setRows] = useState<IList[]>([]);
  const { getCustomers, getWorkForce, getCustomerRef } = useNocodbApi();

  useEffect(() => {
    loadCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadCustomers() {
    getCustomers()
      .then(res => {
        customizeRow(res.list);
        //setPageInfo(res.pageInfo);
      })
      .catch(err => console.log(err));
  }

  function loadIntReferent(checked: number[]) {
    !isEmpty(checked) &&
      checked.map(rowId => {
        getWorkForce(rowId)
          .then(res => console.log('WORKFORCE', res))
          .catch(err => console.log(err));
      });
  }

  function loadCustomerReferent(checked: number[]) {
    !isEmpty(checked) &&
      checked.map(rowId => {
        getCustomerRef(rowId)
          .then(res => console.log('REFERENTI CLIENTE', res))
          .catch(err => console.log(err));
      });
  }

  function loadWebSite(url: string) {
    !isEmpty(url) && window.open(url);
  }

  function customizeRow(rows: any[]) {
    try {
      const customizedRows = rows.map(row => {
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
            <ListItem alignItems="flex-start" key={`item-${index}`}>
              <ListItemButton key={`button-${index}`}>
                <ListItemAvatar key={`item-avatar-${index}`}>
                  <Avatar
                    alt={''}
                    src={row.Logo as string}
                    key={`avatar-${index}`}
                    onClick={() => loadWebSite(row.SitoWeb)}
                  />
                </ListItemAvatar>
                <ListItemText
                  key={`item-text-${index}`}
                  primary={row['Nome Azienda']}
                  secondary={
                    <React.Fragment key={`fragm-${index}`}>
                      <Typography
                        key={`tip-${index}`}
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        <div>{`Stato: ${row.Stato}`}</div>
                        <div
                          style={{ fontWeight: 'bold' }}
                          onClick={() => loadWebSite(row.SitoWeb)}
                        >
                          {row.SitoWeb}
                        </div>
                        <Grid container spacing={2}>
                          <ReferentsGrid
                            title="Referenti interni"
                            data={row['Referente Interno']}
                            loadIntReferent={loadIntReferent}
                          />
                          <ReferentsGrid
                            title="Referenti cliente"
                            data={row['Referente Cliente']}
                            loadIntReferent={loadCustomerReferent}
                          />
                        </Grid>
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" key={`divider-${index}`} />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default ClientiList;
