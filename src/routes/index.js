const express=require('express')
const router=express.Router();
//UTILIZAR EL ARCHIVO tasks.s (esquema) que se encuentra en src/models/tasks.js
const Task = require('../models/tasks');

//Rutas o EndPoints

//Inicio
router.get('/', async (req, res) => {
    //Generar un arreglo de registros con todos los documentos de la coleccion task
    const tasks = await Task.find();
    res.render('index', {
      tasks
    });
  });

  //agregar tarea
  router.post('/add', async (req, res, next) => {
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');
  });

  //busca por id de la tarea y cambia el estado (true o false)
  router.get('/turn/:id', async (req, res, next) => {
    let { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
  });
  
  //Busca una tarea por id en invoca la vista para cambiar la info de esta
  router.get('/edit/:id', async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    console.log(task)
    res.render('edit', { task });
  });
  
  //Editar la info de la tarea
  router.post('/edit/:id', async (req, res, next) => {
    const { id } = req.params;
    await Task.updateOne({_id: id}, req.body);
    res.redirect('/');
  });
  
  //eliminar una tarea por id
  router.get('/delete/:id', async (req, res, next) => {
    let { id } = req.params;
    await Task.deleteOne({_id: id});
    res.redirect('/');
  });

  //exportar router y poder utilizarlo en el archivo principal
  module.exports = router;