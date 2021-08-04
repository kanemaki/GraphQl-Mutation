const { usuarios, nextId } = require('../data/db.js')

module.exports = {
    novoUsuario(_, { nome, email, idade}) {
        const novo = {
            id: nextId(),
            nome,
            email,
            idade,
            perfil_id: 1,
            status: 'ATIVO'
        }

        usuarios.push(novo)
        return novo
    }
}