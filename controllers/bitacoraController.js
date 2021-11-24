
const pool = require('../database/conn');
// read -> GET
exports.readAll = async function (req, res) {
    const id = parseInt(req.params.id)
    try {
        const respuesta = await pool.query('SELECT b.id as bid, b.descripcion as bdes, b.create_at as bcrea, t.titulo, t.estado, t.id as tid from bitacora as b LEFT JOIN tareas as t on (b.id_tareas = t.id) WHERE b.id_usuario = $1 order by b.create_at desc', [id]);
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

    const response = await pool.query('INSERT INTO bitacora (descripcion, id_tareas, id_usuario ) VALUES ($1, $2, $3) RETURNING * ', [descripcion, id_tareas, id_usuario]);
    // console.log(response);
    res.json({
        message: 'Registro bitácora agregado',
        body: {
            bicacora: response.rows[0]
        }
    })


};

