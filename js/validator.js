// JavaScript Validación
$(function () {
    // Validación para campos de texto exclusivo, sin caracteres especiales ni números
    var nameregex = /^[a-zA-Z ñÑ]+$/;

    $.validator.addMethod("validname", function (value, element) {
        return this.optional(element) || nameregex.test(value);
    });

    // Máscara para validación de Email
    var eregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    $.validator.addMethod("validemail", function (value, element) {
        return this.optional(element) || eregex.test(value);
    });

    $("#formulario-contacto").validate({

        rules:
        {
            nombre: {
                required: true,
                minlength: 4,
                validname: true
            },
            apellido: {
                required: true,
                minlength: 4,
                validname: true
            },
            email: {
                required: true,
                validemail: true
            },
            mensaje: {
                required: false,
                minlength: 20,
                maxlength: 300
            },
            ltc: {
                required: true,
            }
        },
        messages:
        {
            nombre: {
                required: "Tu Nombres son Importantes",
                minlength: "Tu Nombre es demasiado corto"
            },
            apellido: {
                required: "Tus Apellidos son Importantes",
                minlength: "Tu Apellido es demasiado corto"
            },
            email: {
                required: "Por Favor, introduzca una dirección de correo",
                validemail: "Introduzca correctamente su correo"
            },
            mensaje: {
                required: "Tu Nombre y/o Apellidos son Importantes",
                minlength: "Tu Mensaje es demasiado corto",
                maxlength: "Tu Mensaje supera los 300 caracteres"
            },
            ltc: {
                required: "Debes aceptar Licencia y Condiciones"
            },
        },
        errorPlacement: function (error, element) {
            $(element).closest('.form-group').find('.help-block').html(error.html());
        },
        highlight: function (element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
            $(element).closest('.form-group').find('.help-block').html('');
        },

        submitHandler: function (form) {
            form.action = "";
            form.submit();
            alert('ok');
        }
    });
})