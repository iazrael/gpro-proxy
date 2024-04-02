var request = require('request');
var options = {
    'method': 'POST',
    'url': 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAozWcBsZbN04OCt9Icbo1jC0Bt-llxWQI',
    'headers': {
        'Content-Type': 'application/json',
        'Cookie': 'refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE3MjA5MzQ5NzEyOTIwNzMsInRva2VuX2lkIjoiYWE0NzQ2OWUtMTE1ZC00OWIwLWFkMjEtZmNjZTdhOGI4ZmQ0IiwidXNlcl9pZCI6ImUwY2IxZDE1LTYzY2ItNDc3Yi05NjhmLTBlNjNkMWM2N2FlOSJ9.KF6gHOI_TQ_7o1UvVzxz3hdskrRHD7lmHSOPZHpcQDA'
    },
    body: JSON.stringify({
        "contents": [
            {
                "parts": [
                    {
                        "text": "写一首唐诗"
                    }
                ]
            }
        ]
    })

};
request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
});
