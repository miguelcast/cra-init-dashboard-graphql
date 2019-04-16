const { SchemaDirectiveVisitor } = require('graphql-tools');
const {
  defaultFieldResolver,
  GraphQLDirective,
  DirectiveLocation,
} = require('graphql');
const { validateIsAuthWithError } = require('../../utils/auth');

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: 'isAuthenticated',
      locations: [DirectiveLocation.FIELD_DEFINITION],
    });
  }

  visitObject(obj) {
    const fields = obj.getFields();
    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      const _this = this;
      field.resolve = function(result, args, ctx, info) {
        validateIsAuthWithError(ctx);
        return resolve.call(_this, result, args, ctx, info);
      };
    });
  }

  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const _this = this;
    field.resolve = async function(result, args, ctx, info) {
      validateIsAuthWithError(ctx);
      return resolve.call(_this, result, args, ctx, info);
    };
  }
}

module.exports = IsAuthenticatedDirective;
