$(document).ready(function() {
    $('#generate100').on('click', function() {
        for (let i = 0; i < 100; i++) {
            let generatedCode = makeCode();
            if (!checkIfExists(generatedCode)) {
                send(generatedCode);
            }
        }
    });

    $('#generate500').on('click', function() {
        for (let i = 0; i < 500; i++) {
            let generatedCode = makeCode();
            if (!checkIfExists(generatedCode)) {
                send(generatedCode);
            }
        }
    });

    $('#generate1000').on('click', function() {
        for (let i = 0; i < 1000; i++) {
            let generatedCode = makeCode();
            if (!checkIfExists(generatedCode)) {
                send(generatedCode);
            }
        }
    });

    $('#codeDoc').on('click', function() {
        get();
    });

    function send(code) {
        let request = new XMLHttpRequest();
        request.open('GET', 'https://datas.experience.dorcel.com/api/fr/40/verify/kelkun-du-54@hotmail.fr/' + code, true);

        request.onload = function() {
            let data = (JSON.parse(this.response));

            if (data.image.includes('ILLIMITE')) {
                alert(code + ' est un code ILLIMITE !!!');
                $('#logging').prepend("<div id='" + code +"' class='alertBox alert-success'>Le code " + code + " est illimité.</div>");
            } else if (data.image.includes('MOIS')) {
                $('#logging').prepend("<div id='" + code +"' class='alertBox alert-info'>Le code " + code + " est disponible pour 1 mois.</div>");
            } else if (data.image.includes('SEMAINE')) {
                $('#logging').prepend("<div id='" + code +"' class='alertBox alert-warning'>Le code " + code + " est disponible pour 1 semaine.</div>");
            } else if (data.image.includes('48H')) {
                $('#logging').prepend("<div id='" + code +"' class='alertBox alert-danger'>Le code " + code + " est disponible pour 48h.</div>");
            } else {
                $('#logging').prepend("<div id='" + code +"' class='alertBox alert-dark'>Le code " + code + " est a vérifier.</div>");
            }
        };

        request.send();
    }

    function get() {
        let request = new XMLHttpRequest();
        request.open('GET', 'https://api.sheety.co/0afbb4ec-01a2-4be6-a9d9-712eda79e3ea', true);

        request.onload = function() {
            let data = (JSON.parse(this.response));

            data.forEach(code => {
                if (!checkIfExists(code.code)) {
                    send(code.code);
                }
            })
        };

        request.send();
    }
});

function makeCode() {
    return makeNumber() + makeChar();
}

function checkIfExists(code) {
    if ($('#' + code).length === 0) return false;
    else return true;
}

function makeNumber() {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < 2; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function makeChar() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;

    for ( var i = 0; i < 3; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
