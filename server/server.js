const PORT = process.env.PORT ?? 8000
const express = require('express');
const  { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(cors());
app.use(express.json());

// get all todos
app.get('/todos/:userEmail', async (req, res) => {
    const { userEmail } = req.params
    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
        res.json(todos.rows)
    } catch(err) {
        console.error(err)
    }
})

// create a new todo 
app.post('/todos', async (req, res) => {
    const { user_email, title, progress, date } = req.body;
    const id = uuidv4();
    try{
        const newTodo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`, 
        [id, user_email, title, progress, date])
        res.json(newTodo);
    } catch(err) {
        console.error(err);
    }
})

//edit a todo
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const {user_email, title, progress, date} = req.body;
    try {
        const editedTodo = await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;',
        [user_email, title, progress, date, id])
        res.json(editedTodo);
    } catch(err) {
        console.error(err);
    }
})


// delete a todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteTodo = await pool.query('DELETE FROM todos WHERE id = $1;',[id]);
        res.json(deleteTodo);
    } catch (err) {
        console.log(err);
    }
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))