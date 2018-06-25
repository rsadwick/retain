export default {
  
  get: function() {
    return {
        created: null,
        title: '',
        description: '',
        photos: null,
        location: {
          id: 0,
          name: 'Aft deck',
          location_type: '1'
        },
        owner: '',
        id: 0,
        token: '',
        isMarkedForDelete: false,
        isDeleted: false,
        isSaved: false
      };
  }
};
