//var config = require("../../config/config");
//const _url = config[process.env.ENV].url.reset_password;

$("form").submit(function (e) {
    var form = $(this);
    var p1 = $("#inputPassword").val(),
        p2 = $("#inputPassword2").val();
    $("#submit").html(
        `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
    );
    $("#submit").prop("disabled", true);
    if (p1 == p2) {
        console.log(p1);
        _url = String(window.location).split("/");
        _t = _url.pop().split("?");
        _code = _t[0];
        $.ajax({
            type: "POST",
            url: window.location,
            data: { code: _code, password: p1 },
            success: function (msg) {
                console.log(msg);
            },
        });
        $("#alert").removeClass("hidden");
        $("#alert").removeClass("alert-danger");
        $("#alert").addClass("alert-success");
        $("#alert").html("Password change successful. Please sign in.");
        $("#alert").alert();
        $("#submit").html(`Change password`);
        $("#submit").prop("disabled", false);
    } else {
        $("#alert").removeClass("hidden");
        $("#alert").alert();
        $("#submit").html(`Change password`);
        $("#submit").prop("disabled", false);
    }

    return false;
});

(function () {
    "use strict";
    window.addEventListener(
        "load",
        function () {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName("needs-validation");
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(
                forms,
                function (form) {
                    form.addEventListener(
                        "submit",
                        function (event) {
                            if (form.checkValidity() === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                            form.classList.add("was-validated");
                        },
                        false
                    );
                }
            );
        },
        false
    );
})();
