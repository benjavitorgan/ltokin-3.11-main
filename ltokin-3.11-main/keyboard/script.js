
window.saveDataAcrossSessions = true

var data;
let tiped = false;

window.addEventListener("load", () => {
    webgazer.setGazeListener(function (data, elapsedTime) {
        if (data == null) {
            return;
        }
        // var xprediction = data.x; //these x coordinates are relative to the viewport
        // var yprediction = data.y; //these y coordinates are relative to the viewport
        // console.log(xprediction, yprediction);
    }).begin();

    //setTimeout(() => {
    //    webgazer.showVideoPreview(false)
    //}, 15000);

    setInterval(async () => {
        data = await webgazer.getCurrentPrediction();
        // console.log(data);
    }, 1500);
});

// Seleccion de botones
const botones = document.querySelectorAll("button")

// Deteccion de eye tracker sobre boton

window.addEventListener("load", () => {
    webgazer.setGazeListener(function (data, elapsedTime) {

        const isHovered = (e) => {
            const pos = e.getBoundingClientRect();
            // console.log(pos);
            // console.log(data);
            return (data.x > pos.left && data.x <= pos.right && data.y > pos.top && data.y <= pos.bottom);
        }

        // Filtro del tipo de boton y ejecucion de su respectiva funcinalidad
        botones.forEach((e) => {
            if (isHovered(e)) {
                if(!tiped) handleEnter(e);
            } else {
                setTimeout(() => {
                    handleLeave(e);
                }, 2000);
            }
        })
    })
});

//Botones, Text Areas, etc.
let onButton
let texto = document.getElementById("textArea")
let msg = new SpeechSynthesisUtterance()

console.log(window.location.href);
let url = new URL(window.location.href)
let textoAnterior = url.searchParams.get('texto')
texto.value = textoAnterior

/*
let btns = document.getElementsByClassName("boton1")

for(let i = 0; i < btns.length; i++) {
    console.log(btns[i])
    btns[i].addEventListener("mouseenter", handleEnter)
    btns[i].addEventListener("mouseleave", handleLeave)
}

let botonesnum = document.getElementsByClassName("numero")

for(let i = 0; i < botonesnum.length; i++) {
    console.log(botonesnum[i])
    botonesnum[i].addEventListener("mouseenter", handleEnter)
    botonesnum[i].addEventListener("mouseleave", handleLeave)
}

let space = document.getElementsByClassName("btnspace")

for (let i = 0; i < space.length; i++) {
    console.log(space[i])
    space[i].addEventListener("mouseenter", espacio)
    space[i].addEventListener("mouseleave", handleLeave)
}

let backspace = document.getElementsByClassName("btndelete")

for (let i = 0; i < backspace.length; i++) {
    console.log(backspace[i])
    backspace[i].addEventListener("mouseenter", borrar)
    backspace[i].addEventListener("mouseleave", handleLeave)
}

let borrar_todo = document.getElementsByClassName("btnborrar")

for (let i = 0; i < borrar_todo.length; i++) {
    console.log(borrar_todo[i])
    borrar_todo[i].addEventListener("mouseenter", borrar_completo)
    borrar_todo[i].addEventListener("mouseleave", handleLeave)
}

let seccionA = document.getElementsByClassName ("btnseccionA")

for (let i = 0; i < seccionA.length; i++) {
    console.log(seccionA[i])
    seccionA[i].addEventListener("mouseenter", seccion1)
    seccionA[i].addEventListener("mouseleave", handleLeave)
}

let seccionJ = document.getElementsByClassName ("btnseccionJ")

for (let i = 0; i < seccionJ.length; i++) {
    console.log(seccionJ[i])
    seccionJ[i].addEventListener("mouseenter", seccion2)
    seccionJ[i].addEventListener("mouseleave", handleLeave)
}

let seccionS = document.getElementsByClassName ("btnseccionS")

for (let i = 0; i < seccionS.length; i++) {
    console.log(seccionS[i])
    seccionS[i].addEventListener("mouseenter", seccion3)
    seccionS[i].addEventListener("mouseleave", handleLeave)
}


let seccion0 = document.getElementsByClassName ("btnseccion0")

for (let i = 0; i < seccion0.length; i++) {
    console.log(seccion0[i])
    seccion0[i].addEventListener("mouseenter", seccion4)
    seccion0[i].addEventListener("mouseleave", handleLeave)
}

let seccionSS = document.getElementsByClassName ("btnseccionSS")

for (let i = 0; i < seccionSS.length; i++) {
    console.log(seccionSS[i])
    seccionSS[i].addEventListener("mouseenter", seccion5)
    seccionSS[i].addEventListener("mouseleave", handleLeave)
}

let inicio = document.getElementsByClassName("volver")

for (let i = 0; i < inicio.length; i++) {
    console.log(inicio[i])
    inicio[i].addEventListener("mouseenter", vinicio)
    inicio[i].addEventListener("mouseleave", handleLeave)
}

let btnenter = document.getElementsByClassName ("done")

for (let i = 0; i < btnenter.length; i++) {
    console.log(btnenter[i])
    btnenter[i].addEventListener("mouseenter", done)
    btnenter[i].addEventListener("mouseleave", handleLeave)
}
*/
//Funciones
//let txtArea = document.getElementById("textArea")

