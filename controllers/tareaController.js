const { Pool } = require('pg');

const config = {

    connectionString: 'postgres://vqnvqguagfltlb:d74da2172d428aed94bc216428afa6bcdee350caf969722a60931c60172b3504@ec2-18-210-95-55.compute-1.amazonaws.com:5432/d2hsqe7t53rfjh',
    ssl: {
        rejectUnauthorized: false
    }
};
const pool = new Pool(config);
// read -> GET
exports.readAll = async function (req, res) {

    try {
        const respuesta = await pool.query('SELECT * from tareas as t left join usuarios as u on (t.id_usuario = u.id)');
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
        const respuesta = await pool.query('SELECT * from tareas WHERE id = $1', [id]);
        console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }

}
// create one-> POST
exports.create = async function (req, res) {

    const { titulo, descripcion, id_usuario } = req.body;

    console.log('POST');
    console.log(req.body.titulo);

    const date = new Date();
    console.log(date);

    const response = await pool.query('INSERT INTO tareas (titulo, descripcion, id_usuario, fechacreacion) VALUES ($1, $2, $3, $4) ', [titulo, descripcion, id_usuario, date]);
    // console.log(response);
    res.json({
        message: 'Tarea Agregada',
        body: {
            tarea: { titulo, descripcion, id_usuario, date }
        }
    })


};
// delete one-> DELETE
exports.deleteTarea = async function (req, res) {
    console.log('DELETE');
    const id = parseInt(req.params.id)
    try {
        const respuesta = await pool.query('DELETE from tareas WHERE id = $1', [id]);
        console.log(respuesta.rows);
        res.json({
            message: 'Tarea Eliminada',
            body: {
                tarea: { id }
            }
        })
    }
    catch (err) {
        console.log(err);
    }

}
// create one-> POST
exports.updateTarea = async function (req, res) {
    const id = parseInt(req.params.id)
    const { titulo, descripcion } = req.body;

    console.log('PUT');
    console.log(req.body.titulo);



    const response = await pool.query('UPDATE  tareas SET titulo = $1, descripcion = $2 WHERE id = $3 ', [titulo, descripcion, id]);
    console.log(response);
    res.json({
        message: 'Tarea Modificada',
        body: {
            tarea: { id, titulo, descripcion }
        }
    })


};
