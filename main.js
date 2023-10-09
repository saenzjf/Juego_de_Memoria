//Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let tiempoRegresivoId = null;

//Apuntando a documento HTML
let mostrarMovimiento = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//Gneracion numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
//Sort espera un numero positivo, negativo o cero. Y en funcion de esto ubica los numeros
//Al usar sort con una funcion flecha, sort le pasa automaticamente 2 elementos del array como parametros, luego Math devuelve un numero y en funcion de este se decide como organizar los 2 elementos recibidos al inicio
numeros = numeros.sort(()=>{return Math.random() - 0.5});
console.log(numeros);

//Funciones
function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer = timer - 1;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`

        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }
    }, 1000);
}

function bloquearTarjetas(){
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;

        loserStyle();
        mostrarTiempo.innerHTML = `Se acabó el tiempo😭😭`;
        
    }
}

function loserStyle() {
    const sheet = new CSSStyleSheet();
    sheet.insertRule(`button:disabled{
        background-color: rgba(255, 0, 0, 0.836);
    }`);
    document.adoptedStyleSheets = [sheet];
  }


//Funcion principal
function destapar(id) {

    //Para llamar una sola vez al timer
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1) {
        //mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = primerResultado;
        
        //Deshabilitar boton
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas == 2){
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;
        
        tarjeta2.disabled = true;

        //tarjetasDestapadas = 0;

        //Incremetar movimientos
        movimientos = movimientos + 1;
        mostrarMovimiento.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            tarjetasDestapadas = 0;

            //Aumentar aciertos
            aciertos = aciertos + 1;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos == 8) {
                clearInterval(tiempoRegresivoId);
                mostrarMovimiento.innerHTML = `Movimientos: ${movimientos}🧐`;
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 🥳🤩`;
            }
        }else{
            //Mostar momentaneamente valores y volver a tapar
            setTimeout(() => {
                tarjeta1.innerHTML = ``;
                tarjeta1.disabled = false;
                
                tarjeta2.innerHTML = ``;
                tarjeta2.disabled = false;

                tarjetasDestapadas = 0;
            }, 1000);
        }
    }


}
