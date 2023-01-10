import { Box, TextField } from '@mui/material';
import { dummy } from 'dummy';
import { ChangeEvent, useEffect, useState } from 'react';

const SearchForm = () => {
  const [value, setValue] = useState('');
  const userMap = new Map();

  useEffect(() => {
    //TODO
    //1. api로 유저 목록 불러오기
    //  - offset, limit 활용(예정)
    //2. map으로 저장하기

    dummy.map((data: User) => {
      const { fullName } = data;
      const { name } = JSON.parse(fullName);

      userMap.set(name, []);
      userMap.set(name, [...userMap.get(name), data]);
    });
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const keyword = value;
    const keys = userMap.keys();
    const filteredUsers = [];

    for (const key of keys) {
      if (key.toLowerCase().match(keyword.toLowerCase()))
        filteredUsers.push(...userMap.get(key));
    }

    //TODO
    //1. filterUser목록 넘겨주기
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <TextField
        required
        autoFocus
        type='text'
        label='user name'
        onChange={handleChange}
      ></TextField>
    </Box>
  );
};

export default SearchForm;
