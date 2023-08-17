import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const continents = new Map();
const money = new Map();
axios.get(process.env.ALL_CONTINENTS)
.then((response)=>{
    const data = response.data;
    for (let c of data) {
        continents.set(c.sCode, c.sName);
    }
})
.catch((error)=>{
    console.log(error);
});

export {continents, money};

// uso maps porque entendi que no hay que usar bases de datos y redis lo considero como una base de datos, asi que cacheo la data esta en memoria.

