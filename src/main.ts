/**/
import './style.css'
import { getCanvas, Canvas } from './components/canvas.js'
import AniObj, { Size, Point } from './components/object.js';
import Sprite from './components/sprite.js';
import { TouchEvent } from './components/touch_event.js';

const spriteK = new Sprite('/FreePack/KingWhite.png');
const spriteP = new Sprite('/FreePack/PawnWhite.png');
const spriteR = new Sprite('/FreePack/RookWhite.png');
const spriteN = new Sprite('/FreePack/NightWhite.png');
const spriteB = new Sprite('/FreePack/BishopWhite.png');

const squareSize = 50;
const boardSize = 4;
const size: Size = { width: squareSize, height: squareSize };

//plano 1
function drawing(canvas: Canvas, timestamp: number) {
  canvas.element.style.width = '100%';
  canvas.element.style.height = '100%';
  canvas.text((timestamp).toString(), { x: 15, y: 20 }, 'black')
  canvas.backgroud('/roble-texture.jpg');
}
const canvas1 = getCanvas(drawing, null, 'cv1');

type piecesCordenate = [number, number, string | null];
const pieces: piecesCordenate[] = [
  [5, 5, 'c'], [55, 5, 'c'], [105, 5, 'c'], [155, 5, 'c'],
  [5, 55, 'a'], [55, 55, 'a'], [105, 55, 'a'], [155, 55, 'a'],
  [5, 105, 't'], [55, 105, 't'], [105, 105, 't'], [155, 105, 't'],
  [5, 155, null], [155, 155, 'p']];

type pieseSl = { size: Size, piece: string };
let pieceSelected: pieseSl | null;
let movements: piecesCordenate[] | null;

