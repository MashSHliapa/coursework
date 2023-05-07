import { Modal } from 'bootstrap'
import SimpleLightbox from 'simplelightbox'

// Module
const modalElement = document.querySelector('#exampleModal')

const modalInstance = Modal.getOrCreateInstance(modalElement)
console.log(modalInstance)

// modalInstance.show() // открыть модальное окно
// modalInstance.hide() // закрыть модальное окно

// Lightbox
const lightboxInstance = new SimpleLightbox('.gallery a')
