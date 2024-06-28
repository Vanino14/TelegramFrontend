import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { useCallback } from 'react';
import { useState } from 'react';

export const AccountSearch = ({ searchQuery, onSearchChange })=> {
  const handleSearchChange = useCallback((event) => {
    onSearchChange(event.target.value);
  }, [onSearchChange]);
  return(
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search User"
      value={searchQuery}
      onChange={handleSearchChange}
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
  </Card>
)};
