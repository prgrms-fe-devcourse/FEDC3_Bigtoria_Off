import { Button } from '@mui/material';

interface Props {
  text: string;
  type: string;
  curTabValue: string;
  onClick: () => void;
}
const TabButtonItem = ({ text, type, curTabValue, onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      variant={`${curTabValue === type ? 'contained' : 'outlined'}`}
      sx={{ flex: 1 }}>
      {text}
    </Button>
  );
};

export default TabButtonItem;
