// A map of functions which return data for the schema.
const country = {
  Query: {
    countries: (root, args, { prisma }) => prisma.countries(),
  },
  Mutation: {
    createCountry: (root, { name }, { prisma }) =>
      prisma.createCountry({ name }),
  },
  Country: {
    users(parent, args, { prisma }) {
      return prisma.country({ id: parent.id }).users();
    },
  },
};

module.exports = country;
