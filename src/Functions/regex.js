export const regexTitle = (x) => {
  let pattern = /^[a-zA-Z,\u0621-\u064A\u0660-\u0669 ]+$/;
  return pattern.test(x);
};

export const regexEmail = (x) => {
  let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return pattern.test(x);
};

export const regexPhone = (x) => {
  let pattern = /^01[0-2,5]{1}[0-9]{8}$/;
  return pattern.test(x);
};

export const regexNumber = (x) => {
  let pattern = /^[0-9]+$/;
  return pattern.test(x);
};

export const regexIBAN = (x) => {
  let pattern = /^[a-zA-Z,0-9]+$/;
  return pattern.test(x);
};
