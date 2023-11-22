import { GraphQLScalarType, Kind } from 'graphql';

const regex = /^[\w\s-_]+$/;

function validate(string: unknown): string | never {
  if (typeof string !== 'string') {
    throw new Error(`Expected a string, but received: ${typeof string}`);
  }

  if (!regex.test(string)) {
    throw new Error('Invalid value');
  }

  return string;
}

export const SafeSearch = new GraphQLScalarType({
  name: 'SafeSearch',
  description:
    'A scalar allows to use only non-special characters (prevents SQL/noSQL injection) .',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new Error(`Can only parse strings but got a: ${ast.kind}`);
    }

    return validate(ast.value);
  },
});
