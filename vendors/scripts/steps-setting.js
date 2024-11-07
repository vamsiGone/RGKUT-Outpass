var form = $(".wizard");
form.validate({
	errorPlacement: function (error, element) {
		error.insertBefore(element.closest('.form-group'));
	},
	rules: {
		student_id: {
			required: true,
			minlength: 6
		},
		email: {
			required: true,
			email: true
		},
		password: {
			required: true,
			minlength: 6
		},
		full_name: {
			required: true,
			minlength: 3
		},
		phone: {
			required: true,
			minlength: 10,
			pattern: /^[0-9]{10}$/
		},
		guardian_contact: {
			required: true,
			pattern: /^[0-9]{10}$/
		},
		address: {
			required: true
		},
		guardian_address: {
			required: true
		}
	},
	messages: {

	}
});

form.steps({
	headerTag: "h5",
	bodyTag: "section",
	transitionEffect: "fade",
	titleTemplate: '<span class="step">#index#</span> <span class="info">#title#</span>',
	labels: {
		finish: "Register",
		next: "Next",
		previous: "Previous",
	},
	onStepChanging: function (event, currentIndex, newIndex) {
		// Allow moving backward without validation
		if (newIndex < currentIndex) {
			return true;
		}

		// Validate when moving forward
		form.validate().settings.ignore = ":disabled,:hidden";
		return form.valid();
	},
	onStepChanged: function (event, currentIndex, newIndex) {
		// Update the review section when reaching the final step
		if (newIndex === 2 && currentIndex===3) {
			var reviewContent = `
				<li><div class="row"><div class="col-sm-4 weight-600">Student Id</div><div class="col-sm-8">${$('input[name="student_id"]').val()}</div></div></li>
				<li><div class="row"><div class="col-sm-4 weight-600">Email Address</div><div class="col-sm-8">${$('input[name="email"]').val()}</div></div></li>
				<li><div class="row"><div class="col-sm-4 weight-600">Full Name</div><div class="col-sm-8">${$('input[name="full_name"]').val()}</div></div></li>
				<li><div class="row"><div class="col-sm-4 weight-600">Phone Number</div><div class="col-sm-8">${$('input[name="phone"]').val()}</div></div></li>
				<li><div class="row"><div class="col-sm-4 weight-600">Parent / Guardian Contact Number</div><div class="col-sm-8">${$('input[name="guardian_contact"]').val()}</div></div></li>
			`;
			$("#review-info").html(reviewContent);
		}
	},
	onFinishing: function (event, currentIndex) {
		form.validate().settings.ignore = ":disabled";
		return form.valid();
	},
	onFinished: function (event, currentIndex) {
		form.validate().settings.ignore = ":disabled";
		if (form.valid()) {
			$('#success-modal').modal('show');
		}
	}
});
