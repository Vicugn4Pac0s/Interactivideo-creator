import dataurlConverter from "./modules/dataurl-converter";
import demoPlayer from "./modules/demo-player";
import fileCreator from "./modules/file-creator";

export default class {
  constructor() {
    if (!window.File && !window.FileReader) {
      alert("File APIをサポートしていません");
      return false;
    }

    let self = this;

    self.dataurlConverter = new dataurlConverter();
    self.demoPlayer = new demoPlayer();
    self.fileCreator;

    self.result = document.getElementById("result");
    self.downloadBtn = document.getElementById("zipDownload");
    self.downloadBtn.addEventListener("click", function () {
      self.fileCreator.download(self.downloadBtn);
    });

    self.dragEvents();
  }
  dragEvents() {
    let self = this,
      loadFile = document.getElementById("loadFile"),
      dropArea = document.getElementById("dropArea");

    loadFile.addEventListener("change", function (e) {
      let files = e.target.files;
      self.dropFile(files);
    });
    dropArea.addEventListener("drop", function (e) {
      e.stopPropagation();
      e.preventDefault();

      let files = e.dataTransfer.files;
      self.dropFile(files);

      if (!dropArea.classList.contains("active")) return;
      dropArea.classList.remove("active");
    });

    dropArea.addEventListener("dragover", function (e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";

      if (dropArea.classList.contains("active")) return;
      dropArea.classList.add("active");
    });
    dropArea.addEventListener("dragleave", function (e) {
      e.stopPropagation();
      e.preventDefault();

      if (!dropArea.classList.contains("active")) return;
      dropArea.classList.remove("active");
    });
  }
  dropFile(files) {
    let self = this;
    self.dataurlConverter.convert(files).then(
      function (res) {
        self.demoPlayer.play(res);
        self.fileCreator = new fileCreator(res, {
          zipFileName: document.getElementById('JS-folder_name').value || "intaractivideo",
          per: self.getPer(),
        });

        if (self.result.classList.contains("active")) return;
        self.result.classList.add("active");
      },
      function (error) {
        alert("Error: 画像以外のファイルが含まれています！");
      }
    );
  }
  getPer() {
    let per = document.getElementById('JS-per').value;
    if(isNaN(per) || per < 0) per = 10;
    return per;
  }
}
