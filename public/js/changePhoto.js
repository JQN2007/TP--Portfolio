// public/js/changePhoto.js
const changePhotoBtn = document.getElementById("changePhotoBtn");
const photoModal = document.getElementById("photoModal");
const photoModalClose = photoModal?.querySelector(".close");

if (changePhotoBtn) {
    changePhotoBtn.addEventListener("click", () => {
        photoModal.style.display = "block";
    });
}

if (photoModalClose) {
    photoModalClose.addEventListener("click", () => photoModal.style.display = "none");
}

window.addEventListener("click", (e) => {
    if (e.target === photoModal) photoModal.style.display = "none";
});
