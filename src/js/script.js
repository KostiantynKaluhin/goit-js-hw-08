const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  imageGalleryList: document.querySelector('ul.js-gallery'),
  modal: document.querySelector('div.lightbox'),
  button: document.querySelector('button[data-action="close-lightbox"]'),
  lightbox: document.querySelector('.lightbox__image'),
  overlay: document.querySelector('div.lightbox__overlay'),
};

const createImageGalleryItem = ({ preview, original, description }) => {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
};

const createImageGalleryItemMarkup = pictures => {
  return pictures.map(createImageGalleryItem).join('');
};

const imageGalleryItemMarkup = createImageGalleryItemMarkup(galleryItems);

refs.imageGalleryList.insertAdjacentHTML('beforeend', imageGalleryItemMarkup);

refs.imageGalleryList.addEventListener('click', onImageClick);
refs.button.addEventListener('click', onModalClose);
refs.overlay.addEventListener('click', onModalBackdropClose);

let currentImgIdx = null;

function onImageClick(event) {
  event.preventDefault();
  const { dataset, alt, nodeName } = event.target;
  if (nodeName !== 'IMG') return;
  onModalOpen(dataset.source, alt);
}

function onModalOpen(source, alt) {
  refs.modal.classList.add('is-open');
  refs.lightbox.src = source;
  refs.lightbox.alt = alt;
  window.addEventListener('keydown', onKeypress);
}

function onModalClose() {
  refs.modal.classList.remove('is-open');
  refs.lightbox.src = '';
  refs.lightbox.alt = '';
  window.removeEventListener('keydown', onKeypress);
}

function onModalBackdropClose(event) {
  if (event.currentTarget === event.target) {
    onModalClose();
  }
}

function findIndex() {
  return galleryItems.findIndex(
    ({ original }) => original === refs.lightbox.src,
  );
}

function onNextImage() {
  currentImgIdx = findIndex();
  currentImgIdx =
    galleryItems.length - 1 === currentImgIdx ? 0 : currentImgIdx + 1;
  const { original, description } = galleryItems[currentImgIdx];
  refs.lightbox.src = original;
  refs.lightbox.alt = description;
}

function onPrevImage() {
  currentImgIdx = findIndex();
  currentImgIdx =
    currentImgIdx === 0 ? galleryItems.length - 1 : currentImgIdx - 1;
  const { original, description } = galleryItems[currentImgIdx];
  refs.lightbox.src = original;
  refs.lightbox.alt = description;
}

function onKeypress(event) {
  console.log(event.code);
  event.code === 'Escape' && onModalClose();
  event.code === 'ArrowRight' && onNextImage();
  event.code === 'ArrowLeft' && onPrevImage();
}
