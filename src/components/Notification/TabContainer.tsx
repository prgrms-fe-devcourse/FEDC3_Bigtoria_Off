import { Stack } from '@mui/material';
import { useState } from 'react';

import TabButtonItem from './TabItem';

interface Props {
  onClick: (type: string) => void;
}

const TAB_TYPE = {
  FOLLOW: 'follow',
  POST: 'post',
};

const TAB_VALUE = {
  FOLLOW: '팔로우',
  POST: '좋아요 댓글',
};

const { FOLLOW, POST } = TAB_TYPE;

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
        text={TAB_VALUE.FOLLOW}
        type={FOLLOW}
        curTabValue={tabValue}
        onClick={() => {
          setTabValue(FOLLOW);
          onClick(FOLLOW);
        }}
      />
    </Stack>
  );
};

export default TabContainer;
