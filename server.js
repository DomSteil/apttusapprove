var express = require('express'),
    bodyParser = require('body-parser'),
    auth = require('./modules/auth'),
    approval = require('./modules/approval'),
    app = express();

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.urlencoded({extended: true}));

app.post('/approval', approval.execute);


app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
    auth.login();
});