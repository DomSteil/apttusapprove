var nforce = require('nforce'),
    org = require('./auth').org,

    APPROVAL_TOKEN = process.env.APPROVAL_TOKEN;

function execute(req, res) {

    if (req.body.token != APPROVAL_TOKEN) {
        res.send("Invalid token");
        return;
    }


    var c = nforce.createSObject('Case');
    c.set('origin', 'Slack');
    c.set('status', 'New');
    c.set('type', 'Problem');
    c.set('reason', 'Instructions not clear');


    org.insert({ sobject: c}, function(err, resp) {
        if (err) {
            console.error(err);
            res.send("An error occurred while creating a case");
        } else {
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