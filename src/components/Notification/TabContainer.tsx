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

const TAB_VALUE = {
  MESSAGE: '메세지',
  POST: '게시글',
};

const { MESSAGE, POST } = TAB_TYPE;

const TabContainer = ({ onClick }: Props) => {
  const [tabValue, setTabValue] = useState(POST);

  return (
    <Stack direction='row' spacing={2}>
      <TabButtonItem
        text={TAB_VALUE.POST}
        type={POST}
        curTabValue={tabValue}
        onClick={() => {
          setTabValue(POST);
          onClick(POST);
        }}
      />
      <TabButtonItem
        text={TAB_VALUE.MESSAGE}
        type={MESSAGE}
        curTabValue={tabValue}
        onClick={() => {
          setTabValue(MESSAGE);
          onClick(MESSAGE);
        }}
      />
    </Stack>
  );
};

export default TabContainer;
