const { perfis, nextId } = require('../../data/db.js')

function indicePerfil(filtro){
    if(!filtro) return -1
    const { id } = filtro
    if(id) {
        return perfis
            .findIndex(u => u.id === id)
    } 
    return -1
}

module.exports = {
    //{ nome, email, idade }
    novoPerfil(_, { dados }) {
        
        const nomeExistente = perfis
                .some(u => u.nome === dados.nome)

        if(nomeExistente) {
            throw new Error('Nome cadastrado')
        }        
        
        const novo = {
            id: nextId(),
            ...dados,
        }

        perfis.push(novo)
        return novo
    },

    excluirPerfil(_, { filtro }) {
        const i = indicePerfil(filtro)
        if(i < 0) return null
        const excluidos = perfis.splice(i, 1)
        
        return excluidos ? excluidos[0] : null    
    },

    alterarPerfil(_, {filtro, dados}) {
        const i = indicePerfil(filtro)
        if(i < 0) return null

        perfis[i].nome = dados.nome
        //const perfil = { 
        //    ...perfis[i],
        //    ...args
        //}

        //perfis.splice(i, 1, perfil)
        //return perfil
        return perfis[i]
    },


}