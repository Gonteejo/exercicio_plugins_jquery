$(document).ready(function () {
    $.validator.addMethod("cpf", function (value) {

        value = value.replace(/([~!@#$%^&*()_+=`{}\[\]\-|\\:;'<>,.\/? ])+/g, "");

        if (value.length !== 11) {
            return false;
        }

        var sum = 0,
            firstCN, secondCN, checkResult, i;

        firstCN = parseInt(value.substring(9, 10), 10);
        secondCN = parseInt(value.substring(10, 11), 10);

        checkResult = function (sum, cn) {
            var result = (sum * 10) % 11;
            if ((result === 10) || (result === 11)) { result = 0; }
            return (result === cn);
        };

        if (value === "" ||
            value === "00000000000" ||
            value === "11111111111" ||
            value === "22222222222" ||
            value === "33333333333" ||
            value === "44444444444" ||
            value === "55555555555" ||
            value === "66666666666" ||
            value === "77777777777" ||
            value === "88888888888" ||
            value === "99999999999"
        ) {
            return false;
        }

        for (i = 1; i <= 9; i++) {
            sum = sum + parseInt(value.substring(i - 1, i), 10) * (11 - i);
        }

        if (checkResult(sum, firstCN)) {
            sum = 0;
            for (i = 1; i <= 10; i++) {
                sum = sum + parseInt(value.substring(i - 1, i), 10) * (12 - i);
            }
            return checkResult(sum, secondCN);
        }
        return false;

    }, "Por favor, informe um CPF valido");

    jQuery.validator.addMethod("cep", function (value, element) {
        return this.optional(element) || /^[0-9]{5}-[0-9]{3}$/.test(value);
    }, "Por favor, digite um CEP válido");

    jQuery.validator.addMethod('tel', function (value, element) {
        value = value.replace("(", "");
        value = value.replace(")", "");
        value = value.replace("-", "");
        value = value.replace(" ", "").trim();

        if (value == '0000000000') {
            return (this.optional(element) || false);
        } else if (value == '00000000000') {
            return (this.optional(element) || false);
        }
        
        if (["00", "01", "02", "03", , "04", , "05", , "06", , "07", , "08", "09", "10"].indexOf(value.substring(0, 2)) != -1) {
            return (this.optional(element) || false);
        }
        if (value.length < 10 || value.length > 11) {
            return (this.optional(element) || false);
        }
        if (["6", "7", "8", "9"].indexOf(value.substring(2, 3)) == -1) {
            return (this.optional(element) || false);
        }
        return (this.optional(element) || true);
    }, 'Informe um celular válido');

    $("#telefone").mask("(00) 00000-0000");

    $("#cpf").mask("000.000.000-00");

    $("#cep").mask("00000-000");

    $("form").validate({
        rules: {
            nome: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            telefone: {
                required: true,
                tel: true
            },
            cpf: {
                required: true,
                cpf: true
            },
            cep: {
                required: true,
                cep: true
            }
        },
        messages: {
            nome: "Por favor, insira o seu nome"
        }
    })

});
