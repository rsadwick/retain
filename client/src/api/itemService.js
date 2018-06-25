import axios from "axios";

export default {
  url: 'https://3ee.com',
  
  setItem: function(item, token) {
    
    var photos = {};
    if(item.photos){
      photos.photo_guid = item.photos.photo_guid
    }
    
    var objectToSend = {
      title: item.title,
      description: item.description,
      location: {
        id: item.location.id,
        name: item.location.name
      },
      photos: photos,

      csrfmiddlewaretoken: token
    };

    axios.defaults.xsrfCookieName = "csrftoken"
    axios.defaults.xsrfHeaderName = "X-CSRFToken"

    const config = { headers: { 'Content-Type': 'application/json', 'X-CSRFToken': token } };
    console.log(objectToSend)
    return axios.post(this.url + '/api/items/', JSON.stringify(objectToSend), config)
      .then(function(response) {
        return{
          items: response.data
        }
      })
      .catch(function(error) {
        return{
          error: true
        }
      });
  },

  setImage: function(item, token, callback) {
    let photoCallback = callback;
    let formData = new FormData();
    formData.append("input_url", 'testa');
    formData.append("output_url", item.photos.output_url);
    
    axios.defaults.xsrfCookieName = "csrftoken"
    axios.defaults.xsrfHeaderName = "X-CSRFToken"

    const config = { headers: {'accept': 'application/json', 'content-type': 'multipart/form-data' } };

    axios.post(this.url + '/api/photos/', formData, config)
      .then(function(response) {
        photoCallback(response.data)
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

   requestItems: function(){
    return axios.get(this.url + '/api/items/')
        .then(response => {
            this.items = response.data;
            return{
                items: response.data
            }
        })
        .catch(error => {
          console.log(error.response)
          return{
            errors: error.response
          }
        });
    },

    searchItems: function(search){
        return axios.get(this.url + '/api/items/?search=' + search)
        .then(response => {
            return{
                items: response.data
            }
        })
    },

    searchByLocationType: function(type){
      if(!type){
        type = 1;
      }
      return axios.get(this.url + '/api/locations/?search=' + type)
        .then(response => {
            return{
                items: response.data
            }
        })
        .catch(function(error) {
          return{
            error: true
          }
        });
    },

    getByCacheFromId: function(id){
        const isItem = i => i.id === id;
        if(this.items){
            return this.items.find(isItem);
        }

        return null;  
    },

  requestItemById: function(id){
       
    return axios.get(this.url + '/api/items/' + id)
        .then(response => {
            this.item = response.data;
            return{
                item: response.data
            }
        })
    },

    requestLocations: function(){
        return axios.get(this.url + '/api/locations/')
            .then(response => {
                this.items = response.data;
                return{
                    items: response.data
                }
            })
    }, 

  getCsrfCookie: function(name) {
    if (!document.cookie) {
        return null;
      }
      const token = document.cookie.split(';')
        .map(c => c.trim())
        .filter(c => c.startsWith(name + '='));
  
      if (token.length === 0) {
        return null;
      }
      return decodeURIComponent(token[0].split('=')[1]);
  },

  getCsrfServerSide: function(){
    return axios.get(this.url + '/prototype/token/')
      .then(response => {
          console.log(response.data);
          return {
            items: response.data
         }
          
      })
      .catch(function(error) {
        return{
          error: true
        }
      });
  },

  deleteItem: function(id, profile){

    var objectToSend = {
      csrfmiddlewaretoken: profile.token
    };

    axios.defaults.xsrfCookieName = "csrftoken"
    axios.defaults.xsrfHeaderName = "X-CSRFToken"

    const config = { headers: { 'Content-Type': 'application/json', 'X-CSRFToken': profile.token } };

    return axios.delete(this.url + '/api/items/' + id, JSON.stringify(objectToSend), config)
      .then(response => {
          return{
              items: response.data
          }
      })
      .catch(function(error) {
        return{
          error: true
        }
      });
  },

  login: function(profile, isCordova) {
    var objectToSend = {
      username: profile.username,
      password: profile.password,
      csrfmiddlewaretoken: profile.token
    };

    axios.defaults.xsrfCookieName = "csrftoken"
    axios.defaults.xsrfHeaderName = "X-CSRFToken"

    const config = { headers: { 'Content-Type': 'application/json', 'X-CSRFToken': profile.token } };

    return axios.post(this.url + '/prototype/auth/', JSON.stringify(objectToSend), config)
    .then(function(response) {
        return response;
    })
    .catch(function(error) {
        console.log("error");
    });
  },

  logout: function(){
    return axios.get(this.url + '/prototype/logout')
      .then(response => {
          return response.data 
      })
  },

  signup: function(profile){
    var objectToSend = {
      email: profile.email,
      username: profile.username,
      password: profile.password,
      csrfmiddlewaretoken: profile.token
    };

    axios.defaults.xsrfCookieName = "csrftoken"
    axios.defaults.xsrfHeaderName = "X-CSRFToken"

    const config = { headers: { 'Content-Type': 'application/json', 'X-CSRFToken': profile.token } };

    axios.post(this.url + '/api/users/', JSON.stringify(objectToSend), config)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getLocationTypeByName: function(id, array){
    for(var i = 0; i < array.length; i++){
      if(array[i].id === id){
        return array[i].name
      }
    }
  }

};