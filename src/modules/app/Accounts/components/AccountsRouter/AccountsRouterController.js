import React from 'react';
import PropTypes from 'prop-types';
import SwitchRouterRoutes from '../../../../utils/components/SwitchRouterRoutes';
import NotFound from '../../../../utils/components/NotFound';
import AccountsList from '../AccountsList';
import AccountForm from '../AccountForm';
import useSetPageTitle from '../../../../appCover/hooks/useSetPageTitle';
import useSubscribePeopleFirestore from '../../../../utils/hooks/useSubscribePeopleFirestore';
import useSubscribeAccountsFirestore from '../../hooks/useSubscribeAccountsFirestore';

const AccountsRouterController = ({ match }) => {
  useSetPageTitle('Accounts');
  useSubscribePeopleFirestore();
  useSubscribeAccountsFirestore();
  const routes = [
    { path: match.path, exact: true, component: AccountsList },
    { path: `${match.path}/edit/:id`, exact: true, component: AccountForm },
    { path: `${match.path}/new`, exact: true, component: AccountForm },
    { component: NotFound }
  ];
  return (
    <SwitchRouterRoutes routes={routes} />
  );
};

AccountsRouterController.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
};

export default AccountsRouterController;