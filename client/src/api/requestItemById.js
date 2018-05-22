import axios from 'axios';
export default{
   
    requestItemById: function(id){
       
        return axios.get('http://3ee.com:8000/api/items/' + id)
            .then(response => {
                this.item = response.data;
                return{
                    item: response.data
                }
            })
    }
}