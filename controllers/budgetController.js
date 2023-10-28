const Budget = require('../models/Budget');

exports.create = async (req, res) => {
    try {
        const { name, email, phone, state, city, musicaltraining } = req.body;
        
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


