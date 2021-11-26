window.addEventListener('load', () => {
  if ( document.getElementById('item-image')){
    const ImageList = document.getElementById('image-list');
    
    const createImageHTML = (pict) => {
      const imageElement = document.createElement('div');
      const pictImage = document.createElement('img');

      pictImage.setAttribute('src', pict);
      pictImage.classList.add('preview-size');

      imageElement.appendChild(pictImage);
      ImageList.appendChild(imageElement);
    };

    document.getElementById('item-image').addEventListener('change', function(e){

      const imageContent = document.querySelector('img');
      if (imageContent){
        imageContent.remove();
      }

      const file = e.target.files[0];
      const pict = window.URL.createObjectURL(file);

      createImageHTML(pict);
    });  
  }
});