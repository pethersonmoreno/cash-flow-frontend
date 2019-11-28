import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Button, DataTable, TableHeader, TableRow, TableColumn, TableBody
} from 'react-md';
import { getState } from '../../hooks/useAuthState';
import api from '../../../api/cashFlowDescriptions';
import getMessageFromError from '../../../helpers/getMessageFromError';
import useCashFlowDescriptionsList from '../../hooks/useCashFlowDescriptionsList';

const CashFlowDescriptionList = ({ match, history }) => {
  const [list] = useCashFlowDescriptionsList();
  const goAdd = () => { history.push(`${match.path}/new`); };
  const goEdit = registry => () => { history.push(`${match.path}/edit/${registry.id}`); };
  const deleteRegistry = registry => async () => {
    const { token } = getState();
    try {
      await api.delete(token, registry.id);
    } catch (error) {
      alert(getMessageFromError(error));
    }
  };
  return (
    <Paper>
      <Button icon onClick={goAdd}>add_circle</Button>
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Action</TableColumn>
            <TableColumn>Name</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map(cashFlowDescription => (
            <TableRow key={cashFlowDescription.id}>
              <TableColumn>
                <Button
                  icon
                  onClick={goEdit(cashFlowDescription)}
                >
                  edit
                </Button>
                <Button
                  icon
                  onClick={deleteRegistry(cashFlowDescription)}
                >
                  restore_from_trash
                </Button>
              </TableColumn>
              <TableColumn>{cashFlowDescription.name}</TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    </Paper>
  );
};

CashFlowDescriptionList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default CashFlowDescriptionList;
