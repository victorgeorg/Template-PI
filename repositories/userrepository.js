import { conn } from "../src/config/database.js";
import { Usuario } from "../src/models/usuarios.js";

export class UsuarioRepository {

    static async BuscarTodos() {
        const [results] = await conn.query('SELECT * FROM usuarios')
        return results.map(Usuario => new Usuario(Usuario.id,Usuario.nome,Usuario.email,Usuario.senha))
    }

   static async BuscarporId(id) {
        const [result] = await conn.query('SELECT * FROM usuarios WHERE id = ?', [id])

            if (result.length === 0) return null

        const Usuario = result[0]
        return new Usuario(Usuario.id,Usuario.nome,Usuario.email,Usuario.senha)
    }

   static async inserirUsuario(Usuario) {
        const {nome,email,senha} = Usuario

        const [result] = await conn.query('INSERT INTO usuarios (nome,email,senha) VALUES (?,?,?)', [nome,email,senha])
        return new Usuario(result.insertId,result.nome,result.email,result.senha)

    }

   static async atualizarUsuario(id,Usuario) {
        const [result] = await conn.query('UPDATE usuarios SET nome = ?,senha = ?,email = ? WHERE id = ?',[nome,email,senha,id])

        if (result.affectedRows === 0) return null

        return new Usuario(id,nome,email,senha) 
    }

   static async excluirUsuario(id) {
        const [result] = await conn.query('DELETE FROM usuarios WHERE id = ?'[id])
        return result.affectedRows > 0
    }

}