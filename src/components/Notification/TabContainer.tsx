import { Stack } from '@mui/material';
import { useState } from 'react';

import TabButtonItem from './TabItem';

interface Props {
  onClick: (type: string) => void;
}

const TAB_TYPE = {
  MESSAGE: 'message',
  POST: 'post',
};

const { MESSAGE, POST } = TAB_TYPE;

const TabContainer = ({ onClick }: Props) => {
  const [tabValue, setTabValue] = useState('message');

  return (
    <Stack direction='row' spacing={2}>
      <TabButtonItem
        text='메세지'
        type={MESSAGE}
        curTabValue={tabValue}
        onClick={() => {
          setTabValue(MESSAGE);
          onClick(MESSAGE);
        }}
      />
      <TabButtonItem
        text='게시글'
        type={POST}
        curTabValue={tabValue}
        onClick={() => {
          setTabValue(POST);
          onClick(POST);
        }}
      />
    </Stack>
  );
};

export default TabContainer;
