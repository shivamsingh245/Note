const express = require('express');
const cors = require('cors');
const noteRouter = require('./routes/note-route');
const PORT = 5000;

require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/notes', noteRouter);

// app.use('/api', (req, res) => {
//     res.send('Hello');
// });

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });