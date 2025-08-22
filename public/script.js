const galeriaConteiner = document.querySelector('.galeria-conteiner');
const galeriaControlesConteiner = document.querySelector('.galeria-controles');
const galeriaControles = ['previo', 'siguiente'];
const galeriaItems = document.querySelectorAll('.galeria-item');



class Carrusel{
    constructor(conteiner, items, controles)
    {
        this.carruselConteiner = conteiner;
        this.carruselControles = controles;
        this.carruselArray = [...items];

    }

    updateGaleria()
    {
        this.carruselArray.forEach(el =>{
        el.classList.remove('galeria-item-1');
        el.classList.remove('galeria-item-2');
        el.classList.remove('galeria-item-3');
        el.classList.remove('galeria-item-4');
        el.classList.remove('galeria-item-5');
    });

    this.carruselArray.slice(0, 5).forEach((el, i) => {
        el.classList.add(`galeria-item-${i+1}`);
    });
    }

    setCurrentState(direccion)
    {
        if(direccion.className == 'galeria-controles-previo')
        {
            this.carruselArray.unshift(this.carruselArray.pop());
        }else{
            this.carruselArray.push(this.carruselArray.shift());
        }
        this.updateGaleria();
    }

    setControles()
    {
        this.carruselControles.forEach(control => {
            galeriaControlesConteiner.appendChild(document.createElement('button')).className = `galeria-controles-${control}`;
            document.querySelector(`.galeria-controles-${control}`).innerText = control;
        });
    }

    useControles()
    {
        const triggers = [...galeriaControlesConteiner.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }
}

const exampleCarrusel = new Carrusel(galeriaConteiner, galeriaItems, galeriaControles);
exampleCarrusel.setControles();
exampleCarrusel.useControles();

// Modal Cambiar Cuenta
const modal = document.getElementById("modalCambiarCuenta");
const btnCambiarCuenta = document.querySelector(".button"); // tu engranaje
const spanClose = document.querySelector(".close");

btnCambiarCuenta.addEventListener("click", () => {
  modal.style.display = "block";
});

spanClose.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});


// Modal Añadir Proyecto
const modalProyecto = document.getElementById("modalAnadirProyecto");
const btnAnadirProyecto = document.querySelector(".btn"); // tu botón blanco redondo
const spanCloseProyecto = document.querySelector(".close-proyecto");

btnAnadirProyecto.addEventListener("click", () => {
  modalProyecto.style.display = "block";
});

spanCloseProyecto.addEventListener("click", () => {
  modalProyecto.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target == modalProyecto) {
    modalProyecto.style.display = "none";
  }
});



