const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

const fs = require('fs');
const path = require('path');

// default options
app.use(fileUpload({ useTempFiles: true }));

app.put('/upload/:tipo/:id', function(req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningun archivo'
            }
        });
    }

    // Validar tipo

    let tipoValidos = ['productos', 'usuarios']

    if (tipoValidos.indexOf(tipo) < 0) {
        return res.status(500).json({
            ok: false,
            err: {
                message: 'los tipos permitidos son: ' + tipoValidos.join(' ,')
            }
        });
    }

    let archivo = req.files.archivo;
    let nombreArchivo = archivo.name.split('.')
    let extension = nombreArchivo[nombreArchivo.length - 1];
    //Validar extenciones

    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(500).json({
            ok: false,
            err: {
                extension,
                message: 'las extenciones permitidas son: ' + extensionesValidas.join(' ,')
            }
        });
    }

    //Cambiar nombre al archivo

    let nombreNuevo = `${id}-${(new Date().getMilliseconds())}.${extension}`;
    archivo.mv(`uploads/${tipo}/${nombreNuevo}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        console.log(tipo);

        if (tipo === 'usuarios') {
            imagenUsuario(id, res, nombreNuevo, tipo)
        } else if (tipo === 'productos') {
            imagenProducto(id, res, nombreNuevo, tipo)
        }

    });
});

function imagenUsuario(id, res, nombreArchivo, tipo) {

    Usuario.findById(id, (err, usuarioDB) => {

        if (err) {
            borraArchivo(nombreArchivo, tipo)
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            borraArchivo(nombreArchivo, tipo)
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            });
        }

        borraArchivo(usuarioDB.img, tipo)


        usuarioDB.img = nombreArchivo;

        usuarioDB.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                img: nombreArchivo,
                usuario: usuarioGuardado
            })
        })

    })
}

function imagenProducto(id, res, nombreArchivo, tipo) {
    console.log(id, res, tipo, nombreArchivo);
    Producto.findById(id, (err, productoDB) => {

        if (err) {
            borraArchivo(nombreArchivo, tipo)
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            borraArchivo(nombreArchivo, tipo)
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        }

        borraArchivo(productoDB.img, tipo)


        productoDB.img = nombreArchivo;

        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                img: nombreArchivo,
                usuario: productoGuardado
            })
        })

    })
}

function borraArchivo(nombreimg, tipo) {
    let pathImg = path.resolve(__dirname, `../../uploads/${tipo}/${nombreimg}`);

    if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
    }
}

module.exports = app;