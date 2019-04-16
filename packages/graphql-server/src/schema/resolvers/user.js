// A map of functions which return data for the schema.
const user = {
  Query: {
    user: (root, { userId }, { prisma }) => prisma.user({ id: userId }),
    users: (root, args, context) => context.prisma.users(),
  },
};

module.exports = user;
