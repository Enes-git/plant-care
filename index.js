const express = require('express');
const app = express();
exports.app = app;
const cookieSession = require('cookie-session');
// const db = require('./db_petition');
const csrf = require('csurf');
const authRoutes = require('./auth_routes');
const { requireLoggedInUser } = require('./middleware');

app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(`MIDDLEWARE LOG : ${req.method} to ${req.url} route`);
    next();
});

let secret;
if (process.env.SECRET) {
    secret = process.env.SECRET;
} else {
    secret = require('./secret.json').secret;
}
app.use(express.static('public'));

app.use(
    cookieSession({
        secret: secret,
        maxAge: 1000 * 60 * 60 * 24 * 14, //two weeks
    })
);
app.use(express.urlencoded({ extended: false }));

app.use(csrf());
app.use(authRoutes.router);

// ===== just a dummy EXAMPLE ================
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
// ===========================================

app.get('/plants', (req, res) => {
    console.log('hit the get route');
    res.json(plants);
});

app.post('/upload', (req, res) => {
    console.log('the post route is on');
    console.log('req.body :>> ', req.body);
});

app.listen(8080, () => console.log('index.js running'));
