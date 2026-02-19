import { UsuarioRepository } from "../repositories/userrepository.js";
import { Usuario } from "../models/usuarios.js";
import { usuarioService } from "../service/usuarioservice.js";


export class UsuarioController {

    static async index(req, res) {
     
        const usuarios = await usuarioService.ExibirUsuarios();
        res.status(200).json(usuarios)
      
    }

    static async buscarporId(req, res) {
        const {id} = req.params

        
            const usuario = await usuarioService.ExibirUsuario(id)      
            res.status(200).send(usuario)     
        
    }

    static async register(req, res) {
        const {nome,email,senha} = req.body;

        
        const novoUsuario = await usuarioService.registrarUsuario(nome,email,senha)
        res.status(201).json(novoUsuario)
      
    }

    static async login(req,res) {
        const {email,senha} = req.body
        const { token } = await usuarioService.login(email,senha)
     
        res.status(200).json({ token })
    }

    static async update(req, res) {
        const id = req.params.id
        const { nome, email, senha } = req.body;

        const usuarioAtualizado = await usuarioService.update(id,nome,email,senha)

        res.status(200).json(usuarioAtualizado);
    }

    static async delete(req, res) {
        const id = parseInt(req.params.id);
        
        await usuarioService.delete(id)

         res.status(200).send();
      
    }

}



