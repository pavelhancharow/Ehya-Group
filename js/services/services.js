const postData = (object) => {
  return fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  });
};

const getResours = async (url) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};

export { postData };
export { getResours };