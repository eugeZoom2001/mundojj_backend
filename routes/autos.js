const router = require('express').Router()
 const logger = require('../middleware/logger')
 //const mdwPeople = require('..//middleware/mw.person')
 

 const {
  getAutos,
  createAuto,
  updateAuto,
  deleteAuto,
  getAuto,
  getTareasMovil
} = require('../controllers/autoController')



 router.use('/',logger) // middleware de prueba  
 router.get('/', getAutos)
 router.post('/', createAuto)
 router.get('/:patente',getAuto) 
 router.patch('/:patente', updateAuto)
 router.delete('/:patente', deleteAuto)
 router.get('/tareas/:patente',getTareasMovil)
 

 
 module.exports = router
