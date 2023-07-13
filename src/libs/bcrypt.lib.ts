import bcrypt from "bcrypt";

// Berfungsi untuk handle encryption

export const hashPassword = async (password: string): Promise<string> => {
  const hash = bcrypt.hash(password, 10);
  return hash;
};

export const comparePassword = async (
  password: string,
  enteredPassword: string
): Promise<boolean> => {
  const compare = bcrypt.compare(enteredPassword, password).then((result) => {
    return result;
  });
  return compare;
};
