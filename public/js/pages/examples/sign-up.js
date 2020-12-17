$(function () {
    $('#sign_up').validate({
        rules: {
            'company_name':{
                required: true,
                normalizer: function(value) {
                    return $.trim(value);
                }
            },
            'first_name':{
                required: true,
                normalizer: function(value) {
                    return $.trim(value);
                }
            },
            'last_name':{
                required: true,
                normalizer: function(value) {
                    return $.trim(value);
                }
            },
            'email':{
                required: true,
                normalizer: function(value) {
                    return $.trim(value);
                }
            },
            'phone_number':{
                required: true,
                normalizer: function(value) {
                    return $.trim(value);
                }      
            },
            'email':{
                required: true,
                normalizer: function(value) {
                    return $.trim(value);
                }
            },
            'password':{
                required: true,
                normalizer: function(value) {
                    return $.trim(value);
                }
            },
            'confirm':{
                equalTo : "#password",
            },
            'terms': {
                required: true
            },
            'confirm': {
                equalTo: '[name="password"]'
            }
        },
        highlight: function (input) {
            console.log(input);
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.input-group').append(error);
            $(element).parents('.form-group').append(error);
        }
    });

    $('#sign_in').validate({
        rules: {
            'username':{
                required: true,
                normalizer: function(value) {
                    return $.trim(value);
                }
            },
            'password':{
                required: true,
                normalizer: function(value) {
                    return $.trim(value);
                }
            }
        },
        highlight: function (input) {
            console.log(input);
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.input-group').append(error);
            $(element).parents('.form-group').append(error);
        }
    });

    $('#forgot_password').validate({
        rules: {
            'email':{
                required: true,
                normalizer: function(value) {
                    return $.trim(value);
                }
            }
        },
        highlight: function (input) {
            console.log(input);
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.input-group').append(error);
            $(element).parents('.form-group').append(error);
        }
    });

    $('#reset_password').validate({
        rules: {
            'password':{
                required: true,
                normalizer: function(value) {
                    return $.trim(value);
                }
            },
            'confirm':{
                equalTo: '[name="confirm"]'
            },
        },
        highlight: function (input) {
            console.log(input);
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.input-group').append(error);
            $(element).parents('.form-group').append(error);
        }
    });

    

   
});