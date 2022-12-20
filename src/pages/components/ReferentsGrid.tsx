import React, { useState } from 'react';
import {
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { IReferenteCliente, IReferenteInterno } from '../../models/clienti';

export type ReferentsGridProps = {
  title: string;
  data: IReferenteCliente[] | IReferenteInterno[];
  loadIntReferent: (checked: number[]) => void;
};

function ReferentsGrid(props: ReferentsGridProps) {
  const { title, data, loadIntReferent } = props;

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
  return (
    <Grid item xs={12} md={6}>
      <div>{title}:</div>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
      >
        {data.map((ref, i) => (
          <ListItem
            key={`ref-${i}`}
            disablePadding
            secondaryAction={
              <IconButton
                edge="end"
                aria-label={'message'}
                onClick={() => {
                  loadIntReferent(checked);
                }}
              >
                <CommentIcon />
              </IconButton>
            }
          >
            <ListItemButton onClick={handleToggle(ref.Id)} dense>
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
              <ListItemText id={`id-${ref.Id}`} primary={ref.Alias} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}

export default ReferentsGrid;
