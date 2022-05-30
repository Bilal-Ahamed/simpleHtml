var connection = new Postmonger.Session();
var payload = {};
document.querySelector(window).ready(onRender);
connection.on('initActivity', initialize);
connection.on('clickedNext', save);

function onRender() {
    // Startup Sequence
    connection.trigger('ready');
}

function initialize(data) {
    console.log("Initializing data data: "+ JSON.stringify(data));
    if (data) {
        payload = data;
    }    

    var hasInArguments = Boolean(
        payload['arguments'] &&
        payload['arguments'].execute &&
        payload['arguments'].execute.inArguments &&
        payload['arguments'].execute.inArguments.length > 0
     );

    var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

    console.log('Has In arguments: '+JSON.stringify(inArguments));
}

function save() {
    var formData = {};

    formData.message =document.getElementById('fname').value
    payload['arguments'].execute.inArguments.push(formData);

    payload['metaData'].isConfigured = true;

    connection.trigger('updateActivity', payload);
    console.log('Payload: '+JSON.stringify(payload));
}