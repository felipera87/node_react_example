import server from './app';

const port = 4000;
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running on port ${port}`);
});
