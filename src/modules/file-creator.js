import FileSaver from "file-saver";
import JSZip from "jszip";
import { convert_zeroPadding } from "../utilities/utilities";

export default class {
  constructor(data) {
    this.JSZip = new JSZip();
    this.create(data);
  }
  download(element) {
    let self = this;
    element.innerHTML = 'Please wait...';
    self.JSZip.generateAsync({ type: "blob" }).then(function (content) {
      FileSaver.saveAs(content, "intaractivideo.zip");
      element.innerHTML = 'Zip Download';
    });
  }
  create(data) {
    let self = this,
      frames = data.length,
      files = Math.ceil(frames / 10);

    let fileData = self.splitData(data);
    fileData.push({
      name: "settings.json",
      data: {
        files: files,
        frames: frames,
      },
    });

    fileData.forEach(function (value) {
      let json = JSON.stringify(value.data);
      self.JSZip.file(value.name, json);
    });
  }
  splitData(data) {
    let result = [],
      i = 0;
    data.forEach(function (value) {
      let max = (i + 1) * 10;
      if (value.f >= max) i++;
      if (!result[i]) {
        result[i] = {
          name: "data" + convert_zeroPadding(i + 1) + ".json",
          data: [],
        };
      }
      result[i].data.push(value);
    });
    return result;
  }
}
