
const pool = require('../database/conn');



// read -> GET
exports.readByIdUsr = async function (req, res) {
    const id = parseInt(req.params.id)
    try {
        const respuesta = await pool.query('select n.id as id, n.type_notification , n.created_at, n.description , n.id_objeto , u.id as usr_r_id, u.username as usr_r_name,u2.id as usr_s_id, u2.username as usr_s_name, nc.id as idtype, nc.description as noti_descipcion from notification n left join usuarios u on (n.id_usr_recieve = u.id) left join usuarios u2 on (n.id_usr_send = u2.id) left join notifications_codes nc on (n.type_notification = nc.id) where n.id_usr_recieve = $1 and read = false order by n.created_at desc', [id]);
        console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }
};


// read -> GET
exports.countUnreadByUsr = async function (req, res) {
    const id = parseInt(req.params.id)
    try {
        const respuesta = await pool.query('select count(id) from notification n where n.id_usr_recieve  = $1 and n.read = false', [id]);
        console.log(respuesta);
        res.status(200).json(respuesta.rows[0].count);
    }
    catch (err) {
        console.log(err);
    }
};


// update notification to read -> PUT
exports.updateNotifRead = async function (req, res) {

    const id = parseInt(req.params.id)

    const response = await pool.query('UPDATE notification set read = true where id = $1 RETURNING * ', [id]);
    // console.log(response);
    res.json({
        message: 'Registro notificacion modificado',
        body: {
            bicacora: response.rows[0]
        }
    })


};


// create one-> POST
exports.create = async function (req, res) {

    const { id_usr_recibe, id_usr_send, type_notification, description, id_objeto } = req.body;

    console.log('POST');
    console.log(req.body);

    const response = await pool.query('INSERT INTO notification ( id_usr_recibe, id_usr_send, type_notification, description, id_objeto)  VALUES ($1, $2, $3, $4, $5 ) RETURNING *  ', [id_usr_recibe, id_usr_send, type_notification, description, id_objeto]);
    // console.log(response);
    res.json({
        message: 'Notificacion Agregada',
        body: {
            tablero: response.rows[0]
        }
    })


};
