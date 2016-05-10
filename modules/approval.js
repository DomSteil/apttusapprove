var nforce = require('nforce'),
    org = require('./auth').org,

    APPROVE_TOKEN = process.env.APPROVE_TOKEN;

function execute(req, res) {

    if (req.body.token != APPROVE_TOKEN) {
        res.send("Invalid token");
        return;
    }

    var params = req.body.text.split(":");
    var iWa = params[0];

    var c = nforce.updateSObject('Approval_Request');
    c.set('iWa', iWa);

    org.insert({ sobject: c}, function(err, resp) {
        if (err) {
            console.error(err);
            res.send("An error occurred while approving the request");
        } else {
            var fields = [];
            fields.push({title: "iWa", value: iWa, short:false});
 
            var message = {
                response_type: "in_channel",
                text: "Quote has been approved",
                attachments: [
                    {color: "#009cdb", fields: fields}
                ]
            };
            res.json(message);
        }
    });
}

exports.execute = execute;