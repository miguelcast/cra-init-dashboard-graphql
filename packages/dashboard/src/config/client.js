import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { IS_LOGGED_IN } from '../graphql';

const store = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/',
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

const errorLink = onError(({ networkError = {}, graphQLErrors }) => {
  if (networkError.statusCode === 401) {
    console.log('Error 401');
  }
});

const resolvers = {
  Query: {
    isLoggedIn() {
      const token = localStorage.getItem('token');
      return !!token;
    },
  },
  Mutation: {
    login({ login }, args, { cache }) {
      localStorage.setItem('token', login.token);
      localStorage.setItem('currentUser', login.user);
      cache.writeData({
        data: { isLoggedIn: !!login.token, currentUser: login.user },
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
    isLoggedIn: !!localStorage.getItem('token'),
    currentUser: localStorage.getItem('currentUser'),
  },
});

export const observableLoggedIn = client.watchQuery({ query: IS_LOGGED_IN });
export default client;
