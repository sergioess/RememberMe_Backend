const pool = require('../database/conn');


// read -> GET
exports.readAll = async function (req, res) {

    try {
        const respuesta = await pool.query('SELECT * from tareas  order by fechalimite ASC');
        //console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }
};


// read one-> GET
exports.readById = async function (req, res) {
    const id = parseInt(req.params.id)
    //res.send(req.params.se)
    try {
        const respuesta = await pool.query('SELECT * from tareas WHERE id = $1 ', [id]);
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

    // console.log('POST');
    // console.log(req.body.titulo);

    const date = new Date();
    // console.log(date);

    const response = await pool.query('INSERT INTO tareas (titulo, descripcion, id_usuario, fechalimite) VALUES ($1, $2, $3, $4) RETURNING * ', [titulo, descripcion, id_usuario, date]);
    // console.log(response);

    res.json({
        message: 'Tarea Agregada',
        body: {
            tarea: response.rows[0]
        }
    })

    // console.log("ID ingresado" + res.rows[0].id);


};


// create one-> POST
exports.createtablero = async function (req, res) {

    const { titulo, descripcion, id_usuario, id_tablero } = req.body;

    // console.log('POST');
    // console.log(req.body.titulo);

    const date = new Date();
    // console.log(date);

    const response = await pool.query('INSERT INTO tareas (titulo, descripcion, id_usuario, fechalimite, id_tablero) VALUES ($1, $2, $3, $4, $5) RETURNING * ', [titulo, descripcion, id_usuario, date, id_tablero]);
    // console.log(response);

    res.json({
        message: 'Tarea Agregada',
        body: {
            tarea: response.rows[0]
        }
    })

    // console.log("ID ingresado" + res.rows[0].id);


};



// delete one-> DELETE
exports.deleteTarea = async function (req, res) {
    console.log('DELETE');
    const id = parseInt(req.params.id)
    try {
        const respuesta = await pool.query('DELETE from tareas WHERE id = $1', [id]);
        // console.log(respuesta.rows);
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
// update one-> PUT
exports.updateTarea = async function (req, res) {
    const id = parseInt(req.params.id)
    const { titulo, descripcion, fechalimite, estado, prioridad, id_clasificacion } = req.body;

    // console.log('PUT');
    // console.log(req.body.titulo);



    const response = await pool.query('UPDATE  tareas SET titulo = $1, descripcion = $2, fechalimite = $3, estado = $4, prioridad = $5, id_clasificacion = $6 WHERE id = $7  RETURNING * ', [titulo, descripcion, fechalimite, estado, prioridad, id_clasificacion, id]);
    console.log(response);

    res.json({
        message: 'Tarea Modificada',
        body: {
            tarea: response.rows[0]
        }
    })


};


// Raead Actual User Task -> GET
exports.tareasUsuario = async function (req, res) {
    const id = parseInt(req.params.id)
    try {
        //const respuesta = await pool.query('SELECT * from tareas as t left join usuarios as u on (t.id_usuario = u.id) WHERE id_usuario = $1 order by fechalimite', [id]);
        const respuesta = await pool.query('SELECT ta.*, t.titulo as tablero from tareas ta left join tablero t on (ta.id_tablero = t.id) WHERE ta.id_usuario = $1 and  ta.estado <> 3 order by ta.fechalimite ASC', [id]);
        // console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }

}

// Raead Task for One Clasification-> GET
exports.tareasClasificacion = async function (req, res) {
    const { id_usuario, id_clasificacion } = req.body;

    try {
        const respuesta = await pool.query('SELECT ta.*, t.titulo as tablero from tareas ta left join tablero t on (ta.id_tablero = t.id) WHERE ta.id_clasificacion = $1 and ta.id_usuario = $2 and ta.estado <> 3 order by ta.fechalimite ASC', [id_clasificacion, id_usuario]);
        // console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }

}


// Raead Task for One Tablero-> GET
exports.TareasTablero = async function (req, res) {
    const id = parseInt(req.params.id_tablero)

    try {
        const respuesta = await pool.query('SELECT * from tareas WHERE id_tablero = $1 and estado <> 3 order by fechalimite ASC', [id]);
        // console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }

}

// Raead All Task order by  Clasification one User-> GET
exports.TareasUsuarioClasificacion = async function (req, res) {
    const id = parseInt(req.params.id)
    try {
        const respuesta = await pool.query('SELECT * from tareas WHERE id_usuario = $1 order by id_clasificacion, fechalimite ASC ', [id]);
        // console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }
};