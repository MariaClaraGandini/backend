const Budget = require('../models/Budget');

exports.create = async (req, res) => {


  
  
    try {
      console.log('Corpo da Requisição:', req.body);

      const { name, email, phone, state, city, musicaltraining } = req.body;
      console.log('Valores:', name, email, phone, state, city, musicaltraining);
        
        console.log(name,email,phone,state,city,musicaltraining)
    const budget = new Budget({
        name,
        email,
        phone,
        state,
        city,
        musicaltraining,
      });

      

        await budget.save();






        res.status(201).json({ msg: 'Orçamento registrado com sucesso' });
}catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro no servidor ao registrar o orçamento' });
  }

}


exports.getAll = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro ao obter os orçamentos' });
  }
};