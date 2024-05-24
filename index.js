const x="✘";
const o="❤︎";
let estadoJuego= "P1";
const cuadrados = Array.from(document.querySelectorAll(".cuadrado"));
const modal = document.querySelector("dialog");
const textoModal = modal.querySelector("h2");


cuadrados.forEach((cuadrado,i) => {
    cuadrado.addEventListener("click",()=>{
        if(cuadrado.textContent!== ""){
            return;
        }

        if (estadoJuego === "PAUSA"){
            return;
        }
        cuadrado.innerText= estadoJuego==="P1" ? o : x;
      
        const posicionGanadora = revisarGanador();

        if (typeof posicionGanadora==="object"){
            ganar(posicionGanadora);
            return
        }
        if (posicionGanadora==="empate"){
            mostrarModal("Empate!");
        }

        estadoJuego = estadoJuego === "P1" ? "P2" : "P1";
    })
});

function revisarGanador(){

    const tablero= cuadrados.map(cuadrado => cuadrado.textContent)

    /*Revisar horizontales*/
    for (let i = 0; i <= 9; i+=3) {
        if(tablero[i] &&
            tablero[i] === tablero[i+1] &&
            tablero[i] === tablero[i+2])
        {
            return [i,i+1,i+2];
        }
        
    }

    /*Revisar verticales*/
    for (let i = 0; i <= 3; i++) {
        if(tablero[i] &&
            tablero[i] === tablero[i+3] &&
            tablero[i] === tablero[i+6])
        {
            return [i, i+3,i+6];
        }
    }

    /*Revisar oblicuas*/
    if(tablero[0] &&
        tablero[0] === tablero[4] &&
        tablero[0] === tablero[8])
    {
        return [0,4,8];
    }
    if(tablero[2] &&
        tablero[2] === tablero[4] &&
        tablero[2] === tablero[6])
    {
        return [2,4,6];
    }


    /*Revisar empate*/
    if(tablero.includes("")) return false;
        mostrarModal("Empate!");
}

function ganar(posicionGanadora){

    posicionGanadora.forEach(posicion =>{
        cuadrados[posicion].classList.toggle("ganador", true)
    })
    mostrarModal("Ganador/a: "+ estadoJuego);
    estadoJuego = "PAUSA";

}

function mostrarModal(texto){
    textoModal.innerText = texto;
    modal.showModal();
}

modal.querySelector("button").addEventListener("click", ()=>{
    cuadrados.forEach(cuadrado => {
        cuadrado.textContent=""
        cuadrado.classList.toggle("ganador", false);
        modal.close();
        estadoJuego="P1";
    });

});




