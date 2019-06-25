export const formatDate = (date) => {
  const datef = new Date(date);
  let day = datef.getDay();
  day = day <= 9 ? `0${day}` : day;
  let month = datef.getMonth() + 1;
  month = month <= 9 ? `0${month}` : month;
  return `${day}/${month}/${datef.getFullYear()}`;
};
