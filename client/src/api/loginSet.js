import axios from "axios";

export default {
  login: function(profile) {
    
    var objectToSend = {
      username: profile.username,
      password: profile.password,
      csrfmiddlewaretoken: profile.token
    };

    axios.defaults.xsrfCookieName = "csrftoken"
    axios.defaults.xsrfHeaderName = "X-CSRFToken"

    const config = { headers: { 'Content-Type': 'application/json', 'X-CSRFToken': profile.token } };
    console.log('sending')
    console.log(objectToSend)
    axios.post("http://3ee.com:8000/prototype/auth/", JSON.stringify(objectToSend), config)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
