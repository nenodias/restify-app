const Aluno = require('../models/Aluno');

const routes = (server) => {
  server.get('/', (req, res, next) => {
    res.send('Hello world');
    return next();
  });

  server.get('/alunos/:id', async (req, res, next) => {
    let aluno = null;
    if (req.params.id) {
      aluno = await Aluno.findById(req.params.id);
      if(aluno){
        res.json(aluno);
      }
    }
    if(!aluno){
      res.status(404);
      res.json({message:'not found'});
    }
    return await next();
  });
  server.get('/alunos', async (req, res, next) => {
    try{
      let alunos = await Aluno.find();
      res.json(alunos);
    }catch({message}){
      console.error(message);
      res.json({message});
      res.status(500);
    }
    return await next();
  });

  server.post('/alunos', async (req, res, next) => {
    let aluno = new Aluno(req.body);
    try{
      aluno = await aluno.save();
      res.json(aluno);
    }catch({message}){
      console.error(message);
      res.json({message});
      res.status(500);
    }
    return await next();
  });

  server.put('/alunos/:id', async (req, res, next) => {
    let aluno = null;
    if (req.params.id) {
      const { id } = req.params;
      const { _id, createdAt, updatedAt, ...dados} = req.body;
      result = await Aluno.update({_id: id}, dados);
      if(result.ok){
        aluno = await Aluno.findById(id);
        if(aluno){
          res.json(aluno);
        }
      }
    }
    if(!aluno){
      res.status(404);
      res.json({message:'not found'});
    }
    return await next();
  });

  server.del('/alunos/:id', async (req, res, next) => {
    let okay = false;
    if (req.params.id) {
      const { id } = req.params;
      result = await Aluno.deleteOne({_id: id});
      if(result.ok){
        okay = true;
        res.json({message:'deleted'});
      }
    }
    if(!okay){
      res.status(404);
      res.json({message:'not found'});
    }
    return await next();
  });
};

module.exports = routes;
