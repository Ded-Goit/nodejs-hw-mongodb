export const getEnvVar = (key, defaultValue = undefined) => {
  const value = process.env[key];

  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is not defined.`);
  }

  return value || defaultValue;
};
