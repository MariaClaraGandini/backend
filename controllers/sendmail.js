// const transport = nodemailer.createTransport({
//     host: 'smtp.office365.com',
//     port: 587,
//     secure: false,
//     auth:{
//     user: 'mariaclaragandinipereira@outlook.com',
//     pass:'Clara1317', 
//   }
//   })

//   transport.sendMail({
//     from: 'Manual do Dev <samecatlove112233@gmail.com>',
//     to: 'maria.pereira53@fatec.sp.gov.br',
//     subject: 'Orçamento email com Nodemailer',
//     html:'<h1>teste</h1>',
//     text: 'teste',
//     }).then(info=>{
//       res.send(info)
//     }).catch(error=>{
//       res.send(error)
//     })