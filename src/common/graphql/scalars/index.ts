import { GraphQLScalarType } from 'graphql';

const regex = /[0-9a-z\s_-]/gi;

function validate(string: unknown): string | never {
  if (typeof string !== 'string' || !regex.test(string)) {
    throw new Error('Invalid value.');
  }
  return string;
}

export const SafeSearch = new GraphQLScalarType({
  name: 'SafeSearch',
  description:
    'A scalar allows to use only non-special characters (prevents SQL/noSQL injection) .',
  parseValue: (value) => validate(value),
});
