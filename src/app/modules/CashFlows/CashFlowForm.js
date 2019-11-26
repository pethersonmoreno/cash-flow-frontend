/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Paper, Autocomplete } from 'react-md';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import api from '../../../api/cashFlows';
import { getState } from '../../hooks/useAuthState';
import {
  useRegistry, usePeopleList, useCashFlowDescriptionsList, useAccountsList
} from './hooks';
import './CashFlowForm.scss';
import getMessageFromError from '../../../helpers/getMessageFromError';

const useInputValue = (initialValue, withEventTarget = true) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = eventValue => {
    const newValue = (withEventTarget ? eventValue.target.value : eventValue);
    setValue(newValue);
  };
  return [value, handleChange, setValue];
};

const getAccountDescription = (peopleList, account) => {
  const person = peopleList.find(p => p.id === account.personId);
  if (person) {
    return `${account.description} (${person.name})`;
  }
  return account.description;
};

const inOutList = [
  { id: true, description: 'Output' },
  { id: false, description: 'Input' },
];


const CashFlowForm = ({ match: { params: { id } }, history }) => {
  const [dateTime, setDateTime] = useState(new Date());
  const [inOut, onChangeInOut, setInOut] = useInputValue('');
  const [valueMoney, onChangeValueMoney, setValueMoney] = useInputValue(0);
  const [accountId, onChangeAccountId, setAccountId] = useInputValue('');
  const [cashFlowDescriptionId, onChangeCashFlowDescriptionId, setCashFlowDescriptionId] = useInputValue('');
  const [descriptionSearch, onChangeDescriptionSearch, setDescriptionSearch] = useInputValue('', false);
  const accountsList = useAccountsList();
  const peopleList = usePeopleList();
  const cashFlowDescriptionsList = useCashFlowDescriptionsList();
  const setRegistry = useCallback((registry, cashFlowDescription) => {
    setDateTime(new Date(registry.dateTime));
    setAccountId(registry.accountId);
    setInOut(registry.inOut);
    setCashFlowDescriptionId(registry.cashFlowDescriptionId);
    setValueMoney(registry.value);
    setDescriptionSearch(cashFlowDescription.name);
  }, [setAccountId, setInOut, setCashFlowDescriptionId, setValueMoney, setDescriptionSearch]);
  useRegistry(id, setRegistry);
  const saveRegistry = async () => {
    const { token } = getState();
    try {
      const registry = {
        accountId,
        inOut: inOut === 'true',
        value: valueMoney,
        dateTime: moment(dateTime).toDate(),
        cashFlowDescriptionId,
      };
      if (id) {
        await api.replace(token, id, registry);
      } else {
        await api.add(token, registry);
      }
      history.push('/cashFlows');
    } catch (error) {
      alert(getMessageFromError(error));
    }
  };
  return (
    <Paper className="cash-flow-form">
      <DateTimePicker
        name="dateTime"
        placeholder="Date Time"
        format="dd/MM/yyyy HH:mm"
        value={dateTime}
        onChange={setDateTime}
      />
      <br />
      <br />
      <select placeholder="Account" value={accountId} onChange={onChangeAccountId}>
        <option value="">-- Account --</option>
        {accountsList.map(account => (
          <option
            key={account.id}
            value={account.id}
          >
            {getAccountDescription(peopleList, account)}
          </option>
        ))}
      </select>
      <br />
      <br />
      <select placeholder="In / Out" value={inOut} onChange={onChangeInOut}>
        <option value="">-- In / Out --</option>
        {inOutList.map(inOutItem => (
          <option key={inOutItem.id} value={inOutItem.id}>{inOutItem.description}</option>
        ))}
      </select>
      <br />
      <br />
      <Autocomplete
        id="github-user-search"
        label="Cash Flow Description"
        placeholder="Chocolate, ..."
        dataLabel="name"
        dataValue="id"
        value={descriptionSearch}
        data={cashFlowDescriptionsList
          .filter(c => c.name.toLowerCase().includes(descriptionSearch.toLowerCase()))}
        filter={null}
        onChange={onChangeDescriptionSearch}
        onAutocomplete={(value, index, matches) => {
          const cashFlowDescription = matches[index];
          setCashFlowDescriptionId(cashFlowDescription.id);
          setDescriptionSearch(cashFlowDescription.name);
        }}
        clearOnAutocomplete
      />
      <br />
      <br />
      <input placeholder="Value" name="value" type="number" label="Value" value={valueMoney} onChange={onChangeValueMoney} />
      <br />
      <br />
      <Button raised onClick={saveRegistry}>Save</Button>
    </Paper>
  );
};
CashFlowForm.propTypes = {
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


export default CashFlowForm;
