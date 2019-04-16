import React from 'react';
import { Mutation } from 'react-apollo';
import { Login as LoginForm } from '../components/Auth';
import { LOGIN } from '../graphql';

const Login = () => (
  <Mutation mutation={LOGIN}>
    {authentication => {
      const submitLogin = (email, password) =>
        authentication({ variables: { email, password } });
      return <LoginForm loading={false} authentication={submitLogin} />;
    }}
  </Mutation>
);

export default Login;
