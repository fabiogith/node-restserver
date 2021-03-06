//Verificar token

var jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {
    let token = req.get('Authorization');


    jwt.verify(token, process.env.SEED_TOKEN, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }

        req.usuario = decode.usuario;

        next();
    });
};

let verificarAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'el usuario no es administrador'
            }
        })
    }

}

let verificarTokenImg = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SEED_TOKEN, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }

        req.usuario = decode.usuario;

        next();
    });

}

module.exports = {
    verificaToken,
    verificarAdmin_Role,
    verificarTokenImg
}