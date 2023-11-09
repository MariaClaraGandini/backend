const Budget = require('../models/Budget');

exports.create = async (req, res) => {

  // const transport = nodemailer.createTransport({
  //   host: 'smtp.office365.com',
  //   port: 587,
  //   secure: false,
  //   auth:{
  //   user: 'mariaclaragandinipereira@outlook.com',
  //   pass:'Clara1317', 
  // }
  // })

  // transport.sendMail({
  //   from: 'Manual do Dev <samecatlove112233@gmail.com>',
  //   to: 'maria.pereira53@fatec.sp.gov.br',
  //   subject: 'Orçamento email com Nodemailer',
  //   html:'<h1>teste</h1>',
  //   text: 'teste',
  //   }).then(info=>{
  //     res.send(info)
  //   }).catch(error=>{
  //     res.send(error)
  //   })
    
  
  
//     try {
//         const { name, email, phone, state, city, musicaltraining } = req.body;
        
        
//     const budget = new Budget({
//         name,
//         email,
//         phone,
//         state,
//         city,
//         musicaltraining,
//       });

      

//         await budget.save();






//         res.status(201).json({ msg: 'Orçamento registrado com sucesso' });
// }catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: 'Erro no servidor ao registrar o orçamento' });
//   }

}


