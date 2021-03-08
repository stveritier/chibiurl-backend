import bcrypt from 'bcrypt';

export const comparePassword = async (
  receivedPassword: string,
  storedPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(receivedPassword, storedPassword);

  return isMatch;
};
