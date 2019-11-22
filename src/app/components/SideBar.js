import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, Collapsible,
  Layer, ResponsiveContext
} from 'grommet';
import { FormClose } from 'grommet-icons';
import SideBarContent from './SideBarContent';
import withAppStateActions from '../hoc/withAppStateActions';

const SideBar = ({ showSidebar, hideSideBar }) => (
  <ResponsiveContext.Consumer>
    {size => ((!showSidebar || size !== 'small') ? (
      <Collapsible direction="horizontal" open={showSidebar}>
        <Box
          flex
          width="medium"
          elevation="small"
          background="light-2"
          align="center"
          justify="center"
        >
          <SideBarContent />
        </Box>
      </Collapsible>
    )
      : (
        <Layer>
          <Box
            background="light-2"
            tag="header"
            justify="end"
            align="center"
            direction="row"
          >
            <Button
              icon={<FormClose />}
              onClick={hideSideBar}
            />
          </Box>
          <Box
            fill
            background="light-2"
            align="center"
            justify="center"
          >
            <SideBarContent />
          </Box>
        </Layer>
      ))}
  </ResponsiveContext.Consumer>
);

SideBar.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  hideSideBar: PropTypes.func.isRequired,
};

export default withAppStateActions(SideBar);