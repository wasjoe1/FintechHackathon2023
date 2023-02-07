const { exec } = require('child_process');
left = () => exec('~/door_py/test.py 12', (err, stdout, stderr) => { });
right = () => exec('~/door_py/test.py 2', (err, stdout, stderr) => { });
up = () => exec('~/door_py/test.py 9', (err, stdout, stderr) => { });



const express = require('express')
const app = express()
const port = 3000

app.get('/close', (req, res) => { 
	right(); res.send() 
	console.log("open")
})

app.get('/open', (req, res) =>  { 
	up();res.send()
	console.log("close")
})

app.listen(port, () => { console.log(`Example app listening on port ${port}`) })
