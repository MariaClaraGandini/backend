require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const authController = require('./controllers/authController'); // Importar seu controlador
const videosController = require('./controllers/videosController'); // Importar controlador de vídeos

mongoose.set('strictQuery', false);

const app = express();
app.use(cors());
app.use(express.json());

const User = require('./models/User');

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Bem-vindo à API' });
});

// Rota para registro de usuário
app.post('/auth/register', authController.register);

// Rota para login de usuário
app.post('/auth/login', authController.login);

app.get('/user/:id', authController.checkToken, authController.usuarioexistetoken);

// Rota para fazer logout no lado do servidor (removendo o token do cookie)
app.get('/auth/logout', authController.logout);

// Rota para buscar vídeos do canal
app.get('/videos', videosController.exibirvideos); // Use o controlador de vídeos

//Conexão com o BD

const dbUser = process.env.DB_USER;
const dbpassword = process.env.DB_PASS;

mongoose
  .connect(`mongodb+srv://${dbUser}:${dbpassword}@cluster0.g6l4y4r.mongodb.net/`)
  .then(() => {
    app.listen(5000);
    console.log('Conectou ao BD');
  })
  .catch((err) => console.log(err));
