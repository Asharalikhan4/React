self.onmessage = (e) => {
  const data = e.data;
  const result = data * 2;
  self.postMessage(result);
};