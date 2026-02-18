import { UsuarioRepository } from "../repositories/userrepository.js";
import { Usuario } from "../models/usuarios.js";
import { AppError } from "../Errors/errorHandle.js";
import bcrypt from "bcryptjs";

export class usuarioService {
    static async ExibirUsuarios() {
       const usuarios = await UsuarioRepository.BuscarTodos()

        if(usuarios.length === 0) {
            throw new AppError('Nenhum usuario encontrado', 404)
        }

        return usuarios 
    }
    static async ExibirUsuario(id) {
        

        if (isNaN (id)) {
            throw new AppError('Id precisa ser um numero',400)

        }
        const usuario = await UsuarioRepository.BuscarporId(parseInt(id))

        if (!usuario) {
            throw new AppError('Usuario nao encontrado',404)
        }
        return usuario
    }

    static async registrarUsuario(nome,email,senha) {

            if (!nome || !email || !senha) {
            throw new AppError('Todos os campos devem ser preenchidos',400);
        }

        const emailExiste = await UsuarioRepository.Buscaremail(email)

        if (emailExiste) {
            throw new AppError('Ja existe este email',409)
        }

        const senhaHash = await bcrypt.hash(senha,10)

        const novoUsuario = await UsuarioRepository.inserirUsuario(new Usuario(null,nome,email,senhaHash))
        return novoUsuario
    }

    static async login(email,senha) {
        if (!email || !senha) {
            throw new AppError('Email e Senha sao obrigatorios',400)
        }

        const usuario = await UsuarioRepository.Buscaremail(email)

        if (!usuario) {
            throw new AppError('Credenciais Invalidas',401)
        }

        const passwordCheck = await bcrypt.compare(senha,usuario.senha)

        if (!passwordCheck) {
            throw new AppError('Credenciais Invalidas',401)
        }

        return passwordCheck

    }

    static async update(id,nome,email,senha) {
        
        if (isNaN(id)) {
            throw new AppError('ID precisa ser um numero',400)
        }

        if (!nome & !email & !senha) {
            throw new AppError('É necessario informar ao menos um campo para atualizar',400)
        }

        const usuarioExist = await UsuarioRepository.BuscarporId(parseInt(id))

        if (!usuarioExist) {
            throw new AppError('Usuario nao encontrado',404)
        }


            const emailExiste = await UsuarioRepository.Buscaremail(email)
            if (emailExiste) {
                throw new AppError('Este email ja existe',400)
            }
        

        nome = nome ?? usuarioExist.nome
        email = email ?? usuarioExist.email
        senha = senha ?? usuarioExist.senha

        const usuarioAtualizado = await UsuarioRepository.atualizarUsuario(id,new Usuario(id,nome,email,senha))

            if (!usuarioAtualizado) {
                throw new AppError('Erro ao atualizar usuario',400)
                
            }
            return usuarioAtualizado
    }

}