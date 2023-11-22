export function textSearchPattern(filter: string, value: string) {
  let pattern = value;

  if (filter === 'textStartWith') {
    pattern = `^${pattern}`;
  }

  return new RegExp(pattern, 'i');
}
