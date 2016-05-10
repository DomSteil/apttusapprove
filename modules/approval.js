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

    var a = nforce.createSObject('Approval');
    a.set('Approval Status', status);
    a.set('Comment', comment);


    org.insert({ sobject: c}, function(err, resp) {
        if (err) {
            console.error(err);
            res.send("An error occurred while approving the quote");
        } else {
            var fields = [];
            fields.push({title: "Approval Status", value: subject, short:false});
            fields.push({title: "Comment", value: description, short:false});
            fields.push({title: "Link", value: 'https://login.salesforce.com/' + resp.id, short:false});
            var message = {
                response_type: "in_channel",
                text: "Quote has been approved:",
                attachments: [
                    {color: "#009cdb", fields: fields}
                ]
            };
            res.json(message);
        }
    });
}

exports.execute = execute;