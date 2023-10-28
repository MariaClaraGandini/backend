const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Função para registro de usuário
exports.register = async (req, res) => {
  try {
    const { name, email, phone, state, city, password, confirmPassword } = req.body;

    ///VALIDAÇÃO
	if(!name){
		return res.status(422).json({msg: 'Nome é obrigatório'})
	}

	if(!email){
		return res.status(422).json({msg: 'Nome é obrigatório'})
	}
	if(!phone){
		return res.status(422).json({msg: 'Telefone é obrigatório'})
	}
	if(!state){
		return res.status(422).json({msg: 'Estado é obrigatório'})
	}
	if(!city){
		return res.status(422).json({msg: 'Cidade é obrigatório'})
	}

	if(!password){
		return res.status(422).json({msg: 'Senha é obrigatório'})
	}
	if(password !== confirmPassword){
		return res.status(422).json({msg: 'A senha não confere'})
		}


    // CHECAR SE O E-MAIL JÁ É DE UMA CONTA EXISTENTE
    const userExists = await User.findOne({ $or: [{ email: email }, { phone: phone }] });

    if (userExists) {
      return res.status(422).json({ msg: 'Usuário já existe com este e-mail ou telefone' });
    }

    // CRIPTOGRAFIA DE SENHA
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      phone,
      state,
      city,
      password: passwordHash,
    });

    await user.save();

    res.status(201).json({ msg: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro no servidor ao registrar o usuário' });
  }
};







// LOGIN USUÁRIO
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ msg: 'Informe o e-mail e a senha' });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(422).json({ msg: 'Usuário não encontrado' });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ msg: 'Senha inválida' });
    }

    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user._id }, secret);

    res.status(200).json({ msg: 'Autenticação bem-sucedida', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro no servidor ao fazer login' });
  }
};






//CHECAR TOKEN
exports.checkToken = (req, res, next) => {
 const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'Acesso negado' });
  }

  try {
    const secret =  process.env.SECRET;
    const decoded = jwt.verify(token, secret);

    next(); // Continue com a rota protegida.
  } catch (error) {
    res.status(400).json({ msg: 'Token inválido' });
  }
};





//VERFICAR SE USUÁRIO EXISTE
exports.usuarioexistetoken =async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id, '-password');

  if (!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado' });
  }
  res.status(200).json({ user });
}






//Logout
exports.logout=(req,res) => {
  try {
    res.clearCookie('token');

    res.status(200).json({ msg: 'Logout realizado com sucesso' });
  } catch {
    res.status(500).json({ msg: 'Erro ao fazer logout' });
  }
};

