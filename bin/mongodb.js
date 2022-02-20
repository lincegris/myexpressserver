var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dn2022', {useNewUrlParser: true}, function (error) {
    if (error) {
        throw error;
    } else {
        console.log('Conectado a MongoDB');
    }
});
module.exports = mongoose;