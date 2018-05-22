export default {
  
  get: function() {
    return {
        created: null,
        title: '',
        description: '',
        photos: null,
        location: {
          id: 0,
          name: '',
          location_type: 0
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
