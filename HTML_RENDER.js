class HtmlRender
{
    constructor()
    {

    }
    _NOPARAMS3(W)
    {
      let DIV = document.getElementById('OUTPUT02');
      let TEXT = "";
      for(let i=0; i<W.length; i++)
      {
        let R = Math.round(W[i].RGB.R);
        let G = Math.round(W[i].RGB.G);
        let B = Math.round(W[i].RGB.B); 
        let STYLE =  `width:${W[i].COUNT}px; background-color: rgb(${R},${G},${B})`;
        TEXT += `<div style='${STYLE}' title=${W[i].COUNT}-(${R},${G},${B}>${W[i].COUNT})</div>`;
      }
      DIV.innerHTML = TEXT;
      document.body.appendChild(DIV);

    }
    _NOPARAMS2(IMG, ARR)
    {
      let COUNTER = 0;
      let TEXT = "";
      TEXT += "<tr>";
      for(let y=0; y<IMG.height; y++)
      {
        for(let x=0; x<IMG.width; x++)
        {
          let R = __P._GET_PIX(IMG, x, y, 0);
          let G = __P._GET_PIX(IMG, x, y, 1);
          let B = __P._GET_PIX(IMG, x, y, 2);
          let VAL = __P._GET_PIX(IMG, x, y, 0);
          let VAL1 = __P._GET_PIX(IMG, x, y, 1);
          let VAL2 = __P._GET_PIX(IMG, x, y, 2);
          let COLOR = `rgb(${R},${G},${B})`;

          // TEXT += `<td style=background-color:${COLOR}>${VAL} <br>${x}, ${y} (${COUNTER})</td>`;
          TEXT += `<td style=background-color:${COLOR}>${ARR[COUNTER].L},${ARR[COUNTER].A},${ARR[COUNTER].B}  <br>${x},${y} <br> ${COUNTER}</td>`;
          // TEXT += `<td style=background-color:${COLOR}>${MAIN._AVGFINDER([R, G, B])} <br>${x}, ${y} ${COUNTER}</td>`;
          // TEXT += `<td style=background-color:${COLOR}>${MAIN._AVGFINDER([R, G, B])}</td>`;
          // TEXT += `<td style=background-color:${COLOR}>${VAL1}</td>`;
          COUNTER++;  
        }
        TEXT += "</tr><tr>";
      }
      TEXT += "</tr>";
      this._CREATEELEM(TEXT);
    }
    _NOPARAMS(IMG, ORGINAL)
    {
      let COUNTER = 0;
      let TEXT = "";
      TEXT += "<tr>";
      for(let y=0; y<IMG.height; y++)
      {
        for(let x=0; x<IMG.width; x++)
        {
          let R = __P._GET_PIX(IMG, x, y, 0);
          let G = __P._GET_PIX(IMG, x, y, 1);
          let B = __P._GET_PIX(IMG, x, y, 2);
          let VAL = __P._GET_PIX(ORGINAL, x, y, 0);
          let VAL1 = __P._GET_PIX(ORGINAL, x, y, 1);
          let VAL2 = __P._GET_PIX(ORGINAL, x, y, 2);
          let COLOR = `rgb(${R},${G},${B})`;

          // TEXT += `<td style=background-color:${COLOR}>${VAL} <br>${x}, ${y} (${COUNTER})</td>`;
          TEXT += `<td style=background-color:${COLOR}>${VAL},${VAL1},${VAL2}  <br>${x},${y} </td>`;
          // TEXT += `<td style=background-color:${COLOR}>${MAIN._AVGFINDER([R, G, B])} <br>${x}, ${y} ${COUNTER}</td>`;
          // TEXT += `<td style=background-color:${COLOR}>${MAIN._AVGFINDER([R, G, B])}</td>`;
          // TEXT += `<td style=background-color:${COLOR}>0</td>`;
          COUNTER++;  
        }
        TEXT += "</tr><tr>";
      }
      TEXT += "</tr>";
      this._CREATEELEM(TEXT);
    }
    _DIRECTIONS(IMG, ORGINAL, DIRECTIONS)
    {
      let COUNTER = 0;
      let TEXT = "";
      TEXT += "<tr>";
      for(let y=0; y<IMG.height; y++)
      {
        for(let x=0; x<IMG.width; x++)
        {
          let R = __P._GET_PIX(IMG, x, y, 0);
          let G = __P._GET_PIX(IMG, x, y, 1);
          let B = __P._GET_PIX(IMG, x, y, 2);
          let VAL = __P._GET_PIX(ORGINAL, x, y, 1);
          let COLOR = `rgb(${R},${G},${B})`;

          // TEXT += `<td style=background-color:${COLOR}>${VAL}</td>`;
          TEXT += `<td style=background-color:${COLOR}>${VAL} <br>${x}, ${y} (${COUNTER}) ${DIRECTIONS[COUNTER]}</td>`;
          COUNTER++;  
        }
        TEXT += "</tr><tr>";
      }
      TEXT += "</tr>";
      this._CREATEELEM(TEXT);
    }

    _DIRECTIONS_TWO(IMG, ORGINAL, DIRECTIONS, DIRECTIONS_GRAYSCALE)
    {
      let COUNTER = 0;
      let TEXT = "";
      TEXT += "<tr>";
      for(let y=0; y<IMG.height; y++)
      {
        for(let x=0; x<IMG.width; x++)
        {
          let R = __P._GET_PIX(IMG, x, y, 0);
          let G = __P._GET_PIX(IMG, x, y, 1);
          let B = __P._GET_PIX(IMG, x, y, 2);
          let VAL = __P._GET_PIX(ORGINAL, x, y, 1);
          let COLOR = `rgb(${R},${G},${B})`;

          // TEXT += `<td style=background-color:${COLOR}>${VAL}</td>`;
          TEXT += `<td style=background-color:${COLOR}>${VAL} <br>${x}, ${y} (${COUNTER}) ${DIRECTIONS[COUNTER]}, ${DIRECTIONS_GRAYSCALE[COUNTER]}</td>`;
          COUNTER++;  
        }
        TEXT += "</tr><tr>";
      }
      TEXT += "</tr>";
      this._CREATEELEM(TEXT);
    }

    _CREATEELEM(DATA) 
    {
      let TABLE = document.getElementById('OUTPUT');
      TABLE.innerHTML = DATA;
      document.body.appendChild(TABLE);
    }
    _PLOT_GRAPH(X, Y, Z)
    {
      
       let SVG = document.getElementById('SVG');
        var element = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        element.setAttributeNS(null, 'x', (( 255*5) - (X * 5) + 5) + (Y*5) );
        element.setAttributeNS(null, 'y', ((255*5) + (X * 5) + 5) - ((Z * 5)));
        element.setAttribute('fill', `rgb(${X},${Y},${Z})`);
        // element.textContent  = `${X},${Y},${Z}`;
        element.style.fontSize = "5px";
        element.style.fontFamily = "Arial";
        var txt = document.createTextNode(".");
        element.appendChild(txt);
        SVG.appendChild(element);

    }
    _PLOT_GRAPH_SM(X, Y, Z, SVG)
    {
      var element = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      element.setAttributeNS(null, 'x', (256 - X) + Y );
      element.setAttributeNS(null, 'y', (256 + X) - Z );
      element.setAttribute('fill', `rgb(${X},${Y},${Z})`);
      element.style.fontSize = "5px";
      var txt = document.createTextNode(".");
      element.appendChild(txt);
      SVG.appendChild(element);
    }
    _GET_PLOT_AXIS(X, Y, Z)
    {
      return {
        X: (256 - X) + Y,
        Y: (256 + X) - Z
      };
    }
    _PLOT_GRAPH_CANVAS(X, Y, Z, context)
    { 
      let rect = new Shape((256 - X) + Y, (256 + X) - Z, 1, 1, `rgb(${X},${Y},${Z})`);
      context.fillStyle = rect.fill;
      context.fillRect(rect.x, rect.y, rect.w, rect.h);
  
    }
}