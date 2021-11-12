const { Pool } = require('pg');

const config = {

    connectionString: 'postgres://vqnvqguagfltlb:d74da2172d428aed94bc216428afa6bcdee350caf969722a60931c60172b3504@ec2-18-210-95-55.compute-1.amazonaws.com:5432/d2hsqe7t53rfjh',
    ssl: {
        rejectUnauthorized: false
    }
};
const pool = new Pool(config);
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

    const { id_tablero, id_colaborador } = req.body;

    console.log('POST');
    console.log(req.body.titulo);


    const response = await pool.query('INSERT INTO tablero_colaboradores (id, id_usuario, estado, descripcion)  VALUES ($1, $2, $3, $4) ', [id, id_usuario, estado, descripcion]);
    // console.log(response);
    res.json({
        message: 'Tablero Agregado',
        body: {
            tarea: { id, id_usuario, estado, descripcion}
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
