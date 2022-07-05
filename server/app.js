const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
// const mybatisMapper = require('mybatis-mapper')

const dbService = require('./dbService');
// const PORT = process.env.PORT
const PORT = 9298

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }))
app.use(express.static(`${__dirname}/client`))


app.listen(PORT, ()=> console.log(`Server listening on port http://localhost:${PORT} ✔`))

// create
app.post('/insert', (request, response) => {
    const client = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = dbService.insertBanExt(client);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

app.post('/insertFixed', (request, response) => {
    const client = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = dbService.insertFixedBanExt(client);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

// read
app.get('/getAll', async (request, response) => {
    const db = dbService.getDbServiceInstance();
    let result2

    const result = dbService.getAllData();
    try{
        result2 = await dbService.getAllCheckData()    
    } catch(err){
        console.error(err)
    }
    result
    .then(data => response.json({data : data, checkboxData: result2}))
    .catch(err => console.log(err));
})

// update
app.patch('/update', (request, response) => {
    const client = request.body;
    // console.log('이건 전문',client)
    const db = dbService.getDbServiceInstance();

    const result = dbService.updateNameById(client);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:SYS_ID', (request, response) => {
    const { SYS_ID } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = dbService.deleteRowById(SYS_ID);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.get('/search/:FW_EXT_NAME', (request, response) => {
    const { FW_EXT_NAME } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = dbService.searchByName(FW_EXT_NAME);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// app.listen(process.env.PORT, () => console.log('app is running'));
