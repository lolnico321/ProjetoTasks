const express = require('express');
const knex = require('knex');
const cors = require('cors');
const db = knex(require('./knexfile'));


const app = express();
app.use(express.json());
app.use(cors());


// Rota para listar todas as tarefas
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await db('tasks').select('*');
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao listar tarefas');
    }
});
// Validação de título
const validateTitle = (title) => {
    if (!title || title.trim().length === 0) {
        return 'Título é obrigatório';
    }
    return null;
};

// Rota para buscar uma tarefa específica
app.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await db('tasks').where({ id }).first();
        if (!task) {
            return res.status(404).send('Tarefa não encontrada');
        }
        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar tarefa');
    }
});

// Rota para criar uma nova tarefa
app.post('/tasks', async (req, res) => {
    const { title, description, status } = req.body;
    const validateTitle = (title) => {
        if (!title || title.trim().length === 0) {
            return 'Título é obrigatório';
        }
        return null;
    };

    try {
        const [newTask] = await db('tasks').insert(
            { title, description, status: status || 'pending' },
            ['id', 'title', 'description', 'status', 'created_at']
        );
        res.status(201).json(newTask); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar tarefa');
    }
});

// Rota para atualizar uma tarefa
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const validationError = validateTitle(title);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    try {
        const task = await db('tasks').where({ id }).first();
        if (!task) {
            return res.status(404).send('Tarefa não encontrada');
        }

        const [updatedTask] = await db('tasks').where({ id }).update(
            { title, description, status },
            ['id', 'title', 'description', 'status', 'created_at']
        );
        res.json(updatedTask);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar tarefa');
    }
});

// Rota para remover uma tarefa
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await db('tasks').where({ id }).first();
        if (!task) {
            return res.status(404).send('Tarefa não encontrada');
        }

        await db('tasks').where({ id }).del();
        res.json({ message: 'Tarefa removida com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao remover tarefa');
    }
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
