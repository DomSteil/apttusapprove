var nforce = require('nforce'),
    org = require('./auth').org,

    APPROVAL_TOKEN = process.env.APPROVAL_TOKEN;

function execute(req, res) {

    if (req.body.token != APPROVAL_TOKEN) {
        res.send("Invalid token");
        return;
    }



var q = 'SELECT Id, Name, CreatedDate, BillingCity FROM Account WHERE Name = "Venture Industries" LIMIT 1';

org.query({ query: q }, function(err, resp){

  if(!err && resp.records) {

    var acc = resp.records[0];
    acc.set('Name', 'Venture Indusries Software');
    acc.set('Industry', 'Cleaners');

    org.update({ sobject: acc, oauth: oauth }, function(err, resp){
      if(!err) console.log('It worked!');
    });

  }
});

exports.execute = execute;