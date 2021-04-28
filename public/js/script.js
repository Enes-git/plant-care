console.log('sanity :>>');

new Vue({
    el: '#main',
    data: {
        images: [],
        name: '',
        description: '',
        name: '',
        watering: '',
        fertilization: '',
        url: '',
    },

    mounted: function () {
        console.log('main Vue mounted');
        axios
            .get('/plants')
            .then((response) => {
                console.log('response :>> ', response);
                console.log('this.plants :>> ', this.plants);
                console.log('this :>> ', this);
            })
            .catch((err) => console.log('err :>> ', err));
    },

    methods: {
        handleClick: function (event) {
            event.preventDefault();
            console.log('this.name :>> ', this.name);
            console.log('this.description :>> ', this.description);
        },
    },
});
