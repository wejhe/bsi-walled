export const isValidEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};

export const isEmpty = (value) => {
  return value === "";
};

export const isValidPassword = (password) => {
  const pattern =
    /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  return pattern.test(password);
};

export const isValidPhone = (phone) => {
  const pattern = /^\d{10,14}$/;
  return pattern.test(phone);
};

export const isPinComplete = (pin) => {
  return pin.length == 6;
};

export const isPinNumberOnly = (pin) => {
  const pattern = /^\d{6}$/;
  return pattern.test(pin);
};
