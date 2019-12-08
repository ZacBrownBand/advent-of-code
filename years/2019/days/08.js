const countOccurances = (str, letter) => {
 let count = 0;
 for (let i = 0; i < str.length; i++) {
    if (str[i] == letter) count += 1;
  }
  return count;
};

const sectionize = (str, size) => str.match(new RegExp(`.{1,${size}}`, 'g'));

const partOne = ([input]) => {
  const wide = 25;
  const tall = 6;
  const layerStrings = sectionize(input, wide * tall);

  let layer = null;
  let zeros = 100000000;

  layerStrings.forEach((currLayer) => {
    const currZeros = countOccurances(currLayer, '0');
    if (currZeros < zeros) {
      zeros = currZeros;
      layer = currLayer;
    }
  });

  return countOccurances(layer, '1') * countOccurances(layer, '2');
};
const partTwo = ([input]) => {
  const wide = 25;
  const tall = 6;
  const colors = {
     black: 0,
     white: 1,
     transparent: 2,
  };

  const offset = wide * tall;

  const image = new Array(offset);
  for (let pixel = 0; pixel < offset; pixel++) {
    let index = pixel;
    let color = input[index];
    while (color == colors.transparent) {
      index += offset;
      color = input[index];
    }

    image[pixel] = color;
  }

  const rows = image.join('')
    .replace(/0/gi, ' ')
    .replace(/1/gi, '#')
    .match(new RegExp('.{1,' + wide + '}', 'g'));

  return '\n' + rows.join('\n');
};

module.exports = { partOne, partTwo };
