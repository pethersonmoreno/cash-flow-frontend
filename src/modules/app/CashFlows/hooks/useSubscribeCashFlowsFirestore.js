import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import subscribeFirestore from '../../../utils/firestore/subscribeFirestore';
import { COLLECTION_NAME } from '../constants';
import * as actions from '../actions/actionsCashFlows';

const useSubscribePeopleFirestore = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeFirestore = subscribeFirestore(
      COLLECTION_NAME,
      list => dispatch(actions.getCashFlows(list.map(item => ({
        ...item,
        dateTime: item.dateTime.toString(),
      })))),
    );
    return unsubscribeFirestore;
  }, [dispatch]);
};

export default useSubscribePeopleFirestore;