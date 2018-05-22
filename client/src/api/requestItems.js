import axios from 'axios';
export default{
   
    requestItems: function(){
        return axios.get('/api/items/')
            .then(response => {
                this.items = response.data;
                return{
                    items: response.data
                }
            })
    },
    searchItems: function(search){
        return axios.get('http://3ee.com:8000/api/items/?search=' + search)
        .then(response => {
            this.items = response.data;
            return{
                items: response.data
            }
        })
    },
    get: function(id){
        const isItem = i => i.id === id;
        if(this.items){
            return this.items.find(isItem);
        }

        return null;
        
    }
}