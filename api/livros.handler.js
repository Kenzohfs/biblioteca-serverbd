const crud = require('../crud');
const livros_autores = require('./livros_autores.handler');

async function buscarLivros() {
    return crud.get("Livros");
}

async function cadastrarLivro(livro) {
    const autores = livro.lista_autores;
    delete livro.lista_autores;

    //falta verificação se existe os autores para poder cadastrar o livro

    const livroSalvo = await crud.save("Livros", null, livro);

    autores.forEach(async (autor) => {
        const autorRef = await crud.returnSelect("Autores", "cpf", autor.cpf);
        await livros_autores.cadastrarLivroAutor(autorRef[0].id, livroSalvo.id);
    });

    return livroSalvo;
}

async function atualizarLivro(livro, locacoes_id) {
    const novoLivro = await crud.get("Livros", livro);
    novoLivro.locacoes_id = locacoes_id;
    await crud.save("Livros");
}

module.exports = {
    buscarLivros,
    cadastrarLivro,
    atualizarLivro
}