function handleEnter(e) { 

    onButton = e; 
    
    setTimeout(() => {
        if (onButton === e) { //Cambiar if con codigo por funciones para probar

            console.log(e.className)
            var cname = e.className;
            e.classList.add("hover");

            if (cname === "boton1" && tiped === false || cname === "numero" && tiped === false) {
                
                setTimeout (() => {
                    texto.value = texto.value + e.innerHTML;
                    tiped = true
                }, 2000);
                

            } else if (cname === "btnspace" && tiped === false) {

                setTimeout (() => {
                    texto.value = texto.value += " ";
                    tiped = true
                }, 2000);
                
            } else if (cname === "btndelete" && tiped === false) {

                setTimeout (() => {
                    texto.value = texto.value.substring(0, texto.value.length - 1);
                    tiped = true
                }, 2000);
                
            } else if (cname === "btnborrar" && tiped === false) {

                setTimeout (() => {
                    texto.value = texto.value.substring(0, texto.value);
                    tiped = true
                }, 2000);

            } else if (cname === "btnseccionA" && tiped === false) {
                seccion1(e);
                tiped = true

            } else if (cname === "btnseccionJ" && tiped === false) {
                seccion2(e);
                tiped = true
                
            } else if (cname === "btnseccionS" && tiped === false) {
                seccion3(e);
                tiped = true
                
            } else if (cname === "btnseccion0" && tiped === false) {
                seccion4(e);
                tiped = true
                
            } else if (cname === "volver" && tiped === false) {
                vinicio(e);
                tiped = true
                
            } else if (cname === "done" && tiped === false) {
                done(e);
                tiped = true
                
            }
        }
    }, 1500);

    setTimeout (() => {
            tiped = false;
        }, 2000);

}

function handleLeave(e) {
    onButton = null;
    e.classList.remove("hover");
}

function vinicio(e) {
    onButton = e;
    setTimeout(() => {
        if (onButton === e) {
            e.classList.add("hover");
            window.location.href = './index.html'
        }
    }, 1500);
}

function done(e) {
    onButton = e;
    setTimeout(() => {
        if (onButton === e) {
            e.classList.add("hover");
            let voices = window.speechSynthesis.getVoices()
            msg.voice = voices[10]
            msg.text = texto.value
            msg.lang = 'es'
            window.speechSynthesis.speak(msg)
        }
    }, 2500);
}

function espacio(e) {
    onButton = e;
    setTimeout(() => {
        if (onButton === e) {
            e.classList.add("hover");
            texto.value = texto.value += " ";
        }
    }, 1500);
}

function borrar(e) {
    onButton = e;
    setTimeout(() => {
        if (onButton === e) {
            e.classList.add("hover");
            texto.value = texto.value.substring(0, texto.value.length - 1)
        }
    }, 1500);
}

function borrar_completo(e) {
    onButton = e;
    setTimeout(() => {
        if (onButton === e) {
            e.classList.add("hover");
            texto.value = texto.value.substring(0, texto.value)
        }
    }, 1500);
}

function seccion1(e) {
    onButton = e;
    setTimeout(() => {
        if (onButton === e) {
            e.classList.add("hover");
            window.location.href = './A-I.html?texto=' + texto.value
        }
    }, 1500);
}

function seccion2(e) {
    onButton = e;
    setTimeout(() => {
        if (onButton === e) {
            e.classList.add("hover");
            window.location.href = './J-R.html?texto=' + texto.value
        }
    }, 1500);
}

function seccion3(e) {
    onButton = e;
    setTimeout(() => {
        if (onButton === e) {
            e.classList.add("hover");
            window.location.href = './S-Z.html?texto=' + texto.value
        }
    }, 1500);
}

function seccion4(e) {
    onButton = e;
    setTimeout(() => {
        if (onButton === e) {
            e.classList.add("hover");
            window.location.href = './0-9.html?texto=' + texto.value
        }
    }, 1500);
}

function seccion5(e) {
    onButton = e;
    setTimeout(() => {
        if (onButton === e) {
            e.classList.add("hover");
            window.location.href = './signos.html?texto=' + texto.value
        }
    }, 1500);
}