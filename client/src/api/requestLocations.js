import axios from 'axios';
export default{
   
    requestLocations: function(){
        return axios.get('http://3ee.com:8000/api/locations/')
            .then(response => {
                this.items = response.data;
                return{
                    items: response.data
                }
            })
    } 
}