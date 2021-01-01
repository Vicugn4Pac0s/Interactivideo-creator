import FileSaver from "file-saver";
import JSZip from "jszip";
import { convert_zeroPadding } from "../utilities/utilities";

export default class {
  constructor(data) {
    this.JSZip = new JSZip();
    
    let frames = data.length;
    let files = Math.ceil(frames / 10);
    let settings = {
      'name': 'settings.json',
      'data': {
        'files': files,
        'frames': frames,
      }
    }

    this.data = this.splitData(data);
    this.data.push(settings);
    
    let self = this;
    this.data.forEach(function(value) {
      let json = JSON.stringify(value.data);
      self.JSZip.file(value.name, json);
    });
    self.download();
  }
  download() {
    let self = this;
    self.JSZip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "intaractivideo.zip");
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
          'name': 'data' + convert_zeroPadding(i+1) + '.json',
          'data': [],
        };
      }
      result[i].data.push(value);
    });
    return result;
  }
}
