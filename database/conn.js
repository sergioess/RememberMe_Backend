const { Pool } = require('pg');

const config = {

    connectionString: 'postgres://vqnvqguagfltlb:d74da2172d428aed94bc216428afa6bcdee350caf969722a60931c60172b3504@ec2-18-210-95-55.compute-1.amazonaws.com:5432/d2hsqe7t53rfjh',
    ssl: {
        rejectUnauthorized: false
    }
};
const pool = new Pool(config);


module.exports = pool;