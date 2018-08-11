const exemplo = () => {
  return new Promise((resolve, reject) => {
    let tempo = 10000;
    setTimeout(() => {
      resolve(`Olá depois de ${tempo}`);
    }, tempo);
  });
};

const routes = (server) => {
  server.get('/', (req, res, next) => {
    res.send('Hello world');
    next();
  });

  server.get('/categoria/:id?', async (req, res, next) => {
    if (req.params.id) {
      const { id } = req.params;// Request Params
      console.log(id);
    }
    const { name } = req.query;// Query Params
    let msg = await exemplo();
    res.send(msg + ' ' + name);
    await next();
  });
  server.post('/categoria', async (req, res, next) => {
    await next();
  });
  // server.put('/categoria', async (req, res, next) => {
  //   next();
  // });
  // server.delete('/categoria', async (req, res, next) => {
  //   next();
  // });
};

module.exports = routes;
