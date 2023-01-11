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
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.06)',
        borderRadius: 2,
        marginBottom: '12px',
        padding: 0,
      }}
    >
      <ListItemButton
        onClick={() => navigate(path)}
        sx={{ padding: '20px 18px' }}
      >
        <ListItemAvatar sx={{ marginRight: '20px' }}>
          <Avatar
            sx={{ width: 42, height: 42 }}
            alt={fullName}
            src={image ? image : ''}
          />
        </ListItemAvatar>
        <ListItemText
          primary={fullName}
          secondary={
            <React.Fragment>
              <Typography sx={{ display: 'inline' }} component='span'>
                {year} {job}
              </Typography>
            </React.Fragment>
          }
        ></ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default UserProfile;
