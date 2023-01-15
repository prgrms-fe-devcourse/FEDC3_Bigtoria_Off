import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';

import { Notification } from '../../interfaces/noti';

interface Props {
  noti: Notification;
}

const NOTI_MESSAGE = {
  LIKE: `님이 회원님께 좋아요를 보냈습니다.`,
  COMMENT: `님이 회원님을 팔로우합니다. `,
  FOLLOW: `님이 회원님께 메세지를 보냈습니다.`,
  MESSAGE: `님이 회원님 게시글에 댓글을 남겼습니다.`,
};

const { LIKE, COMMENT, FOLLOW, MESSAGE } = NOTI_MESSAGE;

const NotificationMsg = ({ noti }: Props) => {
  const { author } = noti;

  //TODO
  //회원 프로필 사진이랑 링크
  //게시글 링크

  const generateMsg = (noti: Notification) => {
    if (noti.like) return `${author.fullName}${LIKE}`;
    if (noti.comment) return `${author.fullName}${COMMENT}`;
    if (noti.follow) return `${author.fullName}${FOLLOW}`;
    if (noti.message) return `${author.fullName}${MESSAGE}`;
  };

  const handleDeleteClick = () => {
    //Todo: remove alarm
  };

  return (
    <ListItem
      sx={{
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.06)',
        borderRadius: 2,
        marginBottom: '12px',
      }}>
      <ListItemText primary={generateMsg(noti)} />
      <IconButton edge='end' aria-label='delete' onClick={handleDeleteClick}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default NotificationMsg;
