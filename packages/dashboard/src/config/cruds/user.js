import gql from 'graphql-tag';

const fields = `
  id
  name
  email
  password
  age
  address
  color
  country {
    id
    name
  }
  gender
  birthday
  status
`;

const user = {
  keyName: 'id',
  getList: {
    accessData: 'users',
    query: gql`
      query Users {
        users {
          ${fields}
        }
      }
    `,
  },
  getByKey: {
    accessData: 'user',
    query: gql`
      query User($id: ID!) {
        user(id: $id) {
          ${fields}
        }
      }
    `,
  },
  post: {
    accessData: 'signup',
    query: gql`
      mutation Signup(
        $id: ID
        $name: String!
        $email: String!
        $password: String!
        $age: Int
        $color: String
        $birthday: String
        $gender: String
        $country: ID
        $status: Boolean
      ) {
        signup(
          id: $id
          name: $name
          email: $email
          password: $password
          age: $age
          color: $color
          birthday: $birthday
          gender: $gender
          country: $country
          status: $status
        ) {
          user {
            ${fields}
          }
        }
      }
    `,
  },
  delete: '/deleteUser.json',
  fields: [
    {
      title: 'Name',
      key: 'name',
      sorter: true,
      filter: true,
      type: 'string',
      initialValue: 'My Name',
      rules: [
        { required: true, message: 'Is required!' },
        { type: 'string', message: 'Should be string!' },
        { max: 50, message: 'Max 50 characters!' },
      ],
    },
    {
      title: 'Email',
      key: 'email',
      sorter: true,
      filter: true,
      type: 'string',
      rules: [
        { required: true, message: 'Is required!' },
        { type: 'string', message: 'Should be string!' },
        { type: 'email', message: 'Should be email!' },
        { max: 150, message: 'Max 150 characters!' },
      ],
    },
    {
      title: 'Password',
      key: 'password',
      sorter: true,
      filter: true,
      type: 'password',
      rules: [
        { required: true, message: 'Is required!' },
        { type: 'string', message: 'Should be string!' },
        { min: 6, message: 'Min 6 characters!' },
      ],
    },
    {
      title: 'Age',
      key: 'age',
      sorter: true,
      filter: true,
      type: 'number',
      columnStyle: {
        align: 'right',
        width: 80,
      },
      rules: [{ type: 'integer', message: 'Should be integer!' }],
    },
    {
      title: 'Address',
      key: 'address',
      sorter: true,
      filter: true,
      hidden: ['column', 'form'],
      type: 'string',
      rules: [
        { required: true, message: 'Is required!' },
        { max: 150, message: 'Max 150 characters!' },
      ],
    },
    {
      title: 'Color',
      key: 'color',
      sorter: true,
      filter: true,
      type: 'select',
      options: {
        red: 'Red',
        green: 'Green',
        yellow: 'Yellow',
        black: 'Black',
      },
      rules: [{ required: true, message: 'Is required!' }],
    },
    {
      title: 'Country async load',
      key: 'country',
      columnKey: 'countryName',
      sorter: true,
      filter: true,
      type: 'select',
      options: {},
      configOptions: {
        accessData: 'countries',
        query: gql`
          query {
            countries {
              id
              name
            }
          }
        `,
        map: item => ({ [item.id]: item.name }),
      },
      dependencies: {
        fields: ['color'],
        onChange: () => ({
          disabled: false,
        }),
      },
      disabled: true,
      rules: [{ required: true, message: 'Is required!' }],
      render: (text, record) => (record.country && record.country.name) || '',
    },
    {
      title: 'Gender',
      key: 'gender',
      type: 'radio',
      sorter: true,
      filter: true,
      options: {
        male: 'Male',
        female: 'Female',
      },
      rules: [{ required: true, message: 'Is required!' }],
    },
    {
      title: 'Birthday',
      key: 'birthday',
      type: 'date',
      sorter: true,
      filter: true,
    },
    {
      title: 'Status',
      key: 'status',
      sorter: true,
      filter: true,
      type: 'bool',
      initialValue: true,
      options: {
        true: 'Active',
        false: 'Inactive',
      },
    },
  ],
};

export default user;
