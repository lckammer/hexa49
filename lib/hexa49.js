function svgdraw(svg) {
  'use strict';
  
  var nRings = 7,
    nDimmerHex = nRings,
    SQRT3 = Math.sqrt(3),
    col,
    row,
    colorString,
    ns = svg.getAttribute('xmlns'),
    bgWidth = svg.getAttribute('width'),
    bgHeight = svg.getAttribute('height'),
    svgObject,

    combWidth = Math.min(bgWidth - SQRT3 * bgHeight / nDimmerHex,
      bgHeight / SQRT3 * (2 + 3 * nRings) / (1 + 2 * nRings)),
    combHeight = SQRT3 * (1 + 2 * nRings) * combWidth / (2 + 3 * nRings),

    combHexWidth = 2 * combWidth / (2 + 3 * nRings),
    combHexHeight = SQRT3 * combHexWidth / 2,

    dimmerHexHeight = combHeight / (nDimmerHex),
    dimmerWidth = 2 / SQRT3 * dimmerHexHeight,

    light = 0,
    rowOne,
    xHex,
    yHex,
    colorMatrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
    i,
    colorValue;
  
  colorMatrix[0][0] = 1; // red intensity at the top
  colorMatrix[3][0] = 0; // red intensity at the bottom

  // COMB
  for (col = 0; col <= 2 * nRings; col += 1) {
    rowOne = nRings - Math.abs(col - nRings);

    xHex = 3 * col * combHexWidth / 4;

    // red
    colorMatrix[1][0] = 1 - rowOne * (1 - light) / nRings;
    colorMatrix[2][0] = rowOne * light / nRings;

    // green
    colorMatrix[0][1] = Math.max(0, col / nRings - 1);
    colorMatrix[3][1] = Math.min(1, col / nRings);

    // blue
    colorMatrix[0][2] = Math.max(0, 1 - col / nRings);
    colorMatrix[3][2] = Math.min(1, 2 - col / nRings);

    if (col <= nRings) {
      colorMatrix[1][1] = col * light / nRings;
      colorMatrix[1][2] = 1 - col * (1 - light) / nRings;
    } else {
      colorMatrix[1][1] = light + (col - nRings) / nRings * (1 - light);
      colorMatrix[1][2] = light * (2 - col / nRings);
    }
    colorMatrix[2][1] = colorMatrix[1][1];
    colorMatrix[2][2] = colorMatrix[1][2];

    for (row = 0; row <= nRings + rowOne; row += 1) {
      yHex = (row + (nRings - rowOne) / 2) * combHexHeight;

      svgObject = document.createElementNS(ns, 'polygon');
      svgObject.setAttribute('points',
        (xHex + combHexWidth / 4) + ',' + yHex + ' ' +
        (xHex + 3 * combHexWidth / 4) + ',' + yHex + ' ' +
        (xHex + combHexWidth) + ',' + (yHex + combHexHeight / 2) + ' ' +
        (xHex + 3 * combHexWidth / 4) + ',' + (yHex + combHexHeight) + ' ' +
        (xHex + combHexWidth / 4) + ',' + (yHex + combHexHeight) + ' ' +
        xHex + ',' + (yHex + combHexHeight / 2));

      colorString = 'rgb(';
      for (i = 0; i <= 2; i += 1) {
        if (row < rowOne) {
          colorValue = colorMatrix[0][i] + row / rowOne *
            (colorMatrix[1][i] - colorMatrix[0][i]);
        } else if (row < nRings) {
          colorValue = colorMatrix[1][i] + (row - rowOne) / (nRings - rowOne) *
            (colorMatrix[2][i] - colorMatrix[1][i]);
        } else if (rowOne === 0) {
          colorValue = colorMatrix[3][i];
        } else {
          colorValue = colorMatrix[2][i] + (row - nRings) / rowOne *
            (colorMatrix[3][i] - colorMatrix[2][i]);
        }
        colorString = colorString + Math.round(255 * colorValue).toString() +
          (i < 2 ? ', ' : ')');
      }
      svgObject.style.fill = colorString;
      //console.log(colorString);
      //console.log(svgObject.style.fill);
      svgObject.setAttribute('onclick', 'svgclick(\'' + colorString + '\')');
      //svgObject.setAttribute("onmouseover", "svgclick('" + colorString + "')");
      svg.appendChild(svgObject);
    }
  }

  // DIMMER
  xHex = combWidth + dimmerWidth / 2;
  for (row = 0; row <= nDimmerHex; row += 1) {
    yHex = row * dimmerHexHeight;

    svgObject = document.createElementNS(ns, 'polygon');
    svgObject.setAttribute('points',
      (xHex + dimmerWidth / 4) + ',' + yHex + ' ' +
      (xHex + 3 * dimmerWidth / 4) + ',' + yHex + ' ' +
      (xHex + dimmerWidth) + ',' + (yHex + dimmerHexHeight / 2) + ' ' +
      (xHex + 3 * dimmerWidth / 4) + ',' + (yHex + dimmerHexHeight) + ' ' +
      (xHex + dimmerWidth / 4) + ',' + (yHex + dimmerHexHeight) + ' ' +
      xHex + ',' + (yHex + dimmerHexHeight / 2));

    colorValue = 1 - row / nDimmerHex;
    colorString = 'rgb(' + Math.round(255 * colorValue).toString() + ', ' +
      Math.round(255 * colorValue).toString() + ', ' +
      Math.round(255 * colorValue).toString() + ')';

    svgObject.style.fill = colorString;
    //console.log(colorString);
    //console.log(svgObject.style.fill);
    svgObject.setAttribute('onclick', 'svgclick(\'' + colorString + '\')');
    svgObject.setAttribute('stroke', 'black');
    svgObject.setAttribute('stroke-width', 1);
    //svgObject.setAttribute("onmouseover", "svgclick('" + colorString + "')");
    svg.appendChild(svgObject);
  }
}

function svgclick(colorIn) {
  'use strict';
  
  var rect = document.getElementById('svgColor');
  
  rect.style.fill = colorIn;
  //console.log(colorIn);
}