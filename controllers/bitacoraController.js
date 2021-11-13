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
    const id = parseInt(req.params.id)
    try {
        const respuesta = await pool.query('SELECT * from bitacora WHERE id_usuario = $1 order by create_at desc', [id]);
        console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }
};


// create one-> POST
exports.create = async function (req, res) {

    const { descripcion, id_tareas, id_usuario } = req.body;

    console.log('POST');
    console.log(req.body.descripcion);

    const response = await pool.query('INSERT INTO bitacora (descripcion, id_tareas, id_usuario ) VALUES ($1, $2, $3) ', [descripcion, id_tareas, id_usuario]);
    // console.log(response);
    res.json({
        message: 'Registro bitácora agregado',
        body: {
            tarea: { descripcion, id_tareas, id_usuario}
        }
    })


};
