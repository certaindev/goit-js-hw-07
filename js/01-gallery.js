import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector('.gallery');

gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));
gallery.addEventListener('click', showModal);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(item => {
      return `<div class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </div>`;
    })
    .join('');
}

function showModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const modal = basicLightbox.create(`<img src="${event.target.dataset.source}"/>`, {
    onShow: () => {
      document.addEventListener('keydown', keydownEsc);
    },
    onClose: () => {
      document.removeEventListener('keydown', keydownEsc);
    },
  });
  modal.show();

  function keydownEsc(event) {
    if (event.code === 'Escape') {
      modal.close();
    }
  }
}
