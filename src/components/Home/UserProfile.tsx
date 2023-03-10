import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { COLORS } from '../../constants/colors';

interface Props {
  path: string;
  image: string | undefined;
  fullName: string;
  job: string;
  year: string;
}

const UserProfile = ({ path, image, fullName, job, year }: Props) => {
  const navigate = useNavigate();

  return (
    <ListItem
      sx={{
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.06)',
        borderRadius: 4,
        marginBottom: '12px',
        padding: 0,
      }}>
      <ListItemButton
        onClick={() => navigate(path)}
        sx={{ padding: '18px 20px', borderRadius: 3.5 }}>
        <ListItemAvatar sx={{ marginRight: '15px' }}>
          <Avatar
            sx={{
              width: 54,
              height: 54,
              backgroundColor: `${!image ? COLORS.SUB : ''}`,
            }}
            alt={fullName}
            src={image ? image : ''}
          />
        </ListItemAvatar>
        <ListItemText
          primary={fullName}
          secondary={
            <React.Fragment>
              <Typography sx={{ display: 'inline' }} component='span'>
                {year}
              </Typography>
              <Typography
                sx={{ display: 'inline', marginLeft: '7px' }}
                component='span'>
                {job}
              </Typography>
            </React.Fragment>
          }></ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default UserProfile;
