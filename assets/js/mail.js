


var onSuccess = function (response) {
    alert("Success!");
    location.reload();
    console.log(response);
};

var onError = function (err) {
    alert("Error!");
    console.error(err);
};



let loginForm = document.getElementById("contact-form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    var name = document.getElementById('name')
    var message = document.getElementById('message')
    var email = document.getElementById('email')
    var phone = document.getElementById('phone')
    console.log(name.value + " " + message.value + " " + email.value + " " + phone.value)

    sendEmail("https://public.herotofu.com/v1/57929d90-e5ae-11ed-8300-fd92f9e8911a", {
        Name: name.value,
        email: email.value,
        Phone : phone.value,
        Message : message.value,
        date: new Date().toISOString(),
       
    }, onSuccess, onError);
});

// TODO: replace the endpoint url with your own


// The same code as in previous snippet...
function sendEmail(endpointUrl, data, onSuccess, onError) {
    // alert(JSON.stringify(data))
    $.ajax({
        type: "POST",
        url: endpointUrl,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        error: function(xhr, status) {
          if (typeof this.statusCode[xhr.status] !== 'undefined') {
            return false;
          }

          onError(err);
        },
        statusCode: {
          // Endpoint thinks that it's likely a spam/bot request, you need to change "spam protection mode" to "never" in HeroTofu forms
          422: function(response) {
            alert("Cannot send request, are you robot?");
          },
        }
      });
}