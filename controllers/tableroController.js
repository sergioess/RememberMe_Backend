const pool = require('../database/conn');
// read -> GET
exports.readAllTablero = async function (req, res) {


    const id = parseInt(req.params.id)
    try {
        const respuesta = await pool.query('SELECT * from tablero where id = $1', [id]);
        console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }
};



// read All tableros Usuario-> GET
exports.readAllTableroUsr = async function (req, res) {
    const id = parseInt(req.params.id_usuario)
    try {
        const respuesta = await pool.query('select t.*, u.username from tablero t left join usuarios u on (t.id_usuario = u.id) where t.id_usuario = = $1 order by created_at', [id]);
        // console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }
};

// create one-> POST
exports.create = async function (req, res) {

    const { id_usuario, titulo, descripcion } = req.body;

    console.log('POST');
    console.log(req.body.titulo);


    const response = await pool.query('INSERT INTO tablero (id_usuario, titulo, descripcion)  VALUES ($1, $2, $3 ) RETURNING *  ', [id_usuario, titulo, descripcion]);
    // console.log(response);
    res.json({
        message: 'Tablero Agregado',
        body: {
            tablero: response.rows[0]
        }
    })


};
// delete one-> DELETE
exports.deleteTablero = async function (req, res) {
    console.log('DELETE');
    const id = parseInt(req.params.id)
    try {
        const respuesta = await pool.query('DELETE from tablero WHERE id = $1', [id]);
        console.log(respuesta.rows);
        res.json({
            message: 'tablero Eliminado',
            body: {
                tablero: { id }
            }
        })
    }
    catch (err) {
        console.log(err);
    }

}




// read All Colaboradores del Tablero -> GET
exports.tableroColaboradores = async function (req, res) {
    const id = parseInt(req.params.id)
    try {
        const respuesta = await pool.query('SELECT tb.id as id, tb.id_tablero as tid,tb.id_colaborador as cid, tb.rol as crol, tb.acepto , us.username from tablero_colaboradores as tb left join usuarios as us on (tb.id_colaborador = us.id) where tb.id_tablero = $1 order by tb.id', [id]);
        // console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }
};



// remove one colaborador de un tablero-> DELETE
exports.removeColaborador = async function (req, res) {
    console.log('DELETE');
    const id = parseInt(req.params.id);
    try {
        const respuesta = await pool.query('DELETE from tablero_colaboradores WHERE id = $1', [id]);
        console.log(respuesta.rows);
        res.json({
            message: 'Colaborador Eliminado',
            body: {
                tablero: { id }
            }
        })
    }
    catch (err) {
        console.log(err);
    }

}



// update rol del colaborador-> PUT
exports.udpdaterolcol = async function (req, res) {
    const id = parseInt(req.params.id)
    const { rol } = req.body;

    const response = await pool.query('UPDATE tablero_colaboradores set rol = $1 WHERE id = $2  RETURNING * ', [rol, id]);
    console.log(response);

    res.json({
        message: 'Colaborador Modificado',
        body: {
            tarea: response.rows[0]
        }
    })


};