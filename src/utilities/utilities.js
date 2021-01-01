export function convert_zeroPadding(index) {
  var new_index = index;
  if(index < 10 ) { // indexが10以下なら
    new_index = '0' + index;
  }
  return new_index;
}

export function fps_to_ms(fps) {
  let ms = 1e3 / fps;
  return ms;
}