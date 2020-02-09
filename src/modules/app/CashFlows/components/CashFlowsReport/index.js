import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import {
  DataTable, TableHeader, TableRow, TableColumn, TableBody
} from 'react-md';
import { useCashFlowListMonth, useCashFlowsCurrentMonth } from '../../selectors/selectorsCashFlows';
import useCashFlowDescriptionsList from '../../../../utils/hooks/useCashFlowDescriptionsList';
import formatMoneyValue from '../../../../utils/helpers/formatMoneyValue';
import * as actions from '../../actions/actionsCashFlows';
import './CashFlowsReport.scss';

const listIgnoreDescriptions = [
  '5WGg1E8ES5wG8qj7obDW', // Gastos Cartão de Crédito
  'c6Agf4mYQrbPFT2YLBeg', // Pagamento Fatura
  'Iv9iIfXebD6rdmTwtYv2', // Transferência
  'GIgJXgw2MS0044HgiFlr', // Saque
];

const getCashFlowDescription = (cashFlowDescriptionsList, cashFlowDescriptionId) => {
  const cashFlowDescription = cashFlowDescriptionsList.find(
    cfd => cfd.id === cashFlowDescriptionId
  );
  if (cashFlowDescription) {
    return cashFlowDescription.name;
  }
  return '(Not found)';
};

const orderListValue = (list, isDesc) =>
  list.sort((flowA, flowB) => (flowA.value - flowB.value) * (isDesc ? -1 : 1));

const groupByDescription = list => list
  .sort((flowA, flowB) => flowB.cashFlowDescriptionId - flowA.cashFlowDescriptionId)
  .reduce((newList, cashFlow) => {
    let group = newList.find(f => f.cashFlowDescriptionId === cashFlow.cashFlowDescriptionId);
    if (!group) {
      group = { cashFlowDescriptionId: cashFlow.cashFlowDescriptionId, value: 0, items: [] };
      newList.push(group);
    }
    group.items.push(cashFlow);
    group.value += cashFlow.value * (cashFlow.inOut ? -1 : 1);
    return newList;
  }, []);

const CashFlowsReport = () => {
  const dispatch = useDispatch();
  const [cashFlowDescriptionsList] = useCashFlowDescriptionsList();
  const monthDate = useCashFlowsCurrentMonth();
  const list = useCashFlowListMonth(monthDate);
  const listFiltered = list
    .filter(cashFlow => !listIgnoreDescriptions.find(id => cashFlow.cashFlowDescriptionId === id));
  const groupedList = groupByDescription(listFiltered);
  const negativeDescriptions = orderListValue(groupedList.filter(group => group.value < 0), false);
  const positiveDescriptions = orderListValue(groupedList.filter(group => group.value >= 0), true);
  return (
    <div className="cf-paper">
      <div>
        Month:
        {' '}
        <ReactDatePicker
          selected={new Date(`${monthDate}-02`)}
          onChange={month => dispatch(actions.setCashFlowsCurrentMonth(month))}
          dateFormat="yyyy-MM"
          showMonthYearPicker
        />
      </div>
      <h2>Negative Descriptions</h2>
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Description</TableColumn>
            <TableColumn>Value</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {negativeDescriptions.map(group => (
            <TableRow key={group.cashFlowDescriptionId}>
              <TableColumn>
                {getCashFlowDescription(cashFlowDescriptionsList, group.cashFlowDescriptionId)}
              </TableColumn>
              <TableColumn>{formatMoneyValue(group.value)}</TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
      <h2>Positive Descriptions</h2>
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Description</TableColumn>
            <TableColumn>Value</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positiveDescriptions.map(group => (
            <TableRow key={group.cashFlowDescriptionId}>
              <TableColumn>
                {getCashFlowDescription(cashFlowDescriptionsList, group.cashFlowDescriptionId)}
              </TableColumn>
              <TableColumn>{formatMoneyValue(group.value)}</TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
      <h2>Total</h2>
      <DataTable plain>
        <TableBody>
          <TableRow>
            <TableColumn>Negative</TableColumn>
            <TableColumn>
              {formatMoneyValue(negativeDescriptions.reduce((sum, group) => sum + group.value, 0))}
            </TableColumn>
          </TableRow>
          <TableRow>
            <TableColumn>Positive</TableColumn>
            <TableColumn>
              {formatMoneyValue(positiveDescriptions.reduce((sum, group) => sum + group.value, 0))}
            </TableColumn>
          </TableRow>
        </TableBody>
      </DataTable>
    </div>
  );
};

CashFlowsReport.propTypes = {

};

export default CashFlowsReport;
