import axios from "axios";

export default {
  setItem: function(item, token) {
    console.log(token)
    var objectToSend = {
      title: item.title,
      description: item.description,
      location: {
        id: item.location.id,
        name: item.location.name
      },
      photos: {
        photo_guid: item.photos.photo_guid
      },

      csrfmiddlewaretoken: token

    };

    axios.defaults.xsrfCookieName = "csrftoken"
    axios.defaults.xsrfHeaderName = "X-CSRFToken"

    const config = { headers: { 'Content-Type': 'application/json', 'X-CSRFToken': token } };
    console.log(objectToSend)
    axios.post("http://3ee.com:8000/api/items/", JSON.stringify(objectToSend), config)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};