// async validation

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const validate = async (values, props) => {
  await sleep(2000);
  const errors = {};

  return errors;
};
