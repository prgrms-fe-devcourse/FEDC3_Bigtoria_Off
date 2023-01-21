import { Dialog } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
}

const UserInfoModal = ({ open, onClose }: Props) => {
  return <Dialog open={open} onClose={onClose}></Dialog>;
};

export default UserInfoModal;
