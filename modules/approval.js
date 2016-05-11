var nforce = require('nforce'),
    org = require('./auth').org,

    APPROVAL_TOKEN = process.env.APPROVAL_TOKEN;

function execute(req, res) {

    if (req.body.token != APPROVAL_TOKEN) {
        res.send("Invalid token");
        return;
    }

    var params = req.body.text.split(":");
   // var subject = params[0];
   // var description = params[1];

    var c = nforce.createSObject('Apttus_Approval__Approval_Request__c');
    c.set('Apttus_Approval__Date__c', '5/10/2016 10:31 AM');



    org.insert({ sobject: c}, function(err, resp) {
        if (err) {
            console.error(err);
            res.send("An error occurred while creating a case");
        } else {
           // var fields = [];
           // fields.push({title: "Subject", value: subject, short:false});
           // fields.push({title: "Description", value: description, short:false});
          //  fields.push({title: "Link", value: 'https://login.salesforce.com/' + resp.id, short:false});
            var message = {
                response_type: "in_channel",
                text: "A new case has been created:",
                attachments: [
                    {color: "#009cdb", fields: fields}
                ]
            };
            res.json(message);
        }
    });
}

exports.execute = execute;