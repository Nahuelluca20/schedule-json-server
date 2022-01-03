const express = require("express");
const app = express();
app.use(express.json());

let agenda = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  const date = new Date();
  const persons = agenda.length;
  res.send(`
  <h2>PhoneBook has info for ${persons} people</h2>
  <h3>${date}</h3>
  `);
});

app.get("/api/persons/", (req, res) => {
  res.json(agenda);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = agenda.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = agenda.filter((persone) => persone.id !== id);

  res.status(204).end();
});

const generateId = () => {
  const maxId = agenda.length > 0 ? Math.max(...agenda.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    console.log(body.number)
    return res.status(400).json({
      error: "content missing",
    });
  }
  const names = agenda.map((person) => person.name);
  const numbers = agenda.map((person) => person.number);

  console.log(numbers)
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const number = numbers[i]
    if (name === body.name || number === body.number) {
      return res.status(400).json({
        error: "name must be unique",
      });
    }
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  agenda = agenda.concat(person);
  res.json(agenda);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
