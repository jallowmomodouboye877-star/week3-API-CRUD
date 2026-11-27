
const express = require('express');
const app = express();
app.use(express.json());
const port = 4000;

let todos = [
  { id: 1, task: 'Buy groceries', completed: false },
  { id: 2, task: 'Clean the house', completed: true },
  { id: 3, task: 'Finish homework', completed: false }
];

let nextTodoId = 4;

app.get('/todos', (req, res) => {
    if (todos.length > 0) {
        res.status(200).json(todos);
    } else {
        res.status(404).json({ message: 'No todos found' });
    }
});

app.get('/todos/:id', (req, res) =>{
    const todoId = Number(req.params.id);
    const todo = todos.find(t => t.id === todoId);
    if (todo) {
        res.status(200).json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });    
    }
});

app.get('/completed', (req, res) =>{
    const completedTodos = todos.filter(todo => todo.completed === true);
    res.status(200).json(completedTodos);
});


//Adding a todo

app.post('/todos', (req, res) => {
    const { task, completed } = req.body ??{}
    

    if (typeof task !== 'string' || !task.trim() === ''){
        return res.status(400).json({
            message: "Task must be a non empty string"
        });
    }
    
    const newTodo = {
        id : nextTodoId++,
        task: task.trim(),
        completed: completed || false
    }

    todos.push(newTodo);
    res.status(201).json(newTodo);
});


app.patch('/todos/:id', (req, res) => {
    const todoId = Number(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === todoId);
    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    } 
    const todo = todos[todoIndex];

    if (req.body.task !== undefined) {

        if (typeof task !== 'string' || !task.trim() === '') {
            return res.status(400).json({ message: 'Task must be a non-empty string' });
        }
        todo.task = req.body.task.trim();
    }
    
    res.status(200).json(todo);
});

app.delete('/todos/:id', (req, res) => {
    const todoId = Number(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === todoId);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } else {
        return res.status(404).json({ message: 'Todo not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});