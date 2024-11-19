require('dotenv').config();
const axios = require('./node_modules/axios/index.d.cts');

// Base64 encode das credenciais para enviar no cabeçalho de autenticação
const getBearerToken = async () => {
    const credentials = `${process.env.API_KEY}:${process.env.API_SECRET_KEY}`;
    const base64Credentials = Buffer.from(credentials).toString('base64');
    try {
        const response = await axios.post('https://api.twitter.com/oauth2/token', 'grant_type=client_credentials', {
                headers: {
                    Authorization: `Basic ${base64Credentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            });
        return response.data.access_token;
    } catch (error) {
        console.error('Erro ao obter o Bearer Token:', error);
    }
};

// Função para buscar dados usando o Bearer Token
const fetchTweets = async () => {
    const bearerToken = await getBearerToken();
    if (bearerToken) {
        try {
            const response = await axios.get('https://api.twitter.com/2/tweets/search/recent?query=javascript', {
                    headers: {
                        Authorization: `Bearer ${bearerToken}`
                    }
                });
            console.log('Tweets:', response.data);
        } catch (error) {
            console.error('Erro ao buscar tweets:', error);
        }
    }
};

fetchTweets();