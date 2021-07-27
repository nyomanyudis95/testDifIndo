const express = require('express');
const https = require('https');
// const http = require('http');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let { jumlah, halaman } = req.body;
    if (jumlah == null) jumlah = 2;
    if (halaman == null) halaman = 1;
    // const options = {
    //   host: 'https://60ee7679eb4c0a0017bf442f.mockapi.io/articles?page=1&limit=2',
    //   path: '/articles?page=1&limit=2',
    //   method: 'GET',
    // };

    await https.get(`https://60ee7679eb4c0a0017bf442f.mockapi.io/articles?page=${halaman}&limit=${jumlah}`, (resHttp) => {
      console.log(`statusCode: ${resHttp.statusCode}`);

      resHttp.on('data', (data) => {
        const dataJSON = JSON.parse(data);
        // console.log('dataJSON', dataJSON);
        const dataParsingtoIndo = [];
        dataJSON.items.forEach((element) => {
          const tempData = {
            tanggal_buat: element.createdAt,
            nama_pembuat: element.author,
            avatar: element.avatar,
            judul: element.title,
            konten: element.content,
            id: element.id
          };
          dataParsingtoIndo.push(tempData);
        });
        res.status(200).send({
          data: dataParsingtoIndo
        });
      });
    });

    // res.send('Ini adalah artikel');
  } catch (err) {
    res.status(404).send({
      status: 'failed',
      error: err
    });
  }
});

module.exports = router;
