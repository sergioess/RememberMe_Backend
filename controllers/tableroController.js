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

// create one-> POST
exports.create = async function (req, res) {

    const {  id_usuario, titulo, descripcion } = req.body;

    console.log('POST');
    console.log(req.body.titulo);


    const response = await pool.query('INSERT INTO tablero (id_usuario, titulo, descripcion)  VALUES ($1, $2, $3 ) ', [ id_usuario, titulo, descripcion]);
    // console.log(response);
    res.json({
        message: 'Tablero Agregado',
        body: {
            tarea: { id_usuario, titulo, descripcion}
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
