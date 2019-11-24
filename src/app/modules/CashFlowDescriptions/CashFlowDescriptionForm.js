/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button
} from 'grommet';
import cashFlowDescriptionsApi from '../../../api/cashFlowDescriptions';
import { getState } from '../../hooks/useAuthState';
import { useRegistry } from './hooks';
import './CashFlowDescriptionForm.scss';

const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = event => {
    setValue(event.target.value);
  };
  return [value, handleChange, setValue];
};


const CashFlowDescriptionForm = ({ match: { params: { id } }, history }) => {
  const [name, onChangeName, setName] = useInputValue('');
  useRegistry(id, setName);
  const saveRegistry = async () => {
    const { token } = getState();
    try {
      if (id) {
        await cashFlowDescriptionsApi.replace(token, id, { name });
      } else {
        await cashFlowDescriptionsApi.add(token, { name });
      }
      history.push('/cashFlowDescriptions');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Form className="cash-flow-description-form">
      <input autoFocus name="name" label="Name" value={name} onChange={onChangeName} />
      <Button type="submit" label="Save" onClick={saveRegistry} />
    </Form>
  );
};
CashFlowDescriptionForm.propTypes = {
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


export default CashFlowDescriptionForm;
