/**
 * Created by kraisorna on 3/6/2017 AD.
 */
var SMSBip = require('smsbip');
var sms = new SMSBip('username', 'password');
//get account balance
sms.getBalance()
    .then(function (response) {
    console.log(response.body);
}).catch(function (err) {
    console.error(err);
});
//get message preview
sms.getPreview('Hello, guys!')
    .then(function (response) {
    console.log(response.body);
}).catch(function (err) {
    console.error(err);
});
//send single textual message
// send to one destination
sms.sendOne('GLOBALSMS', '66840807974', 'Hello!')
    .then(function (response) {
    console.log(response.body);
}).catch(function (err) {
    console.error(err);
});
// send to multiple destinations
/*let destinations = ['66840807974', '66863970301'];
sms.sendOne('GLOBALSMS', destinations, 'Hello!')
    .then(function(response) {
        console.log(response.body);
    }).catch(function(err) {
    console.error(err);
});

//send multiple textual message
 sms.sendMulti({
        messages: [{
            from: 'GLOBALSMS',
            to: '66840807974',
            text: 'Hello, myself!'
        }, {
            from: 'INFOSMS',
            to: '66863970301',
            text: 'Hello, brother!'
        }]
    }).then(function(response) {
        console.log(response.body);
    }).catch(function(err) {
        console.error(err);
    });*/
//get delivery reports
sms.getReports('bulkId', 'messageId', 100)
    .then(function (response) {
    console.log(response.body);
}).catch(function (err) {
    console.error(err);
});
