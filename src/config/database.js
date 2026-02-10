import mysql from 'mysql2/promise'
import { DB_HOST,DB_USER,DB_DATABASE,DB_PASSWORD,DB_PORT} from './envconfig.js'

export const conn = mysql.createPool({
    host : DB_HOST,
    port : parseInt(DB_PORT || '3306'),
    user : DB_USER,
    password : DB_PASSWORD,
    database : DB_DATABASE,
    waitforConnection : true,
    connectionLimit : 10
})
