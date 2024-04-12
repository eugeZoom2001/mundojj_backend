const { createCustomResponse } = require('../controllers/responseObject');

const reqGetCheker = (req,res,next) => {
    const idBusc=req.params.id
    if (!(Number.isInteger(Number(idBusc)))){
        return res.status(404).json(createCustomResponse(false,
            "reqGetCheker : Verifique Parametros!!"));
    }
    next()
}


const reqPostCheker = (req, res, next) => {
    if (!((req.body.id) && (req.body.name))) {
        return res.status(403).json(createCustomResponse(false,
            "reqPostCheker : No hay datos!!"));
    }
    next()
}


const reqPatchCheker = (req, res, next) => {
    let ok = true
    const data = { ...req.body, ...req.params }

    if (!((data.id) && (data.name))) {
        ok = false
    } else if (!(Number.isInteger(Number(data.id))))
        ok = false
    if (!ok) {
        return res.status(403).json(createCustomResponse(false,
            " patchCheker : No hay datos o son incorrectos!!"));
    } else {
        next()
    }
}



module.exports = {
    getCheker:reqGetCheker,
    postCheker: reqPostCheker,
    patchCheker: reqPatchCheker
}