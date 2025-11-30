// public/js/cards.js
const editCardsBtn = document.getElementById("editCardsBtn");
const cardModal = document.getElementById("cardModal");
const cardModalClose = cardModal?.querySelector(".close");
const cardsEditor = document.getElementById("cardsEditor");
const addCardBtn = document.getElementById("addCardBtn");
const saveCardsBtn = document.getElementById("saveCardsBtn");
const userCardsContainer = document.getElementById("userCardsContainer");

// Abrir modal
if (editCardsBtn) {
    editCardsBtn.addEventListener("click", () => {
        // Llenar editor con tarjetas actuales
        cardsEditor.innerHTML = "";
        const existingCards = [];

        // Tomar tarjetas visibles en DOM (si las hay)
        const domCards = userCardsContainer ? userCardsContainer.querySelectorAll('.sobre-mi-item') : [];
        domCards.forEach((c) => {
            const title = c.querySelector('h3')?.innerText || '';
            const desc = c.querySelector('p')?.innerText || '';
            existingCards.push({ title, description: desc });
        });

        if (existingCards.length === 0) {
            // Si no hay, dejar un input vacío
            addCardInput('', '');
        } else {
            existingCards.forEach(card => addCardInput(card.title, card.description));
        }

        cardModal.style.display = "block";
    });
}

if (cardModalClose) {
    cardModalClose.addEventListener("click", () => cardModal.style.display = "none");
}

window.addEventListener("click", (e) => {
    if (e.target === cardModal) cardModal.style.display = "none";
});

// Añadir campo de tarjeta
function addCardInput(title = '', description = '') {
    const id = Date.now() + Math.random().toString(36).slice(2,7);
    const wrapper = document.createElement('div');
    wrapper.className = 'card-edit-item';
    wrapper.dataset.id = id;
    wrapper.innerHTML = `
        <input class="card-title" placeholder="Título" value="${escapeHtml(title)}">
        <textarea class="card-desc" placeholder="Descripción">${escapeHtml(description)}</textarea>
        <button class="remove-card">Eliminar</button>
        <hr>
    `;
    cardsEditor.appendChild(wrapper);

    wrapper.querySelector('.remove-card').addEventListener('click', () => {
        wrapper.remove();
    });
}

if (addCardBtn) {
    addCardBtn.addEventListener('click', () => addCardInput());
}

// Guardar tarjetas (envía todas las tarjetas como array al backend)
if (saveCardsBtn) {
    saveCardsBtn.addEventListener('click', async () => {
        const cardNodes = cardsEditor.querySelectorAll('.card-edit-item');
        const cards = [];
        cardNodes.forEach(node => {
            const title = node.querySelector('.card-title').value.trim();
            const description = node.querySelector('.card-desc').value.trim();
            if (title || description) cards.push({ title, description });
        });

        const res = await fetch('/user/cards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cards })
        });

        const data = await res.json();
        if (data.success) {
            // Actualizar DOM de tarjetas en index
            if (userCardsContainer) {
                userCardsContainer.innerHTML = '';
                if (data.cards.length === 0) {
                    userCardsContainer.innerHTML = '<p style="color:#ddd; text-align:center;">Aún no agregaste tarjetas. Usá "Editar tarjetas" para crear las tuyas.</p>';
                } else {
                    data.cards.forEach(c => {
                        const div = document.createElement('div');
                        div.className = 'sobre-mi-item';
                        div.innerHTML = `<h3>${escapeHtml(c.title)}</h3><p>${escapeHtml(c.description)}</p>`;
                        userCardsContainer.appendChild(div);
                    });
                }
            }
            cardModal.style.display = 'none';
        } else {
            alert('Error guardando tarjetas');
        }
    });
}

// pequeña función para evitar inyección en innerHTML
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(m) {
        return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]);
    });
}
