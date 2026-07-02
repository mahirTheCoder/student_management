const mongoose = require('mongoose');

const dbConfig = ()=>{

    mongoose.connect('mongodb+srv://management:LCjhehBpkzyuCifi@cluster0.mjewgzf.mongodb.net/hazira?appName=Cluster0').then(()=>{
        console.log('Database connected successfully');
    }).catch((err)=>{
        console.log('Database connection failed');
    });

}

module.exports = dbConfig;
