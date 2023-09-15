require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const cors = require('cors'); // Importe a biblioteca 'cors

mongoose.set('strictQuery', false); // Configura a opção strictQuery como false



const app = express()
app.use(cors());

 app.use(express.json())

const User = require('./models/User')

app.get ('/', (req, res) =>{
	res.status(200).json({msg:"bem-vindo a API"})
})

app.post('/auth/register', async(req,res) =>{
	const{name, email, phone, state, city, password, confirmpassword} = req.body


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
	if(password !== confirmpassword){
		return res.status(422).json({msg: 'A senha não confere'})
		}

	//CHECAR SE O E-MAIL JÁ É DE UMA CONTA EXISTENTE
	const userExists = await User.findOne({email:email} || {phone:phone})

		if(userExists){
		return res.status(422).json({msg: 'usuario já existe'})
		}


	//CRIPTOGRAFIA DE SENHA
	const salt = await bcrypt.genSalt(12)
	const passwordHash = await bcrypt.hash(password, salt)

	const user = new User({
		name,
		email,
		password: passwordHash,
		})
		try{
			await user.save()
			res.status(201).json({msg: 'user criado'})
			
			}catch(error){
			console.log(error)
			res.status(500).json({msg:"Deu erro"})
			
			}
})


app.post("/auth/login", async (req,res) =>{

//pegar os dois campos que vem do req.body
const{email, password}= req.body

if(!email){
	return res.status(422).json({msg: 'Digite seu e-mail!'})
}

if(!password){
	return res.status(422).json({msg: 'Digite a senha!'})
}


const user = await User.findOne({email:email})

if(!user){
	return res.status(422).json({msg: 'usuario nao encontrado'})
	}

//VERIFICAR SE A SENHA É IGUAL
const checkPassword= await bcrypt.compare(password, user.password)

if(!checkPassword){
	return res.status(404).json({msg : 'senha inválida'})
	} 

	try{

		const secret = process.env.SECRET
		const token = jwt.sign({
			id: user._id,
		},secret,)
		res.status(200).json({msg:"autentcação realizada com sucesso", token})
		} catch (err){
		console.log(error)
		res.status(500).json({msg: 'erro no server'})
		
		}
})
app.get("/user/:id", checkToken,async(req,res)=>{
	const id= req.params.id
	const user= await User.findById(id, '-password')

	if(!user){
	return res.status(404).json({msg: 'usuario nao encontrado'})
	}
	res.status(200).json({user})
	})
//checar token
function checkToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
  
	if (!token) {
	  return res.status(401).json({ msg: 'Acesso negado' });
	}
  
	try {
	  const secret = process.env.SECRET;
	  const decoded = jwt.verify(token, secret);
	  
	  // Se o token for válido, você pode acessar os dados decodificados no objeto "decoded"
	  // Por exemplo, você pode verificar o ID do usuário ou outras informações relevantes.
  
	  next(); // Continue com a rota protegida.
  
	} catch (error) {
	  res.status(400).json({ msg: 'Token inválido' });
	}
  }

// Rota para fazer logout no lado do servidor (removendo o token do cookie)
app.get('/logout', (req, res) => {
	// Remova o token JWT armazenado no lado do cliente (por exemplo, em um cookie ou localStorage)	
	try{
	res.clearCookie('token'); 

	res.status(200).json({ msg: 'Logout realizado com sucesso' });
	}catch{
		res.status(500).json({ msg: 'Erro ao fazer logout' });

	}
  });
  
  
  


//CONEXÃO COM O BD
const dbUser = process.env.DB_USER
const dbpassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbpassword}@cluster0.g6l4y4r.mongodb.net/`).then(()=>{	
	app.listen(5000)
	console.log("conectou o bd")
}).catch((err) => console.log(err))

