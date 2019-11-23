import { useState, useEffect } from 'react';
import peopleApi from '../../../api/people';
import { getState } from '../../hooks/useAuthState';

export const usePeopleList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { token } = getState();
      const listLoaded = await peopleApi.getList(token);
      setList(listLoaded);
    };
    fetchData();
  }, []);
  return list;
};
