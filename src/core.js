import player from "./modules/demo-player";
import dataurlConverter from "./modules/dataurl-converter";

export default class {
  constructor() {
    if (!window.File && !window.FileReader) {
      alert("File APIをサポートしていません");
      return false;
    }

    this.player = new player();
    this.dataurlConverter = new dataurlConverter();
    this.dropArea = document.getElementById('dropArea');

    this.dragEvents();
  }
  dragEvents() {
    let self = this;
    self.dropArea.addEventListener('dragover', function(e) {
      e.stopPropagation();
      e.preventDefault();

    });
    self.dropArea.addEventListener('drop', function(e) {
      e.stopPropagation();
      e.preventDefault();

      let files = e.dataTransfer.files;
      self.dataurlConverter.convert(files).then(function(res) {
        console.log(res);
        self.player.play(res);
      }, function(error) {
        console.log(error);
      });

    });
  }
}
