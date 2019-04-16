const bcrypt = require('bcryptjs');
const { getToken } = require('../../utils/auth');

// A map of functions which return data for the schema.
const auth = {
  Query: {
    currentUser: (root, args, { user, prisma }) => {
      if (!user) throw new Error('Error getting user ');
      return prisma.user({ id: user.id });
    },
  },
  Mutation: {
    signup: async (root, { name, email, password }, { prisma }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = prisma.createUser({
        name,
        email,
        password: hashedPassword,
      });

      const token = getToken(user);

      return {
        token,
        user,
      };
    },
    login: async (parent, { email, password }, { prisma }) => {
      const user = await prisma.user({ email });

      if (!user) {
        throw new Error('Invalid Login');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error('Invalid Login');
      }

      const token = getToken(user);

      return {
        token,
        user,
      };
    },
  },
};

module.exports = auth;
