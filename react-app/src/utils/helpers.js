export const customFetch = async (url, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(url, options);
  const resData = await res.json();

  if (!res.ok) {
    throw Error(resData.error || 'An error occurred');
  }

  return resData;
};

export const logger = (label, item) => {
  console.log('==============');
  console.log(label.toUpperCase(), item);
  console.log('==============');
};
