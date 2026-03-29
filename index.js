const express = require('express');
const crypto = require('crypto');
const app = express();
app.use(express.json());


let blockchain = [];

function spocitejHash(index, data, predchoziHash) {
    return crypto.createHash('sha256')
        .update(index + data + predchoziHash)
        .digest('hex');
}


const genesisBlok = {
    index: 0,
    data: "Prvni blok",
    predchoziHash: "0",
    hash: spocitejHash(0, "Prvni blok", "0")
};
blockchain.push(genesisBlok);


app.get('/bloky', (req, res) => {
    res.send(blockchain);
});


app.post('/pridat', (req, res) => {
    const data = req.body.data;
    const posledniBlok = blockchain[blockchain.length - 1];
    const novyIndex = posledniBlok.index + 1;
    
    const novyBlok = {
        index: novyIndex,
        data: data,
        predchoziHash: posledniBlok.hash,
        hash: spocitejHash(novyIndex, data, posledniBlok.hash)
    };

    blockchain.push(novyBlok);
    res.send("Blok pridan!");
});

app.listen(3000, () => console.log("Server jede na portu 3000"));