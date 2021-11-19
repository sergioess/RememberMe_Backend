const pool = require('../database/conn');


// read All-> GET
exports.readAll = async function (req, res) {

    try {
        const respuesta = await pool.query('SELECT * from clasificacion');
        // console.log(respuesta);
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
        const respuesta = await pool.query('SELECT * from clasificacion WHERE id = $1', [id]);
        console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }

}


// create one-> POST
exports.create = async function (req, res) {

    const { descripcion, color, id_usuario } = req.body;

    console.log('POST');
    console.log(req.body.titulo);

    try {
        const response = await pool.query('INSERT INTO clasificacion (id_usuario, color, descripcion)  VALUES ($1, $2, $3 ) ', [id_usuario, color, descripcion]);
        // console.log(response);
        res.json({
            message: 'Categoria Agregada',
            body: {
                tarea: { id_usuario, color, descripcion }
            }
        })
    } catch (error) {
        console.log(error.detail);
    }



};



// delete one-> DELETE
exports.deleteCategoria = async function (req, res) {
    console.log('DELETE');
    const id = parseInt(req.params.id)
    try {
        const respuesta = await pool.query('DELETE from clasificacion WHERE id = $1', [id]);
        console.log(respuesta);
        res.json({
            message: 'Clasificación Eliminado',
            body: {
                tablero: { id }
            }
        })
    }
    catch (err) {
        console.log(err);
    }

}




// update one-> PUT
exports.updateCategoria = async function (req, res) {
    const id = parseInt(req.params.id)
    const { titulo, descripcion, color } = req.body;

    console.log('PUT');
    console.log(req.body.titulo);

    const response = await pool.query('UPDATE clasificacion SET titulo = $1, descripcion = $2, color = $3 WHERE id = $4 ', [titulo, descripcion, color, id]);
    console.log(response);
    res.json({
        message: 'Tarea Modificada',
        body: {
            tarea: { id, titulo, descripcion, color }
        }
    })


};