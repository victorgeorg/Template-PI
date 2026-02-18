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
        await usuarioService.login(email,senha)
     
        res.status(200).json({message: 'Usuario logado com sucesso'})
    }

    static async update(req, res) {
        const id = parseInt(req.params.id);
        const { nome, email, senha } = req.body;

       
            const usuarioDados = new Usuario(id, nome, email, senha);
            const usuarioAtualizado = await UsuarioRepository.atualizarUsuario(id, usuarioDados);

            if (!usuarioAtualizado) {
                return res.status(404).json({ error: 'Usuário não encontrado para atualizar' });
            }

            res.status(200).json(usuarioAtualizado);
       
    }

    static async delete(req, res) {
        const id = parseInt(req.params.id);

      
            const excluido = await UsuarioRepository.excluirUsuario(id);

            if (!excluido) {
                return res.status(404).json({ error: 'Usuário não encontrado para exclusão' });
            }

            res.status(200).json({ message: 'Usuário removido com sucesso' });
      
    }

}



