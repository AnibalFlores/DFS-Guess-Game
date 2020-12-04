
// ISPC
// Curso: Desarrollador Full Stack 2020
// Aula/Sala: A 
// Alumno: Flores, Aníbal H.
// Email:  floresanibal@yahoo.com.ar
// Practico Nro.: 3
// Fecha de entrega: 4/12/2020
// Tema: "Colección de figuritas de fútbol"

var guess = {
    /* [ALL THE PLAYERS] */
    form: null, // holds the form itself
    field: null, // holds the word input field
    button: null, // holds the submit button
    help1: null, // holds first help tip
    help2: null, // holds second help tip
    help3: null, // holds third help tip
    alert1: null, // holds tip message 1
    alert2: null, // holds tip message 1
    alert3: null, // holds tip message 1
    counter: null, // holds counter text field
    txt: null, // holds the response text field
    jackpot: null, // the correct answer
    count: 0, // total number of guesses made


    /* [CHECK GIVEN NUMBER] */
    check: function(evt) {
        guess.txt.classList.remove("hit");
        guess.txt.classList.remove("low");
        guess.txt.classList.add("high");
        var name = guess.field.value.toLowerCase();
        
        // is empty?
        if (name == ""){
            text = "¿No has ingresado una respuesta? Calma No es un intento válido. Prueba algo"
        } else { guess.count++; }
        

        // Hit - Update interface
        if (name == guess.jackpot) {
            guess.txt.innerHTML = "Correcto! Has adivinado en " + guess.count + " intentos.";
            guess.txt.classList.remove("low");
            guess.txt.classList.remove("high");
            guess.txt.classList.add("hit");
            guess.field.readOnly = true;
            guess.button.value = "Reiniciar";
            guess.form.removeEventListener("submit", guess.check);
            guess.form.addEventListener("submit", guess.reset);
        }

        // Miss - Give some hints
        else {

            if (guess.count == 1) {
                text = "No te desanimes y vuelve a intentar!";
            }
            
            if (guess.count == 2) {
                guess.help1.style.display = 'inline';
                text = "Haz click en el primer dado de ayuda y vuelve a intentar!";
            }

            if (guess.count == 3) {
                guess.help2.style.display = 'inline';
                text = "Opps! usa los dados de ayuda y reintenta!";
            }

            if (guess.count == 4) {
                alert("Lo sentimos haz agotado tus 4 intentos.");
                guess.txt.classList.remove("hit");
                guess.txt.classList.remove("high");
                guess.txt.classList.add("low");
                guess.field.readOnly = true;
                guess.help1.style.display = "none";
                guess.help2.style.display = "none";
                guess.button.value = "Reiniciar";
                guess.form.removeEventListener("submit", guess.check);
                guess.form.addEventListener("submit", guess.reset);
                text = "Intentos Agotados";

            }
            // document.getElementById('help1').style.display='none'
            // document.getElementById('help1').style.display = 'block'

            // Interface update
            guess.counter.innerHTML = "Intentos: " + (4 - guess.count);
            guess.txt.innerHTML = text;
        }

        // Stop the form from submitting
        evt.preventDefault();
        evt.stopPropagation();
        return false;
    },

    /* [RESET THE GAME] */
    reset: function(evt) {
        guess.count = 0;
        guess.counter.innerHTML = "Intentos: 4";
        guess.txt.innerHTML = "";
        guess.txt.classList.remove("hit");
        guess.field.readOnly = false;
        guess.field.value = "";
        guess.button.value = "Adivinar";
        guess.form.removeEventListener("submit", guess.reset);
        guess.form.addEventListener("submit", guess.check);
        guess.help1.style.display = "none";
        guess.help2.style.display = "none";
        if (guess.isvisible(guess.alert1)) {
            guess.alert1.click();
        }
        if (guess.isvisible(guess.alert2)) {
            guess.alert2.click();
        }
      
        // For the cheaters
        console.log("Respuesta - " + guess.jackpot);

        // Stop the form from submitting
        evt.preventDefault();
        evt.stopPropagation();
        return false;
    },

    isvisible: function(obj) {
        return obj.offsetWidth > 0 && obj.offsetHeight > 0;
    }
};

/* [INIT] */
window.addEventListener("load", function() {
    // Get the HTML elements
    guess.form = document.getElementById("guess-form");
    guess.field = document.getElementById("guess-name");
    guess.button = document.getElementById("guess-btn");
    guess.counter = document.getElementById("counter");
    guess.txt = document.getElementById("guess-txt");
    guess.help1 = document.getElementById('help1');
    guess.help2 = document.getElementById('help2');
    guess.alert1 = document.getElementById('alert1btn');
    guess.alert2 = document.getElementById('alert2btn');

    // Attach on submit event
    guess.form.addEventListener("submit", guess.check);

    guess.jackpot = "cortina";

    // For the cheaters
    console.log("Respuesta - " + guess.jackpot);
});