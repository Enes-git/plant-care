const express = require('express');
const app = express();

app.use(express.static('public'));

const plants = [
    {
        id: 1,
        name: 'Orchid',
        url:
            'https://www.gardeningknowhow.com/wp-content/uploads/2014/01/vanda-orchid.jpg',
        watering: 'once a week',
        fertilization: 'once a month',
    },
    {
        id: 2,
        name: 'Tulip',
        url:
            'https://www.photos-public-domain.com/wp-content/uploads/2012/04/pink-tulip-with-one-petal-open.jpg',
        watering: 'twice a week',
        fertilization: 'twice a month',
    },
    {
        id: 3,
        name: 'Cactus',
        url:
            'https://succulentcity.com/wp-content/uploads/2019/05/parodia-magnifica-cactus-sc-1024x1024.jpg',
        watering: 'once a year',
        fertilization: 'twice a year',
    },
];

app.get('/plants', (req, res) => {
    console.log('hit the get route');
    res.json(plants);
});

app.listen(8080, () => console.log('index.js running'));
