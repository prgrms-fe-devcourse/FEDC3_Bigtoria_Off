import { Divider, IconButton, Stack } from '@mui/material';
import { useState } from 'react';

import TabButtonItem from './TabItem';

/*
 * TODO
 * 1. TabItem 컴포넌트 분리 및 최적화
 */

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
    <Stack
      direction='row'
      spacing={2}
      divider={<Divider orientation='vertical' flexItem />}>
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
