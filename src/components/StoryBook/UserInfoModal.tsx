import { Dialog } from '@mui/material';

import { User } from '../../interfaces/user';

interface Props {
  userInfo: User;
  open: boolean;
  onClose: () => void;
}

const UserInfoModal = ({ userInfo, open, onClose }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <div>{userInfo.fullName}</div>
    </Dialog>
  );
};

export default UserInfoModal;