function drawBoard(canvas: Canvas, ctx: CanvasRenderingContext2D) {
  const centerX = 5;
  const centerY = 5;
  const border = 5;

  ctx.fillStyle = '#000000';
  ctx.fillRect(centerY - border, centerX - border,
    squareSize * 4 + (border * 2),
    squareSize * 4 + (border * 2));

  // Dibuja el tablero
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      // Calcula la posición del cuadrado
      let x = centerY + j * squareSize;
      let y = centerX + i * squareSize;

      // Define el color del cuadrado
      let color = (i + j) % 2 === 0 ? '#5b2c1b' : '#c7a181';
      // Comprueba si es el cuadrado combinado
      if (i === 3 && j === 0) {
        color = '#a83046';
      }

      ctx.fillStyle = color;

      if ((i === 3 && j === 1) || (i === 3 && j === 2)) {

        if (i === 3 && j === 1) {
          ctx.fillStyle = '#f78b3a';
          ctx.fillRect(x, y, squareSize, squareSize);
          ctx.fillStyle = '#f5d1b6';
          ctx.fillRect(x + 2, y + 2, squareSize - 1, squareSize - 1);
        }
        if (i === 3 && j === 2) {
          ctx.fillStyle = '#f78b3a';
          ctx.fillRect(x, y, squareSize, squareSize);
          ctx.fillStyle = '#f5d1b6';
          ctx.fillRect(x, y + 2, squareSize - 2, squareSize - 1);
        }
      }
      else {
        ctx.fillRect(x, y, squareSize, squareSize);
      }
    }
  }

  // Dibuja el texto en el cuadrado combinado
  canvas.text('Pawn = Queen', { x: centerY + 54, y: centerX + 164 }, '#643437', '14px Arial');
  canvas.text('promote the pawn', { x: centerY + 58, y: centerX + 174 }, '#643437', '10px Arial');
  canvas.text('then move the queen', { x: centerY + 52, y: centerX + 184 }, '#643437', '10px Arial');
  canvas.text('to the red square', { x: centerY + 60, y: centerX + 194 }, '#643437', '10px Arial');
}
function drawPiece(canvas: Canvas) {
  const element: HTMLCanvasElement = canvas.element;
  const ctx: CanvasRenderingContext2D = element.getContext('2d');
  const centerX = 5;
  const centerY = 5;

  const caballo1 = AniObj(element, size, { x: pieces[0][0], y: pieces[0][1] });
  caballo1.sprite(spriteN);
  const caballo2 = AniObj(element, size, { x: pieces[1][0], y: pieces[1][1] });
  caballo2.sprite(spriteN);
  const caballo3 = AniObj(element, size, { x: pieces[2][0], y: pieces[2][1] });
  caballo3.sprite(spriteN);
  const caballo4 = AniObj(element, size, { x: pieces[3][0], y: pieces[3][1] });
  caballo4.sprite(spriteN);

  const alfil1 = AniObj(element, size, { x: pieces[4][0], y: pieces[4][1] });
  alfil1.sprite(spriteB);
  const alfil2 = AniObj(element, size, { x: pieces[5][0], y: pieces[5][1] });
  alfil2.sprite(spriteB);
  const alfil3 = AniObj(element, size, { x: pieces[6][0], y: pieces[6][1] });
  alfil3.sprite(spriteB);
  const alfil4 = AniObj(element, size, { x: pieces[7][0], y: pieces[7][1] });
  alfil4.sprite(spriteB);

  const torre1 = AniObj(element, size, { x: pieces[8][0], y: pieces[8][1] });
  torre1.sprite(spriteR);
  const torre2 = AniObj(element, size, { x: pieces[9][0], y: pieces[9][1] });
  torre2.sprite(spriteR);
  const torre3 = AniObj(element, size, { x: pieces[10][0], y: pieces[10][1] });
  torre3.sprite(spriteR);
  const torre4 = AniObj(element, size, { x: pieces[11][0], y: pieces[11][1] });
  torre4.sprite(spriteR);

  const peon = AniObj(element, size, { x: pieces[13][0], y: pieces[13][1] });
  peon.sprite(spriteP);

  const rey = AniObj(element, size, { x: pieces[12][0], y: pieces[12][1] });
  rey.visibility = false;
  rey.sprite(spriteK);

}
function drawPieceSelected(canvas: Canvas) {
  if (pieceSelected) {
    const ctx: CanvasRenderingContext2D = canvas2?.ctx;
    ctx.fillStyle = "#f1ff0878";
    ctx.fillRect(pieceSelected.size.x, pieceSelected.size.y, squareSize, squareSize)

    const pieceFindIndex = pieces.findIndex((piecesC) => {
      if (piecesC[0] === pieceSelected.size.x &&
        piecesC[1] === pieceSelected.size.y) {
        return true;
      }
    });

    switch (pieceSelected.piece) {
      case 'c': { };
      case 'a': { };
      case 't': {
        pieces.filter((pc: piecesCordenate, index: number) => {
          movements = [];
          if (index === pieceFindIndex - 4) {
            if (!pc.piece) {
const piece: piecesCordenate = {
                size: pc.size,
                piece: 't'
              }
              movements.push(piece);
              }
          }
          if (index === pieceFindIndex - 1) {
            if (!pc.piece) {
const piece: piecesCordenate = {
                size: pc.size,
                piece: 't'
              }
              movements.push(piece);
              }
          }
          if (index === pieceFindIndex + 1) {
            if (!pc.piece) {
              const piece: piecesCordenate = {
                size: pc.size,
                piece: 't'
              }
              movements.push(piece);
              }
          }
          if (index === pieceFindIndex + 4) {
            if (!pc.piece) {
              const piece: piecesCordenate = {
                size: pc.size,
                piece: 't'
              }
              movements.push(piece);
            }
          }
        });
      };
      case 'r': { };
      case 'p': { };
    }
  }
}
function drawMovements(canvas: Canvas) {
  if (movements) {
    const ctx: CanvasRenderingContext2D = canvas2?.ctx;
    ctx.fillStyle = "#0dff0890";
    movements.forEach(m => {
      ctx.fillRect(m[0], m[1], squareSize, squareSize)
    })
  }
}
//plano 2
function drawing2(canvas: Canvas, _: number) {
  const element: HTMLCanvasElement = canvas.element;
  const ctx: CanvasRenderingContext2D | null = element.getContext('2d');
  canvas.element.width = 210;
  canvas.element.height = 210;
  element.style.cssText = `
  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);`

  //crear board
  drawBoard(canvas, ctx as CanvasRenderingContext2D);
  //crear piezas
  drawPiece(canvas);
  drawPieceSelected(canvas);
  drawMovements(canvas);
}
function collisions2(canvas: Canvas) {

}
const canvas2 = getCanvas(drawing2, collisions2, 'cv2');
canvas2.touchstart((event: TouchEvent) => {
  // ctx.clearRect(0, 0, element.width, element.height);
  const touch = event.touches[0];

  const x = touch.clientX - canvas2?.element.offsetLeft;
  const y = touch.clientY - canvas2?.element.offsetTop;

  const selectSize = {
    x: ((Math.floor(x / squareSize + 2) * 50) + 5),
    y: ((Math.floor(y / squareSize + 2) * 50) + 5)
  };

  const pieceFiltes = pieces.find((piecesC) => {
    if (piecesC[0] === selectSize.x && piecesC[1] === selectSize.y) {
      return true;
    }
  });
  // Calcula el índice del cuadro
  pieceSelected = {
    size: {
      x: ((Math.floor(x / squareSize + 2) * 50) + 5),
      y: ((Math.floor(y / squareSize + 2) * 50) + 5)
    },
    piece: pieceFiltes[2]
  }
});

const div = document.querySelector<HTMLDivElement>('#app');
div.style.border = '10px solid red';
div.style.padding = '10px';

div!.appendChild(canvas1.element);
div!.appendChild(canvas2.element);
