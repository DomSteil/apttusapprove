var nforce = require('nforce'),
    org = require('./auth').org,

    APPROVAL_TOKEN = process.env.APPROVAL_TOKEN;

function execute(req, res) {

    if (req.body.token != APPROVAL_TOKEN) {
        res.send("Invalid token");
        return;
    }



var querycase = 'SELECT id, Slack_Status__c, iWa__c FROM Apttus_Approval__Approval_Request__c WHERE id = a1vj0000000seJN LIMIT 1';
    //500j000000CpvEDAAZ
    org.query({ query: querycase }, function(err, resp){

        if(!err && resp.records) {

            var c = resp.records[0];
            c.set('iWa__c', 'TRUE');
            c.set('Slack_Status__c', 'Approved');

            org.update({ sobject: c, oauth: oauth }, function(err, resp){
                if(!err) console.log('we win');
            });
        }
    });


exports.execute = execute;