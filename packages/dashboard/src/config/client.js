import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { IS_LOGGED_IN } from '../graphql';

const store = new InMemoryCache();

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API || 'http://localhost:4000/',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ networkError = {} }) => {
  if (networkError.statusCode === 401) {
    console.log('Error 401');
  }
});

const setAuth = (auth, cache) => {
  const userString = JSON.stringify(auth.user);
  localStorage.setItem('token', auth.token);
  localStorage.setItem('currentUser', userString);
  cache.writeData({
    data: {
      userLogged: {
        isLoggedIn: !!auth.token,
        currentUser: userString,
        __typename: 'UserLogged',
      },
    },
  });
  return null;
};

const resolvers = {
  Query: {
    userLogged() {
      return {
        isLoggedIn: !!localStorage.getItem('token'),
        currentUser: JSON.parse(localStorage.getItem('currentUser')),
      };
    },
  },
  Mutation: {
    login({ login }, args, { cache }) {
      setAuth(login, cache);
    },
    signup({ signup }, args, { cache }) {
      setAuth(signup, cache);
    },
    logout(root, args, { cache }) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      cache.writeData({
        data: {
          userLogged: {
            isLoggedIn: false,
            currentUser: null,
            __typename: 'UserLogged',
          },
        },
      });
      return null;
    },
  },
};

const client = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
  cache: store,
  resolvers,
});

store.writeData({
  data: {
    userLogged: {
      isLoggedIn: !!localStorage.getItem('token'),
      currentUser: localStorage.getItem('currentUser'),
      __typename: 'UserLogged',
    },
  },
});

export const observableLoggedIn = client.watchQuery({ query: IS_LOGGED_IN });
export default client;
