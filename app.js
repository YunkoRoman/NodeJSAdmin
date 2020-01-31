const express = require('express');
const path = require('path');
const cors = require('cors');



const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods","GET, HEAD, OPTIONS, POST, PUT, DELETE, PATCH");
    next();
});

app.use(cors());
app.options('*', cors());

const dataBase = require('./dataBase').getInstance();

const {orderRoutes,authRoutes} = require('./routes');

dataBase.setModels();


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/order', orderRoutes);
app.use('/auth', authRoutes);



app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err)
});

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            success: false,
            message: err.message || 'Unknown Error',
            controller: err.controller
        })
});

app.listen(3001, err => {
    if (err) console.error(err);
    console.log('Server listen on port 3001');
});