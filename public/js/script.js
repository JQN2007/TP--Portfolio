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

// Función para hacer el carrusel bucle infinito en móviles
function initInfiniteCarousel() {
  const carousel = document.querySelector('.galeria-conteiner');
  if (!carousel) return; // Si no existe, salir

  const items = carousel.querySelectorAll('.galeria-item');
  if (items.length === 0) return;

  const itemWidth = items[0].offsetWidth + 10; // Ancho de una imagen + gap (10px)
  const totalWidth = itemWidth * items.length;

  // Duplicar las imágenes al inicio y fin para el bucle
  const firstClone = items[0].cloneNode(true);
  const lastClone = items[items.length - 1].cloneNode(true);
  carousel.appendChild(firstClone); // Agrega al final
  carousel.insertBefore(lastClone, items[0]); // Agrega al inicio

  // Ajustar el scroll inicial al centro (después de duplicar)
  carousel.scrollLeft = itemWidth;

  // Evento de scroll
  carousel.addEventListener('scroll', () => {
    const scrollLeft = carousel.scrollLeft;

    // Si llega al final (última imagen duplicada)
    if (scrollLeft >= totalWidth + itemWidth) {
      carousel.scrollLeft = itemWidth; // Vuelve al inicio real
    }
    // Si llega al inicio (primera imagen duplicada)
    else if (scrollLeft <= 0) {
      carousel.scrollLeft = totalWidth; // Vuelve al fin real
    }
  });
}

// Inicializar cuando la página cargue
document.addEventListener('DOMContentLoaded', initInfiniteCarousel);


// --- Modal ---
const modal = document.getElementById('projectModal');
const openBtn = document.getElementById('addProjectBtn');
const closeBtn = document.querySelector('.close');

if (openBtn && modal && closeBtn) {
  openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// --- Enviar formulario ---
const projectForm = document.getElementById('projectForm');

if (projectForm) {
  projectForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(projectForm);

    const response = await fetch('/portfolio/add', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert('Proyecto agregado con éxito');
      modal.style.display = 'none';
      projectForm.reset();
      location.reload();
    } else {
      alert('Error al agregar el proyecto');
    }
  });
}
