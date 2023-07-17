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
    return { errors: resData.errors };
  }

  return resData;
};

export const logger = (label, item) => {
  console.log('=============================================');
  console.log(label.toUpperCase() + ' ->', item);
  console.log('=============================================');
};

export const normalizeData = data => {
  const normalized = {};

  for (const obj of data) {
    normalized[obj.id] = obj;
  }

  return normalized;
};

export const formatDate = (date, delimiter) => {
  const dateObj = new Date(date);
  const formattedDate = `${
    dateObj.getMonth() + 1
  }${delimiter}${dateObj.getDate()}${delimiter}${dateObj.getFullYear()}`;
  return formattedDate;
};

export const formatDuration = duration => {
  const minutes = duration % 60;

  let formattedDuration;

  if (duration === 60) {
    formattedDuration = '1 h';
  }

  if (minutes === 0) {
    formattedDuration = `${duration / 60} h`;
  }

  if (duration < 60) {
    formattedDuration = `${minutes} m`;
  }

  if (duration > 60 && minutes !== 0) {
    formattedDuration = `${Math.floor(duration / 60)} h ${minutes} m`;
  }

  return formattedDuration;
};
