import React, { useEffect, useState } from 'react';
import { IList, ILogo, IPageInfo } from '../models/clienti';
import { GridColDef } from '@mui/x-data-grid';
import { useNocodbApi } from '../services/nocodb.service';
import isEmpty from 'lodash.isempty';
import {
  Avatar,
  Checkbox,
  Divider,
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

function ClientiList() {
  const [rows, setRows] = useState<IList[]>([]);
  const { getCustomers, getWorkForce } = useNocodbApi();

  const [checked, setChecked] = useState<number[]>([]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

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

  function loadIntReferent() {
    !isEmpty(checked) &&
      checked.map(rowId => {
        getWorkForce(rowId)
          .then(res => console.log('WORKFORCE', res))
          .catch(err => console.log(err));
      });
  }

  function loadWebSite(url: string) {
    !isEmpty(url) && window.open(url);
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

                        <div>Referenti:</div>
                        <List
                          sx={{
                            width: '100%',
                            maxWidth: 360,
                            bgcolor: 'background.paper',
                          }}
                        >
                          {row['Referente Interno'].map((ref, i) => (
                            <ListItem
                              key={`ref-${i}`}
                              disablePadding
                              secondaryAction={
                                <IconButton
                                  edge="end"
                                  aria-label={'message'}
                                  onClick={() => {
                                    loadIntReferent();
                                  }}
                                >
                                  <CommentIcon />
                                </IconButton>
                              }
                            >
                              <ListItemButton
                                onClick={handleToggle(ref.Id)}
                                dense
                              >
                                <ListItemIcon>
                                  <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(ref.Id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                      'aria-labelledby': ref.Alias,
                                    }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  id={`id-${ref.Id}`}
                                  primary={ref.Alias}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
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
