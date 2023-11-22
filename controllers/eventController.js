const Event = require('../models/Event');


exports.create = async (req, res) => {
    try {
     console.log('Entrou na rota /create');
const { title, start, local, description } = req.body;

if(!title || !start  || !local){
  console.log('preenchatudo')
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

  exports.getAll = async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Erro ao obter os eventos' });
    }
  };
  
  exports.getEvent =async (req, res) => {
    const id = req.params.id;
    const event = await Event.findById(id);
    res.status(200).json({ event });
  }

  exports.edit = async (req, res) => {

    try{
    const id = req.params.id;
    const eventData = req.body; 
    const event = await Event.findById(id);
  
    if(!event){
      res.status(404).json({ msg: 'Evento não encontrado' });
  
    }
  
    event.title = eventData.title;
    event.start = eventData.start;
    event.local = eventData.local;
    event.description = eventData.description || event.description;
  
    await event.save();
    res.status(201).json({ msg: 'Evento registrado com sucesso' });
  
  
    }catch{
      console.error(error);
      res.status(500).json({ msg: 'Erro ao editar o evento' });
    }

  }
  
  
  exports.delete = async (req, res) => {
    try {
      const id = req.params.id;
      const event = await Event.findById(id);
  
      if (!event) {
        return res.status(404).json({ msg: 'Evento não encontrado' });
      }
  
      await event.remove();
  
      res.status(201).json({ msg: 'Evento excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Erro ao excluir o evento' });
    }
  };
  
   exports.deleteAll = async (req, res) => {
    try {
      const events = await Event.find();
      await events.remove();
      res.status(201).json({ msg: 'Eventos excluído com sucesso' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Erro ao obter os eventos' });
    }
  };