import React from 'react';
import { Mutation } from 'react-apollo';
import { Register as RegisterForm } from '../components/Auth';
import { SIGNUP } from '../graphql';

const Register = () => (
  <Mutation mutation={SIGNUP}>
    {(signup, { loading }) => {
      const submitRegister = (name, email, password) =>
        signup({ variables: { name, email, password } });
      return <RegisterForm submit={submitRegister} loading={loading} />;
    }}
  </Mutation>
);

export default Register;
