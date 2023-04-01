const express   = require('express')
const app       = express()
const port      = 3000



app.get('/', (req,res)=>{
    let resp = {
        name: "Dude",
        age: 38,
        hobbies: ['loves programming', 'sex', 'travel']
    }
    res.send(resp)
})

app.get('/joke', async (req,res)=>{
   requestJoke()
   .then(resp=>{
    res.send(JSON.parse(resp))
   })
   .catch(err => console.log(err))
})


app.listen(port, ()=>{
    console.log('App is running on', {port})
})


// const text = 'Hello, this is T0102, voice systems online, what can I do for you today?'

async function requestJoke() {
    const api_key = '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'  
    const requestBody = {
        model: 'text-davinci-003',
        prompt: 'Generate 100 user objects in json format. objects should contain name, age, id and email. email domains should be random',
        max_tokens: 4000,
        // temperature: 0.5,
    };

    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`
      });
    

    return fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
   })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        console.log(res.choices[0].text)
        return res.choices[0].text
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
