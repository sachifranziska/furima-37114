window.addEventListener('load', () => {
  
  // 新規投稿・編集ページのフォームを取得
  const postForm = document.getElementById('item-image');
  // プレビューを表示するためのスペースを取得
  const ImageList = document.getElementById('image-list');
  // 新規投稿・編集ページのフォームがないならここで終了。「!」は論理否定演算子。
  if (!postForm) return null;

  // 投稿できる枚数の制限を定義
  const imageLimits = 3;

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

    // 削除ボタンを生成
    const deleteButton = document.createElement("div");
    deleteButton.setAttribute("class", "image-delete-button");
    deleteButton.innerText = "削除";

    // 削除ボタンをクリックしたらプレビューとfile_fieldを削除させる
    deleteButton.addEventListener("click", () => deleteImage(dataIndex));

    // 生成したHTMLの要素をブラウザに表示させる
    imageElement.appendChild(pictImage);
    imageElement.appendChild(deleteButton);
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

    // 追加されたfile_fieldにchangeイベントをセット
    newFileField.addEventListener("change", changedFileField);

    // 生成したfile_fieldを表示
    const fileFieldsArea = document.querySelector('.click-upload');
    fileFieldsArea.appendChild(newFileField);
  };

  // 指定したdata-indexを持つプレビューとfile_fieldを削除する
  const deleteImage = (dataIndex) => {
    const deletePreviewImage = document.querySelector(`.preview[data-index="${dataIndex}"]`);
    deletePreviewImage.remove();
    const deleteFileField = document.querySelector(`input[type="file"][data-index="${dataIndex}"]`);
    deleteFileField.remove();

    // 画像の枚数が最大のときに削除ボタンを押した場合、file_fieldを1つ追加する
    const imageCount = document.querySelectorAll(".preview").length;
    if (imageCount == imageLimits - 1) buildNewFileField();
  };

  // input要素で値の変化が起きた際に呼び出される関数の中身
  const changedFileField = (e) => {
    // data-index（何番目を操作しているか）を取得
    const dataIndex = e.target.getAttribute('data-index');

    // 画像ファイルの情報を取得
    const file = e.target.files[0];

    // fileが空 = 何も選択しなかったのでプレビュー等を削除して終了する
    if (!file) {
      deleteImage(dataIndex);
      return null;
    };

    // 画像情報のURLを生成
    const pict = window.URL.createObjectURL(file);

    // data-indexを使用して、既にプレビューが表示されているかを確認する
    const alreadyPreview = document.querySelector(`.preview[data-index="${dataIndex}"]`);

    if (alreadyPreview) {
      // クリックしたfile_fieldのdata-indexと、同じ番号のプレビュー画像が既に表示されている場合は、画像の差し替えのみを行う
      const alreadyPreviewImage = alreadyPreview.querySelector("img");
      alreadyPreviewImage.setAttribute("src", pict);
      return null;
    };

    buildPreviewImage(dataIndex, pict);

    // 画像の枚数制限に引っかからなければ、新しいfile_fieldを追加する
    const imageCount = document.querySelectorAll(".preview").length;
    if (imageCount < imageLimits) buildNewFileField();
  };
    
  // input要素を取得
  const fileField = document.querySelector('input[type="file"][name="item[images][]"]');
  
  // input要素で値の変化が起きた際に呼び出される関数
  fileField.addEventListener('change', changedFileField);
});