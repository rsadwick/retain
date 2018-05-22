import axios from "axios";

export default {
  setUrl: function(url){
    this.url = url;
  },
  get: function(name) {
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

  getServerSide: function(){
    return axios.get(this.url + '/prototype/token/')
      .then(response => {
          console.log(response.data);
          return {
            items: response.data
         }
          
      })
  }
};
