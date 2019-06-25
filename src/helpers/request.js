const request = (url, method = 'GET', message, param) => new Promise((resolve) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);

  xhr.setRequestHeader(
    'Content-Type',
    'application/json;charset=UTF-8',
  );

  xhr.setRequestHeader('Accept', 'application/json');


  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 400) {
      if (xhr.response) {
        resolve(JSON.parse(xhr.response));
      } else {
        resolve(xhr.response);
      }
    } else {
      resolve({ message });
    }
  };

  xhr.onerror = () => {
    console.log('An error occurred during the transaction');
    resolve({ message });
  };

  xhr.send(JSON.stringify(param));
});

export default request;
