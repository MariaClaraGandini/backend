const Event = require('../models/Event');


exports.create = async (req, res) => {
    try {
     console.log('Entrou na rota /create');
const { title, start, local, description } = req.body;

if(!title || !start  || !local){
  return res.status(422).json({msg: 'Preencha todos os campos necessários!'})

}

const event = new Event({
  title,
  start,
  local,
  description,
});

      await event.save();
  
      console.log('name:', title);
      console.log('date:', start);
      console.log('local:', local);
      console.log('description:', description);


      res.status(201).json({ msg: 'Evento registrado com sucesso' });
      
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Erro no servidor ao registrar calendário' });
    
    }
  };


  
  // exports.getAll = async (req, res) => {
  //   try {
  //     const events = await Event.find();
  
  //     // Formate a data para o formato ISO 8601
  //     const formattedEvents = events.map(event => {
  //       // Certifique-se de que 'start' é um objeto Date
  //       const formattedEvent = event.toObject();
  //       formattedEvent.start = new Date(formattedEvent.start).toISOString();
  //       return formattedEvent;
  //     });
  
  //     res.status(200).json(formattedEvents);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ msg: 'Erro ao obter os eventos' });
  //   }
  // };

  exports.getAll = async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Erro ao obter os eventos' });
    }
  };
  