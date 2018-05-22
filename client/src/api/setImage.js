import axios from "axios";

export default {
  setImage: function(item, token, callback) {
    console.log(callback)
    let photoCallback = callback;
    let formData = new FormData();
    formData.append("input_url", 'testa');
    formData.append("output_url", item.photos.output_url);
    
    axios.defaults.xsrfCookieName = "csrftoken"
    axios.defaults.xsrfHeaderName = "X-CSRFToken"

    const config = { headers: {'accept': 'application/json', 'content-type': 'multipart/form-data' } };

    axios.post("http://3ee.com:8000/api/photos/", formData, config)
      .then(function(response) {
        photoCallback(response.data)
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

};
