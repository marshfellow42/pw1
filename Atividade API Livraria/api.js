const express = require('express')
const app = express()
const PORT = 3000
const users = require('./db.json')
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.listen(PORT, () => {
    console.log(`API Livraria API escutando na porta ${PORT}`)
})

app.get('/livros', (req, res) => {
    res.json(users.db)
})

app.get('/livros/editora/:editora', (req, res) => {
    const editora_livro = users.db.filter(l => l.editora === req.params.editora)

    if (editora_livro.length > 0) {
        res.json(editora_livro)
    } else {
        res.status(404).json({ err: 'Nome de editora de livros, não encontrado' });
    }
})

app.get('/livros/recentes', (req, res) => {
    const livros_recentes = users.db.slice().sort((a, b) => b.ano - a.ano);

    if (livros_recentes.length > 0) {
        res.json(livros_recentes);
    } else {
        res.status(404).json({ err: 'Lista de livros do mais novo até o mais antigo, não encontrado' });
    }
});

app.get('/livros/antigos', (req, res) => {
    const livros_antigos = users.db.slice().sort((a, b) => a.ano - b.ano);

    if (livros_antigos.length > 0) {
        res.json(livros_antigos);
    } else {
        res.status(404).json({ err: 'Lista de livros do mais antigo até o mais novo, não encontrado' });
    }
});

app.get('/livros/sem-estoque', (req, res) => {
    const livros_sem_estoque = users.db.filter(l => parseInt(l.quant, 10) === 0);

    if (livros_sem_estoque.length > 0) {
        res.json(livros_sem_estoque);
    } else {
        res.status(404).json({ err: 'Livros sem estoque, não encontrado' });
    }
});

app.get('/livros/acima/:preco', (req, res) => {
    const preco_acima_livro = users.db.filter(l => l.preco > parseFloat(req.params.preco));

    if (preco_acima_livro.length > 0) {
        res.json(preco_acima_livro);
    } else {
        res.status(404).json({ err: 'Preço dos livros acima do informado, não encontrado' });
    }
});

app.get('/livros/abaixo/:preco', (req, res) => {
    const preco_abaixo_livro = users.db.filter(l => l.preco < parseFloat(req.params.preco));

    if (preco_abaixo_livro.length > 0) {
        res.json(preco_abaixo_livro);
    } else {
        res.status(404).json({ err: 'Preço dos livros abaixo do informado, não encontrado' });
    }
});

app.get('/livros/:titulo', (req, res) => {
    const titulo_livro = users.db.filter(l => l.titulo === req.params.titulo);

    if (titulo_livro.length > 0) {
        res.json(titulo_livro);
    } else {
        res.status(404).json({ err: 'Título do livro, não encontrado' });
    }
});


app.post('/livros', (req, res) => {
    let lastId = Math.max(...users.db.map(u => u.id))
    const user = {
        id: ++lastId,
        firstName: req.body.fName,
        lastName: req.body.lName,
        email: req.body.e
    }
    users.db.push(user)
    res.json(users.db)
})

app.put('/livros/:id', (req,res) => {
    const index = users.db.findIndex(l => l.id === parseInt(req.params.id))
    users.db[index] =
    {
        id: req.params.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }
    res.json(users.db)
})

app.delete('/livros/:id', (req, res) => {
    let db = users.db.filter(l => l.id !== parseInt(req.params.id))
    res.json(db)
})