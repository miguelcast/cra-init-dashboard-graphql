import gql from 'graphql-tag';

export const SIGNUP = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
      signup @client
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
      login @client
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout @client
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    userLogged @client {
      isLoggedIn
      currentUser
    }
  }
`;
