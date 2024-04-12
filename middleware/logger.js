const logger = (req, res, next) => {
    const method = req.method
  
    const time = new Date().getFullYear()
    //console.log("Logger : middleware de prueba",method, time)
    next()
  }

module.exports = logger  