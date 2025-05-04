const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/booksDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  genre: String
});

const Book = mongoose.model('Book', bookSchema);

app.get('/add/:title/:author/:price/:genre', async (req, res) => {
  const { title, author, price, genre } = req.params;
  try {
    const book = new Book({ title, author, price, genre });
    await book.save();
    res.send('Book added successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/view', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/update/:title', async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title });
    book.title = 'Dummy Title';
    book.author = 'Dummy Author';
    book.price = 999;
    book.genre = 'Dummy Genre';
    await book.save();
    res.send('Book updated with dummy data.');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/delete/:title', async (req, res) => {
  try {
    const result = await Book.deleteOne({ title: req.params.title });
    res.send('Book deleted successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
