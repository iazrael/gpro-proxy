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
    url: 'http://gpro.imatlas.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAozWcBsZbN04OCt9Icbo1jC0Bt-llxWQI',
    headers: {
        'Content-Type': 'application/json',
        'Cookie': 'last-cidemo-site=gpro.imatlas.com',
        'Host': 'generativelanguage.googleapis.com'
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
