export const nextNumber = (next = 1) => {
  let n = next;
  return () => {
    n += 1;
    return n;
  };
};

const nextRouteIndex = nextNumber();
export const createRoute = (url, component, when = null, exact = false) => ({
  index: nextRouteIndex(),
  path: url,
  component,
  when,
  exact,
});

const nextMenuIndex = nextNumber();
export const createMenu = (url, title, icon, when) => ({
  index: nextMenuIndex(),
  title,
  path: url,
  icon,
  when,
});

export const createComponent = (component, when) => ({
  index: nextMenuIndex(),
  component,
  when,
});

export const sortString = (key, keyObject = 'name') => (a, b) => {
  if (
    (a[key] && typeof a[key] === 'object') ||
    (b[key] && typeof b[key] === 'object')
  ) {
    const valueA = a[key] && a[key][keyObject];
    const valueB = b[key] && b[key][keyObject];
    return (valueA || '').localeCompare(valueB || '');
  }
  return (a[key] || '').localeCompare(b[key] || '');
};
export const sortNumber = key => (a, b) => a[key] - b[key];
export const sortBool = key => (a, b) => b[key] - a[key];
