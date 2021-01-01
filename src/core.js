import dataurlConverter from "./modules/dataurl-converter";
import player from "./modules/demo-player";

export default class {
  constructor() {
    if (!window.File && !window.FileReader) {
      alert("File APIをサポートしていません");
      return false;
    }

    this.dataurlConverter = new dataurlConverter();
    this.player = new player();

    this.dragEvents();
  }
  dragEvents() {
    let self = this,
        dropArea = document.getElementById('dropArea');

    dropArea.addEventListener('dragover', function(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';

      if(dropArea.classList.contains('active')) return;
      dropArea.classList.add('active');
    });
    dropArea.addEventListener('dragleave', function(e) {
      e.stopPropagation();
      e.preventDefault();

      if(!dropArea.classList.contains('active')) return;
			dropArea.classList.remove('active');
    });

    dropArea.addEventListener('drop', function(e) {
      e.stopPropagation();
      e.preventDefault();

      let files = e.dataTransfer.files;
      self.dropFile(files);

    });
  }
  dropFile(files) {
    let self = this;
    self.dataurlConverter.convert(files).then(function(res) {
      self.player.play(res);

      self.splitData(res);
    }, function(error) {
      console.log(error);
    });
  }

  splitData(data) {
    let result = [],
        i = 0;
    data.forEach(function(value) {
      let max = (i+1)*10;
      if(value.f >=  max ) i++;
      if(!result[i]) {
        result[i] = {
          'name': 'data' + i + '.json',
          'data': [],
        };
      }
      result[i].data.push(value);
    });
    return result;
  }
}
