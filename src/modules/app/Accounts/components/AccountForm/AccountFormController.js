/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AccountFormView from './AccountFormView';
import usePeopleList from '../../../../utils/hooks/usePeopleList';
import getMessageFromError from '../../../../utils/helpers/getMessageFromError';
import api from '../../../../utils/api/accounts';
import { useAccount } from '../../selectors/selectorsAccounts';
import useInputValue from '../../../../utils/hooks/useInputValue';
import { useToken } from '../../../../auth/selectors/selectorsAuth';

const AccountFormController = ({ match: { params: { id } }, history }) => {
  const token = useToken();
  const [description, onChangeDescription, setDescription] = useInputValue('');
  const [currentValue, onChangeCurrentValue, setCurrentValue] = useInputValue(0);
  const [personId, onChangePersonId, setPersonId] = useInputValue('');
  const [peopleList] = usePeopleList();
  const registry = useAccount(id);
  useEffect(() => {
    if (registry) {
      setDescription(registry.description);
      setCurrentValue(registry.currentValue);
      setPersonId(registry.personId);
    }
  }, [registry, setCurrentValue, setDescription, setPersonId]);
  const saveRegistry = async () => {
    try {
      const registryToSave = {
        personId,
        description,
        currentValue,
      };
      if (id) {
        await api.replace(token, id, registryToSave);
      } else {
        await api.add(token, registryToSave);
      }
      history.push('/accounts');
    } catch (error) {
      alert(getMessageFromError(error));
    }
  };
  return (
    <AccountFormView
      description={description}
      onChangeDescription={onChangeDescription}
      currentValue={currentValue}
      onChangeCurrentValue={onChangeCurrentValue}
      personId={personId}
      onChangePersonId={onChangePersonId}
      peopleList={peopleList}
      save={saveRegistry}
    />
  );
};
AccountFormController.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};


export default AccountFormController;
