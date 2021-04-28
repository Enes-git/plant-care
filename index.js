const express = require('express');
const app = express();

app.use(express.static('public'));

const plants = [
    {
        id: 1,
        name: 'Orchid',
        url: '#',
        watering: 'once a week',
        fertilization: 'once a month',
    },
    {
        id: 2,
        name: 'Tulip',
        url: '#',
        watering: 'twice a week',
        fertilization: 'twice a month',
    },
    {
        id: 3,
        name: 'Cactus',
        url: '#',
        watering: 'once a year',
        fertilization: 'twice a year',
    },
];

app.get('/plants', (req, res) => {
    console.log('hit the get route');
    res.json(plants);
});

app.listen(8080, () => console.log('index.js running'));
