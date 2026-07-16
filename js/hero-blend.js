// Hero background — animated flow gradient + grain, from the "Untitled blend" palette export.
(function () {
  var hero = document.querySelector('.hero');
  if (!hero) return;

  var CONFIG = {
    noise: 5,
    speed: 24,
    stops: [
      { hex: '#F6F9FF', position: 0.125 },
      { hex: '#A0D8EF', position: 0.375 },
      { hex: '#FFF1CF', position: 0.625 },
      { hex: '#D6EAF3', position: 0.875 }
    ]
  };

  var blend = document.createElement('div');
  blend.className = 'hero__blend';
  blend.setAttribute('aria-hidden', 'true');

  CONFIG.stops.forEach(function (stop, i) {
    var blob = document.createElement('span');
    blob.className = 'hero__blend-blob hero__blend-blob--' + (i + 1);
    blob.style.setProperty('--blob-color', stop.hex);
    blob.style.setProperty('--blob-duration', (11 - CONFIG.speed / 12 + i * 2) + 's');
    blob.style.setProperty('--blob-delay', (i * -2) + 's');
    blend.appendChild(blob);
  });

  hero.insertBefore(blend, hero.firstChild);

  var grainCanvas = document.createElement('canvas');
  var size = 128;
  grainCanvas.width = size;
  grainCanvas.height = size;
  var ctx = grainCanvas.getContext('2d');
  if (ctx) {
    var imageData = ctx.createImageData(size, size);
    var alphaScale = CONFIG.noise / 100;
    for (var p = 0; p < imageData.data.length; p += 4) {
      var v = Math.random() * 255;
      imageData.data[p] = v;
      imageData.data[p + 1] = v;
      imageData.data[p + 2] = v;
      imageData.data[p + 3] = Math.random() * 255 * alphaScale * 4;
    }
    ctx.putImageData(imageData, 0, 0);

    var grain = document.createElement('div');
    grain.className = 'hero__grain';
    grain.setAttribute('aria-hidden', 'true');
    grain.style.backgroundImage = 'url(' + grainCanvas.toDataURL() + ')';
    hero.insertBefore(grain, blend.nextSibling);
  }
})();
