import Deferred from 'promise-deferred';

export default class {
  constructor() {
    this.FileReader = new FileReader();
  }
  convert(files) {
    let self = this,
      deferred = new Deferred(),
      i = 0,
      result = [];

    if(self.checkFile(files) === 0) {
      deferred.reject(new Error('error'));
      return deferred.promise;
    }

    files = self.sortFile(files);

    self.FileReader.readAsDataURL(files[i]);
    self.FileReader.onload = function (e) {
      result.push({
        f: i,
        d: e.target.result,
      });
      i++;

      if (!files[i]) {
        deferred.resolve(result);
        return;
      }
      self.FileReader.readAsDataURL(files[i]);
    };
    return deferred.promise;
  }
  sortFile(files) {
    files = Object.keys(files).map(function (key) {
      return files[key];
    });
    files.sort(function (a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    return files;
  }
  checkFile(files) {
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.indexOf("image") === -1) return 0;
    }
    return 1;
  }
}
