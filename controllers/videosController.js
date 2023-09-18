const { google } = require('googleapis');

// Carregue as credenciais do arquivo JSON que você baixou
const credentials = require('../client_secret_499268548389-cvs6uefkk30eev695pr5n0fpvuauulqs.apps.googleusercontent.com.json'); // Atualize o caminho

// Configure a autenticação
const auth = new google.auth.GoogleAuth({
  keyFile: credentials, // Use o caminho correto para o arquivo de credenciais JSON
  scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
});

// Crie um cliente autenticado
const getClient = async () => {
  return await auth.getClient();
};

exports.exibirvideos = async (req, res) => {
  try {
    const youtube = google.youtube('v3');
    const client = await getClient();

    // Parâmetros da solicitação
    const params = {
      auth: client,
      part: 'snippet',
      channelId: 'belamur7944', // Substitua pelo ID do canal desejado
      maxResults: 10,
    };

    // Execute a solicitação para listar vídeos de um canal
    const response = await youtube.search.list(params);

    // Os vídeos estão em response.data.items
    const videos = response.data.items;
    res.json(videos);
  } catch (error) {
    console.error('Erro ao buscar vídeos do canal:', error);
    res.status(500).json({ msg: 'Erro ao obter vídeos do canal' });
  }
};
