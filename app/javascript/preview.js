window.addEventListener('load', () => {
  
  // 新規投稿・編集ページのファイル選択フォームを取得
  if ( document.getElementById('item-image')){

    // プレビューを表示するためのスペースを取得
    const ImageList = document.getElementById('image-list');
    
    const createImageHTML = (pict) => {

      // 画像を表示するためのdiv要素を生成
      const imageElement = document.createElement('div');
      // 表示する画像を生成
      const pictImage = document.createElement('img');

      // 画像URLをimg要素のsrc属性に設定
      pictImage.setAttribute('src', pict);
      pictImage.classList.add('preview-size');

      // 生成したHTMLの要素をブラウザに表示させる
      imageElement.appendChild(pictImage);
      ImageList.appendChild(imageElement);
    };

    // file_fieldを生成・表示する関数
    const buildNewFileField = () => {
      // 2枚目用のfile_fieldを作成
      const newFileField = document.createElement('input');
      newFileField.setAttribute('type', 'file');
      newFileField.setAttribute('name', 'item[images][]');

      // 生成したfile_fieldを表示
      const fileFieldsArea = document.querySelector('.click-upload');
      fileFieldsArea.appendChild(newFileField);
    };

    // input要素を取得、input要素で値の変化が起きた際に呼び出される関数
    document.querySelector('input[type="file"][name="item[images][]"]').addEventListener('change', function(e){

      // 古いプレビューが存在する場合は削除
      const imageContent = document.querySelector('img');
      if (imageContent){
        imageContent.remove();
      }

      // 画像ファイルの情報を取得、画像情報のURLを生成
      const file = e.target.files[0];
      const pict = window.URL.createObjectURL(file);

      createImageHTML(pict);
    });  
  }
});