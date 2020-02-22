/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import AutoCompleteField from '../../../../utils/components/AutoCompleteField';
import DateTimePicker from '../../../../utils/components/DateTimePicker';
import './CashFlowIncomeFormView.scss';

const inOut = false; // Input/Income
const CashFlowIncomeFormView = ({
  edit,
  dateTime, setDateTime,
  accountId, setAccountId, accountsFullList,
  cashFlowDescriptionId, setCashFlowDescriptionId, cashFlowDescriptionsList,
  value, onChangeValue,
  save,
}) => (
  <div className="cf-paper cash-flow-form">
    <h2>
      {edit ? 'Edit' : 'New'}
      {' '}
        Income
    </h2>
    <DateTimePicker
      name="dateTime"
      placeholder="Date Time"
      selected={dateTime}
      onChange={setDateTime}
    />
    <AutoCompleteField
      id="accountId"
      data={accountsFullList}
      value={accountId}
      setValue={setAccountId}
      dataLabel="label"
      dataValue="value"
      label="Account"
      placeholder="Banespa, ..."
    />
    <AutoCompleteField
      id="cashFlowDescriptionId"
      data={cashFlowDescriptionsList}
      value={cashFlowDescriptionId}
      setValue={setCashFlowDescriptionId}
      dataLabel="name"
      dataValue="id"
      label="Cash Flow Description"
      placeholder="Chocolate, ..."
    />
    <br />
    <br />
    <input placeholder="Value" name="value" type="number" label="Value" value={value} onChange={onChangeValue} />
    <br />
    <br />
    <button
      type="button"
      className="cf-btn cf-btn--block cf-btn--text cf-btn--raised"
      onClick={save({
        accountId,
        inOut,
        value,
        dateTime,
        cashFlowDescriptionId,
      })}
    >
      {edit ? 'Update' : 'Create'}
    </button>
  </div>
);
CashFlowIncomeFormView.propTypes = {
  edit: PropTypes.bool.isRequired,
  dateTime: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  setDateTime: PropTypes.func.isRequired,
  accountId: PropTypes.string.isRequired,
  setAccountId: PropTypes.func.isRequired,
  accountsFullList: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  cashFlowDescriptionId: PropTypes.string.isRequired,
  setCashFlowDescriptionId: PropTypes.func.isRequired,
  cashFlowDescriptionsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};

export default CashFlowIncomeFormView;
