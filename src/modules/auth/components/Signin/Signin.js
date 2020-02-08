import React from 'react';
import { useDispatch } from 'react-redux';
import { Paper } from 'react-md';
import ButtonSigninWith from '../ButtonSigninWith';
import googleIcon from './googleIcon.png';
import './Signin.scss';
import Box from '../../../utils/components/Box';
import {
  signinGoogleWithRedirect
} from '../../../utils/api/auth';
import * as actions from '../../actions/actionsAuth';

const Signin = () => {
  const dispatch = useDispatch();
  return (
    <Box center fill>
      <Paper
        className="signin"
        zDepth={0}
        raiseOnHover
      >
        <h1>Cash Flow</h1>
        <ButtonSigninWith
          imageSrc={googleIcon}
          alt="Google"
          title="Sign in with Google"
          onClick={() => {
            dispatch(actions.startAuthLoading());
            signinGoogleWithRedirect();
          }}
        >
          Continue with Google
        </ButtonSigninWith>
      </Paper>
    </Box>
  );
};

export default Signin;
