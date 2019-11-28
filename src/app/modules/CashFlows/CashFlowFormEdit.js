/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CashFlowForm.scss';
import CashFlowExpenseForm from './CashFlowExpenseForm';
import CashFlowIncomeForm from './CashFlowIncomeForm';
import useCashFlowsList from '../../hooks/useCashFlowsList';


const CashFlowForm = ({ match: { params: { id } }, history }) => {
  const [registry, setRegistry] = useState(null);
  const [list] = useCashFlowsList();
  useEffect(() => {
    const registryFound = list.find(p => p.id === id);
    if (registryFound) {
      setRegistry(registryFound);
    }
  }, [id, list, setRegistry]);
  if (!registry) {
    return (<span>Not Found</span>);
  }
  if (registry.inOut) {
    return (
      <CashFlowExpenseForm
        cashFlow={registry}
        history={history}
      />
    );
  }
  return (
    <CashFlowIncomeForm
      cashFlow={registry}
      history={history}
    />
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
