function SpeechRecognition() {
  if ('webkitSpeechRecognition' in window) {
    // setup
    this.recognition = new webkitSpeechRecognition();

    // config
    this.recognition.continuous = false;
    this.recognition.interimResults = true;

    this.startCapture = function () {
      this.recognition.start();
    }

    this.stopCapture = function () {
      this.recognition.stop();
    }

    this.recognition.onresult = function (event) {
      // get translated text
      var result = event.results[0][0].transcript;
      console.log(result);

      // add it to the DOM
      $('#output').text(result);
      $("#output").prepend("<p class='heading'>Text:</p>");

      // sent it to Microsoft's TextAnalytics API for Named Entity Recognition
      var result = result;
      var resultToJSON = { 'documents': [{ 'id': '1', 'text': result }] };
      var reqBody = JSON.stringify(resultToJSON);

      function showEntity(entity) {
        $("#entities").append("<p>" + entity.name + ", type: " + entity.type + ", info: " + entity.wikipediaUrl + "</p>");
      }

      $(function () {
        $.ajax({
          url: "https://uksouth.api.cognitive.microsoft.com/text/analytics/v2.1/entities",
          beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "58f4db9a14cd47449139b480a72516c2");
          },
          type: "POST",
          data: reqBody,
        })
          .done(function (data) {
            console.log(data);
            var entities = data.documents[0].entities;
            $("#entities").text("");
            $("#entities").append("<p class='heading'>Named Entities Found:</p>");
            entities.forEach(showEntity);
          })
          .fail(function () {
            console.log("error");
          });
      });
    }

    this.recognition.onerror = function (event) {
      console.log(event.error);
    }
  } else {
    console.log("webkitSpeechRecognition is not available.");
  }
}
