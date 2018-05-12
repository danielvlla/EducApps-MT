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
            if(element.prop("type") === "radio") {
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

    $.validator.addMethod("spacesInName", function(value, element) {
        return this.optional(element) || value == value.match(/^[a-zA-Z\s]+$/);
    });

    $(".register-form").validate({
        rules: {
            firstname: {
                required: true,
                spacesInName: true,
                minlength: 2
            },
            lastname: {
                required: true,
                spacesInName: true,
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
                spacesInName: "Only include characters",
                minlength: "Your name must be longer than 2 letters"
            },
            lastname: {
                required: "Surname is required",
                spacesInName: "Only include characters",
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
            },
            password: {
                required: "Password required to login"
            }
        }
    });

    $(".login-form-new").validate({
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
            },
            password: {
                required: "Password required to login"
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

    $(".suggestion-new").validate({
        rules: {
            suggestionTitle: {
                required: true,
                maxlength: 100
            },
            category: {
                required: true
            },
            suggestionDescription: {
                required: true
            }
        },
        messages: {
            suggestionTitle: {
                required: "Name of your idea is required.",
                maxLength: "Exceed the 100 characters"
            },
            category: {
                required: "Category is required"
            },
            suggestionDescription: {
                required: "Provide a short description of your idea."
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