$( document ).ready(function() {

	console.log('Starting SpeechRecognition library.');
	var speech = new SpeechRecognition();

    speech.recognition.onstart = function() {
		$('#record').text("Stop");
		$('#record').val("false");
		$('#status').text("Listening...");
    	console.log('Listening started...');
    }

	speech.recognition.onend = function() {
		$('#record').text("Record");
		$('#record').val("true");
		$('#status').text("Idle");
    	console.log('Listening stopped.');
    }

	$('#record').click(function(){
		if ($('#record').val() == "true") {
			speech.startCapture();
		}
		else {
			speech.stopCapture();
		}
	});
});