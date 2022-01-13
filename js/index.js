
// Declaramos variables 
let celsius = 50;
let fahrenheit = 122;
let modelo = null;

// verificamos para cargar los datos
$( document ).ready( () => {

    // cargamos nuestro modelo
    (async () => {
        console.log("Loading IA...");
        modelo = await tf.loadLayersModel("model.json");
        console.log("IA is ready...");
    })();

    // mostramos valores por defecto en el HTML
    document.getElementById("Celsius").innerHTML= celsius;
    document.getElementById("Fahrenheit").innerHTML= fahrenheit;
    document.getElementById("dataSelect").innerHTML= celsius + " °C";
});

// captamos los valores cuando cambia el valor del range
$("#input").on("change keyup paste click propertychange mousedown", () => {
    // Obtenemos el valor de celsius a comvertir
    celsius = parseFloat($("#input").val());
    document.getElementById("Celsius").innerHTML= celsius;
    document.getElementById("dataSelect").innerHTML= $("#input").val()+" °C";

    if(modelo){
        let tensor = tf.tensor1d([parseFloat(celsius)]);
        let prediccion = modelo.predict(tensor).dataSync();
        prediccion = Math.round(prediccion);
        console.log(prediccion);
        document.getElementById("Fahrenheit").innerHTML = prediccion;
    }
    
});

