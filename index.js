const express = require('express');
const app = express();

app.use(express.json());

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/info', (req, res) => {
    let upperText = `<h3>Phonebook has info for ${persons.length} people</h3>`;
    let date = new Date;
    let offset = date.getTimezoneOffset();
    let lowerText = `<h3>${date} (${offset})`;
    res.send(upperText + lowerText);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(p => p.id === id);
    if (person) {
        return res.json(person);
    } else {
        return res.status(404).end();
    };
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(p => p.id !== id);
    res.status(204).end();
});

const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
    return maxId + 1;
};

app.post('/api/persons', (req, res) => {  
    const body = req.body;
    
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        });
    };

    persons.forEach(p => {
        if (p.name == body.name) {
            return res.status(400).json({
                error: 'name must be unique'
            });
        };
    });

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };

    persons = persons.concat(person);
    res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});