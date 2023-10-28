const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authController = require('./controllers/authController'); // Importar seu controlador
const budgetController = require('./controllers/budgetController');

dotenv.config(); // Carregue as variáveis de ambiente do arquivo .env

mongoose.set('strictQuery', false);

const app = express();
app.use(cors());
app.use(express.json());


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

app.post('/budget/create', budgetController.create)


// Conexão com o BD
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.g6l4y4r.mongodb.net/?retryWrites=true&w=majority`).then(()=>{	
	app.listen(5000)
	console.log("conectou o bd")
}).catch((err) => console.log(err))

