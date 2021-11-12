const pool = require('../database/conn');

const bcryptjs = require('bcryptjs');


// read -> GET
exports.readAll = async function (req, res) {

    try {
        const respuesta = await pool.query('SELECT * from usuarios');
        console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }
};


// read one-> GET
exports.readById = async function (req, res) {
    const id = parseInt(req.params.id)
    try {
        const respuesta = await pool.query('SELECT * from usuarios WHERE id = $1', [id]);
        console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }

}
// create one-> POST
exports.create = async function (req, res) {

    const { username, password, nombre_completo, correo } = req.body;

    let passwordHash = await bcryptjs.hash(password, 10);
    console.log(passwordHash);

    const response = await pool.query('INSERT INTO usuarios (username, password, nombre_completo, correo) VALUES ($1, $2, $3, $4) ', [username, passwordHash, nombre_completo, correo]);

    res.json({
        message: 'Usuario agregado',
        body: {
            usuario: { username, passwordHash, nombre_completo, correo }
        }
    })


};
// delete one-> DELETE
exports.deleteUsuario = async function (req, res) {
    console.log('DELETE');
    const id = parseInt(req.params.id)
    try {
        const respuesta = await pool.query('DELETE from usuarios WHERE id = $1', [id]);
        console.log(respuesta.rows);
        res.json({
            message: 'Usuario Eliminado',
            body: {
                usuario: { id }
            }
        })
    }
    catch (err) {
        console.log(err);
    }

}
// create one-> POST
exports.updateUsuario = async function (req, res) {
    const id = parseInt(req.params.id)
    const { username, password, nombre_completo, correo } = req.body;

    let passwordHash = await bcryptjs.hash(password, 10);
    console.log(passwordHash);

    const response = await pool.query('UPDATE usuarios SET username = $1, password = $2, nombre_completo = $3, correo = $4 WHERE id = $5 ', [username, passwordHash, nombre_completo, correo, id]);
    console.log(response);
    res.json({
        message: 'Usuario Modificado',
        body: {
            usuario: { id, username, passwordHash, nombre_completo, correo }
        }
    })


};
