export function handleDragAndDrop(elements) {
  const { dropZone, fileInput } = elements;

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
    dropZone.addEventListener(event, preventDefault);
  });

  ['dragenter', 'dragover'].forEach(event => {
    dropZone.addEventListener(event, () => dropZone.classList.add('drag-active'));
  });

  ['dragleave', 'drop'].forEach(event => {
    dropZone.addEventListener(event, () => dropZone.classList.remove('drag-active'));
  });

  dropZone.addEventListener('drop', (e) => {
    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      fileInput.dispatchEvent(new Event('change'));
    }
  });

  dropZone.addEventListener('click', () => fileInput.click());
}

function preventDefault(e) {
  e.preventDefault();
  e.stopPropagation();
}