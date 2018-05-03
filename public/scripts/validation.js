$(function(){

    $.validator.setDefaults({
        errorClass: "invalid-feedback",
        highlight: function(element){
            $(element)
                .closest(".form-control")
                .addClass("is-invalid");
        },
        unhighlight: function(element){
                $(element)
                    .closest(".form-control")
                    .removeClass("is-invalid");
        },
        errorPlacement: function(error, element){
            if(element.prop("type") === "checkbox") {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $.validator.addMethod("strongPassword", function(value, element){
        return this.optional(element)
            || value.length >= 6
            && /\d/.test(value)
            && /[a-z]/i.test(value);
    }, "Use at least 6 characters. Include both a digit and a character");

    $(".register-form").validate({
        rules: {
            firstname: {
                required: true,
                lettersonly: true,
                minlength: 2
            },
            lastname: {
                required: true,
                lettersonly: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true,
                minlength: true,
            },
            password: {
                required: true,
                nowhitespace: true,
                strongPassword: true
            },
            password2: {
                required: true,
                equalTo: "#password"
            }
        },
        messages: {
            firstname: {
                required: "First name is required",
                lettersonly: "Only include characters",
                minlength: "Your name must be longer than 2 letters"
            },
            lastname: {
                required: "Surname is required",
                lettersonly: "Only include characters",
                minlength: "Your surname must be longer than 2 letters"
            },
            email: {
                required: "E-mail is required",
                email: "Please enter a <em>valid</em> e-mail address."
            },
            password: {
                required: "Password is required",
                nowhitespace: "No spaces allowed in your password"
            },
            password2: {
                required: "Re-type your password",
                equalTo: "Passwords must match"
            }
        }
    });

    $(".login-form").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        messages: {
            email: {
                required: "E-mail address is required to login",
                email: "Please enter a <strong>valid</strong> e-mail address."
            }
        }
    });

    $(".app-new").validate({
        rules: {
            appUrl: {
                required: true
            },
            category: {
                required: true
            }
        },
        messages: {
            appUrl: {
                required: "URL is required to get its data"
            },
            category: {
                required: "Category is required"
            }
        }
    });

    $(".review-new").validate({
        rules: {
            title: {
                required: true,
            },
            description: {
                required: true,
            }
        },
        messages: {
            title: {
                required: "Review title is required"
            },
            description: {
                required: "Review is required"
            }
        }
    });
});