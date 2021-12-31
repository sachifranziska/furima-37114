window.addEventListener('load', () => {
  
  // 新規投稿・編集ページのフォームを取得
  const postForm = document.getElementById('item-image');
  // プレビューを表示するためのスペースを取得
  const ImageList = document.getElementById('image-list');
  // 新規投稿・編集ページのフォームがないならここで終了。「!」は論理否定演算子。
  if (!postForm) return null;

  // プレビュー画像を生成・表示する関数
  const buildPreviewImage = (dataIndex, pict) =>{
    // 画像を表示するためのdiv要素を生成
    const imageElement = document.createElement('div');
    imageElement.setAttribute('class', 'preview');
    imageElement.setAttribute('data-index', dataIndex);

    // 表示する画像を生成
    const pictImage = document.createElement('img');
    pictImage.setAttribute('class', 'preview-image');
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

    // 最後のfile_fieldを取得
    const lastFileField = document.querySelector('input[type="file"][name="item[images][]"]:last-child');
    // nextDataIndex = 最後のfile_fieldのdata-index + 1
    const nextDataIndex = Number(lastFileField.getAttribute('data-index')) +1;
    newFileField.setAttribute('data-index', nextDataIndex);

    // 生成したfile_fieldを表示
    const fileFieldsArea = document.querySelector('.click-upload');
    fileFieldsArea.appendChild(newFileField);
  };

  // input要素で値の変化が起きた際に呼び出される関数の中身
  const changedFileField = (e) => {
    // data-index（何番目を操作しているか）を取得
    const dataIndex = e.target.getAttribute('data-index');

    // 古いプレビューが存在する場合は削除
    const alreadyPreview = document.querySelector('.preview');
    if (alreadyPreview) {
      alreadyPreview.remove();
    };

    // 画像ファイルの情報を取得、画像情報のURLを生成
    const file = e.target.files[0];
    const pict = window.URL.createObjectURL(file);

    buildPreviewImage(dataIndex, pict);
    buildNewFileField();
  };
    
  // input要素を取得
  const fileField = document.querySelector('input[type="file"][name="item[images][]"]');
  
  // input要素で値の変化が起きた際に呼び出される関数
  fileField.addEventListener('change', changedFileField);
});