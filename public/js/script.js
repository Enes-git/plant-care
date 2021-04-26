new Vue({
	el: "#main-container",
	data: {
		cookie: false,
	},
	mounted: function () {
		console.log("#main-container has mounted!");
	},
	methods: {
		handleRegisterClick: function (event) {
			console.log("handleRegisterClick");
		},
	},
});
