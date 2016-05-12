var nforce = require('nforce'),
    org = require('./auth').org,

    APPROVAL_TOKEN = process.env.APPROVAL_TOKEN;

function execute(req, res) {

    if (req.body.token != APPROVAL_TOKEN) {
        res.send("Invalid token");
        return;
    }



var q = 'SELECT Id, Slack_Status__c FROM Apttus_Approval__Approval_Request__c WHERE Id = a1vj0000000seJN LIMIT 1';

    org.query(q, oauth, function(err, resp) {

        if(!err && resp.records) {

            var c = resp.records[0];
            c.Slack_Status__c = 'Approved';

            org.update(c, oauth, function(err, resp) {
                if(!err) console.log('We win!');
            });
        }
    };
});

};


exports.execute = execute;