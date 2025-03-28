import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('Hola mundo')
})

const port = process.env.PORT || 4000

app.listen(port, ()=> {
    console.log('servidor funcionando', port)
})
