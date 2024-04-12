const router = require('express').Router()
 const logger = require('../middleware/logger')
 //const mdwPeople = require('..//middleware/mw.person')
 
 const {
  getProveedores,
  getProveedorById,
  createProveedor,
  updateProveedor,
  deleteProveedor,
  ctaCrearItem,
  ctaBorrarProveedor,
  ctaGetByProveedor
  
} = require('../controllers/proveedoresController')



 router.use('/',logger) // middleware de prueba  
 router.get('/', getProveedores)
 router.get('/:id',getProveedorById)
 router.post('/', createProveedor)
 router.patch('/:proveedor', updateProveedor)
 router.delete('/:proveedor', deleteProveedor)
 router.post('/cuentas', ctaCrearItem)
 router.get('/cuentas/:proveedor', ctaGetByProveedor)
 router.delete('/cuentas/:proveedor', ctaBorrarProveedor)

 
 module.exports = router