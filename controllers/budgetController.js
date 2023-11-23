const Budget = require('../models/Budget');
const dotenv = require('dotenv');
const nodemailer = require ('nodemailer');
dotenv.config(); 
// ...

exports.create = async (req, res) => {
  try {
    console.log('Corpo da Requisição:', req.body);

    const { name, email, phone, state, city, musicaltraining } = req.body;
    console.log('Valores:', name, email, phone, state, city, musicaltraining);

    const budget = new Budget({
      name,
      email,
      phone,
      state,
      city,
      musicaltraining,
    });

    await budget.save();

    const transport = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log('Antes de sendMail');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Solicitação de Orçamento',
      html: `<h1>Orçamento</h1>
            <h2>Confirmação da solicitação de orçamento com as informações abaixo. Assim que possível, entraremos em contato.</h2>
            <p>Nome: ${name}</p>
            <p>Email: ${email}</p>
            <p>Telefone: ${phone}</p>
            <p>Estado: ${state}</p>
            <p>Cidade: ${city}</p>
            <p>Formação Musical: ${musicaltraining}</p>`,
      text: 'teste',
    };

    console.log('Configuração do transporte:', transport.options);

    // Adicione tratamento de erro ao enviar o e-mail
    await transport.sendMail(mailOptions);

    console.log('Depois de sendMail');
    res.status(201).json({ msg: 'Orçamento registrado com sucesso' });
  } catch (error) {
    console.error(error);

    // Adicione logs para entender o erro
    console.log('Erro ao processar a requisição:', error.message);

    res.status(500).json({ msg: 'Erro no servidor ao registrar o orçamento', error: error.message });
  }
};

// ...


exports.getAll = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro ao obter os orçamentos' });
  }
};