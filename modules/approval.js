var nforce = require('nforce'),
    org = require('./auth').org,

    APPROVAL_TOKEN = process.env.APPROVAL_TOKEN;

function execute(req, res) {

    if (req.body.token != APPROVAL_TOKEN) {
        res.send("Invalid token");
        return;
    }



var acc = nforce.createSObject('Account');
acc.set('Name', 'Spiffy Cleaners');
acc.set('Phone', '800-555-2345');
acc.set('SLA__c', 'Gold');

org.insert({ sobject: acc, oauth: oauth }, function(err, resp){
  if(!err) console.log('It worked!');
});

exports.execute = execute;