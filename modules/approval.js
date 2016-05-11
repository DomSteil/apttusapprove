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

    var querycase = 'SELECT id, Name, Type FROM Case WHERE id= 500j000000CpvEDAAZ';
    //500j000000CpvEDAAZ
    org.query({
        query: querycase;

    }), function(err, resp){
        if(!err && resp.records){
            var c = resp.records[0];
            c.set('type', 'Problem');

            org.update({sobject: c, oauth: oauth}, function(err, resp){
                if(!err) console.log('we win');
                });
            }
        }
    

    }


    /*var c = nforce.updateSObject('Case');
    c.set('subject', subject);
    c.set('description', description);
    c.set('origin', 'Slack');
    c.set('status', 'New');
    c.set('type', 'Question');
    c.set('reason', 'Instructions not clear');
    
    org.insert({ sobject: c}, function(err, resp) {
        if (err) {
            console.error(err);
            res.send("An error occurred while creating a case");
        } else {
            var fields = [];
            fields.push({title: "Subject", value: subject, short:false});
            fields.push({title: "Description", value: description, short:false});
            fields.push({title: "Link", value: 'https://login.salesforce.com/' + resp.id, short:false});
            var message = {
                response_type: "in_channel",
                text: "A new case has been created:",
                attachments: [
                    {color: "#009cdb", fields: fields}
                ]
            };
            res.json(message);
        }
    });*/
}

exports.execute = execute;