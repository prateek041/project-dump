const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config({ path: '../config/config.env' });
const https = require('https')


// const getCoordinates = () => {
//     axios.get(`https://atlas.microsoft.com/search/address/json?&subscription-key=${process.env.GEOCODER_API_KEY}&api-version=1.0&language=en-US&query=400 Broad St, Seattle, WA 98109`,
//     ).then((res) => {
//         console.log(res);
//     }).catch((error) => {
//         console.log(error);
//     })
// }

// module.exports = getCoordinates;

https
    .get(`https://atlas.microsoft.com/search/address/json?&subscription-key=${process.env.GEOCODER_API_KEY}&api-version=1.0&language=en-US&query=400 Broad St, Seattle, WA 98109`, res => {
        let data = "";

        res.on('data', chunk => {
            data += chunk;
        });

        res.on('end', () => {
            let url = JSON.parse(data);
            console.log(url);
        });
    })
    .on('error', err => {
        console.log(err.msg);
    })