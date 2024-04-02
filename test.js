const axios = require('axios');
let data = JSON.stringify({
    "contents": [
        {
            "parts": [
                {
                    "text": "写一首唐诗"
                }
            ]
        }
    ]
});

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAozWcBsZbN04OCt9Icbo1jC0Bt-llxWQI',
    headers: {
        'Content-Type': 'application/json'
    },
    data: data
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });
