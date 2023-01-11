import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';

interface Props {
  path: string;
  image: string | undefined;
  fullName: string;
  job: string;
  year: string;
}

//Thinking: 이름을 띄우는 게 나은가, 사람 이미지가 나은가?
const stringToAvatar = (name: string) => {
  const nameArr = name.split(' ');

  return {
    children: `${nameArr[0][0]}${nameArr.length > 1 ? nameArr[1][0] : ''}`,
  };
};

const UserProfile = ({ path, image, fullName, job, year }: Props) => {
  return (
    <ListItem
      sx={{
        boxShadow: 1,
        borderRadius: 2,
        marginBottom: '20px',
        padding: 0,
      }}
    >
      <ListItemButton component='a' href={path} sx={{ padding: '15px' }}>
        <ListItemAvatar sx={{ marginRight: '15px' }}>
          {image ? (
            <Avatar sx={{ width: 56, height: 56 }} alt={fullName} src={image} />
          ) : (
            // <Avatar
            //   sx={{ width: 56, height: 56 }}
            //   {...stringToAvatar(fullName)}
            // />
            <Avatar sx={{ width: 56, height: 56 }} alt={fullName} />
          )}
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
