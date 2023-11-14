const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require ('nodemailer');
const authController = require('./controllers/authController'); // Importar seu controlador
const budgetController = require('./controllers/budgetController');
const eventController = require('./controllers/eventController')


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
	extended:true,
}));
dotenv.config(); // Carregue as variáveis de ambiente do arquivo .env

mongoose.set('strictQuery', false);


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
app.get('/budget/getAll', budgetController.getAll)

app.post('/event/create', eventController.create)
app.get('/event/getAll', eventController.getAll)



app.get('/send', (req, res) => {
	const transport = nodemailer.createTransport({
		host: 'smtp-mail.outlook.com',
		port: 587,
		secure: false,
		auth: {
			user: 'mariaclaragandinipereira@outlook.com',
			pass: 'Clara1317',
		},
		tls: {
			rejectUnauthorized: false
		}
	});
	

    transport.sendMail({
        from: 'Manual do Dev <mariaclaragandinipereira@outlook.com>',
        to: 'mariaclaragandinipereira@outlook.com',
        subject: 'Orçamento email com Nodemailer',
        html: '<h1>teste</h1>',
        text: 'teste',
    }).then(info => {
        console.log("e-mail enviado com suesso");
		res.send(info);

    }).catch(error => {
		console.log(error);

        res.send(error);
    });
});

// Conexão com o BD
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.g6l4y4r.mongodb.net/?retryWrites=true&w=majority`).then(()=>{	
	app.listen(5000)
	console.log("conectou o bd")
}).catch((err) => console.log(err))

