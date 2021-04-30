console.log('sanity :>>');

new Vue({
    el: '#main',
    data: {
        images: [],
        plant_name: '',
        plant_type: '',
        description: '',
        watering: '',
        fertilization: '',
        plant_pic_url: '',
        cookie: false,
        file: null,
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
        handleClick: function () {
            console.log('this.plant_name :>> ', this.plant_name);
            console.log('this.description :>> ', this.description);
            var formData = new FormData();
            formData.append('name', this.plant_name);
            formData.append('type', this.plant_type);
            formData.append('description', this.description);
            axios
                .post('/upload', formData)
                .then((response) => {
                    console.log(
                        'response from formData post req :>> ',
                        response
                    );
                })
                .catch((err) =>
                    console.log('err in formData post req :>> ', err)
                );
        },
        handleChange: function (event) {
            console.log('handleChange is running');
            console.log('event.target.files :>> ', event.target.files);
            this.file = event.target.files[0];
        },
    },
});
