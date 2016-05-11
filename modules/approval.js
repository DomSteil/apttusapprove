var nforce = require('nforce'),
    org = require('./auth').org,

    APPROVAL_TOKEN = process.env.APPROVAL_TOKEN;

function execute(req, res) {

    if (req.body.token != APPROVAL_TOKEN) {
        res.send("Invalid token");
        return;
    }

    var params = req.body.text.split(":");
    var subject = params[0];
    var description = params[1];

    var acc = nforce.createSObject('Account');
    acc.Name = 'Spiffy Cleaners';
    acc.Phone = '800-555-2345';
    acc.SLA__c = 'Gold';

    org.insert(acc, oauth, function(err, resp){
    if(!err) console.log('It worked!');

            res.json(message);
        }
    });
}

exports.execute = execute;