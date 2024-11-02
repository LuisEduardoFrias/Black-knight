/**/
import './style.css'
import { getCanvas, Canvas } from './components/canvas.js'
import Piece, { pieceOf } from './components/piece.ts';
import AniObj, { Size, Point } from './components/object.js';
import Sprite from './components/sprite.js';

const squareSize = 50;
const boardSize = 4;
const size: Size = { width: squareSize, height: squareSize };
type pieceID = `${pieceOf}-${number}`;
type piecesCordenate = { point: Point, pieceId: pieceID | null };

const pieces: piecesCordenate[] = [
  { point: { x: 5, y: 5 }, pieceId: null }, { point: { x: 55, y: 5, }, pieceId: null }, { point: { x: 105, y: 5, }, pieceId: null }, { point: { x: 155, y: 5, }, pieceId: null },
  { point: { x: 5, y: 55, }, pieceId: null }, { point: { x: 55, y: 55, }, pieceId: null }, { point: { x: 105, y: 55, }, pieceId: null }, { point: { x: 155, y: 55, }, pieceId: null },
  { point: { x: 5, y: 105, }, pieceId: null }, { point: { x: 55, y: 105, }, pieceId: null }, { point: { x: 105, y: 105, }, pieceId: null }, { point: { x: 155, y: 105, }, pieceId: null },
  { point: { x: 5, y: 155, }, pieceId: null }, { point: { x: 155, y: 155, }, pieceId: null }];

//plano 1
function drawing(canvas: Canvas, timestamp: number) {
  canvas.element.style.width = '100%';
  canvas.element.style.height = '100%';
  canvas.text((timestamp).toString(), { x: 15, y: 20 }, 'black')
  canvas.backgroud('/roble-texture.jpg');
}
const canvas1 = getCanvas(drawing, null, 'cv1');

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

  const caballo1 = new Piece(canvas2, pieceOf.C, size, { x: pieces[0].point.x, y: pieces[0].point.y });
  const caballo2 = new Piece(canvas2, pieceOf.C, size, { x: pieces[1].point.x, y: pieces[1].point.y });
  const caballo3 = new Piece(canvas2, pieceOf.C, size, { x: pieces[2].point.x, y: pieces[2].point.y });
  const caballo4 = new Piece(canvas2, pieceOf.C, size, { x: pieces[3].point.x, y: pieces[3].point.y });

  const alfil1 = new Piece(canvas2, pieceOf.A, size, { x: pieces[4].point.x, y: pieces[4].point.y });
  const alfil2 = new Piece(canvas2, pieceOf.A, size, { x: pieces[5].point.x, y: pieces[5].point.y });
  const alfil3 = new Piece(canvas2, pieceOf.A, size, { x: pieces[6].point.x, y: pieces[6].point.y });
  const alfil4 = new Piece(canvas2, pieceOf.A, size, { x: pieces[7].point.x, y: pieces[7].point.y });

  const torre1 = new Piece(canvas2, pieceOf.T, size, { x: pieces[8].point.x, y: pieces[8].point.y });
  const torre2 = new Piece(canvas2, pieceOf.T, size, { x: pieces[9].point.x, y: pieces[9].point.y });
  const torre3 = new Piece(canvas2, pieceOf.T, size, { x: pieces[10].point.x, y: pieces[10].point.y });
  const torre4 = new Piece(canvas2, pieceOf.T, size, { x: pieces[11].point.x, y: pieces[11].point.y });

  const peon = new Piece(canvas2, pieceOf.P, size, { x: pieces[13].point.x, y: pieces[13].point.y });

  const rey = new Piece(canvas2, pieceOf.R, size, { x: pieces[12].point.x, y: pieces[12].point.y });
  rey.visibility = false;
}

function drawPieceSelected(canvas: Canvas) {
/*  if (pieceSelected) {
    const ctx: CanvasRenderingContext2D = canvas.ctx;
    ctx.fillStyle = "#f1ff0878";
    ctx.fillRect(pieceSelected.point.x, pieceSelected.point.y, squareSize,
      squareSize);
  }
  */
}
function drawMovements(canvas: Canvas) {
/*  if (movements.length > 0) {
    const ctx: CanvasRenderingContext2D = canvas?.ctx;
    ctx.fillStyle = "#0dff0890";

    let index;
    movements.forEach(m => {
      ctx.fillRect(m[0], m[1], squareSize, squareSize)
      index = m[3];
    })
    pieces[index][2] = "m";
  }
  */
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

  const pointX = touch.clientX - canvas2?.element.offsetLeft;
  const pointY = touch.clientY - canvas2?.element.offsetTop;

  let rectIndexSelected;
  const rectPointSelected = pieces.find((piecesC: piecesCordenate, index: number) => {
    const x = ((Math.floor(pointX / squareSize + 2) * 50) + 5);
    const y = ((Math.floor(pointY / squareSize + 2) * 50) + 5);

    if (piecesC[0] === x && piecesC[1] === y) {
      rectIndexSelected = index;
      return true;
    }
  });

  if (rectPointSelected[2] !== null && rectPointSelected[2] !== 'm') {
    movements = [];

    if (rectPointSelected) {
      switch (rectPointSelected[2]) {
        /* case 'c': {
           pieces.filter((pc: piecesCordenate, index: number) => {
             if (index === rectIndexSelected - 4) {
               if (!pc[2]) {
                 movements.push([...pc, 0]);
               }
             }
             if (index === rectIndexSelected - 1) {
               if (!pc[2]) {
                 movements.push([...pc, 0]);
               }
             }
             if (index === rectIndexSelected + 1) {
               if (!pc[2]) {
                 movements.push([...pc, 0]);
               }
             }
             if (index === rectIndexSelected + 4) {
               if (!pc[2]) {
                 movements.push([...pc, 0]);
               }
             }
           });
           break;
         };
         case 'a': {
           pieces.filter((pc: piecesCordenate, index: number) => {
             if (index === rectIndexSelected - 4) {
               if (!pc[2]) {
               }
               movements.push([...pc, 0]);
             }
             if (index === rectIndexSelected - 1) {
               if (!pc[2]) {
                 movements.push([...pc, 0]);
               }
             }
             if (index === rectIndexSelected + 1) {
               if (!pc[2]) {
                 movements.push([...pc, 0]);
               }
             }
             if (index === rectIndexSelected + 4) {
               if (!pc[2]) {
                 movements.push([...pc, 0]);
               }
             }
           });
           break;
         };*/
        case 't': {
          pieces.forEach((pc: piecesCordenate, index: number) => {
            if (index === rectIndexSelected - 4) {
              if (!pc[2]) {
                movements.push([...pc, rectIndexSelected - 4]);
              }
            }
            if (index === rectIndexSelected - 1) {
              if (!pc[2]) {
                movements.push([...pc, rectIndexSelected - 1]);
              }
            }
            if (index === rectIndexSelected + 1) {
              if (!pc[2]) {
                movements.push([...pc, rectIndexSelected + 1]);
              }
            }
            if (index === rectIndexSelected + 4) {
              if (!pc[2]) {
                movements.push([...pc, rectIndexSelected + 4]);
              }
            }
          });
          break;
        };
        /* case 'r': {
           pieces.filter((pc: piecesCordenate, index: number) => {
             if (index === rectIndexSelected - 4) {
               if (!pc[2]) {
                 movements.push([...pc, 0]);
               }
             }
             if (index === rectIndexSelected - 1) {
               if (!pc[2]) {
                 movements.push([...pc, 0]);
               }
             }
             if (index === rectIndexSelected + 1) {
               if (!pc[2]) {
                 movements.push([...pc, 0]);
               }
             }
             if (index === rectIndexSelected + 4) {
               if (!pc[2]) {
                 movements.push([...pc, 0]);
               }
             }
           });
           break;
         };
         case 'p': {
           pieces.filter((pc: piecesCordenate, index: number) => {
             if (index === rectIndexSelected - 4) {
               if (!pc[2]) {
                 movements.push([...pc, 0]);
               }
             }
             if (index === rectIndexSelected - 1) {
               if (!pc[2]) {
                 movements.push([...pc, 0]);
               }
             }
             if (index === rectIndexSelected + 1) {
               if (!pc[2]) {
                 movements.push([...pc, 0]);
               }
             }
             if (index === rectIndexSelected + 4) {
               if (!pc[2]) {
                 movements.push([...pc, 0]);
               }
             }
           });
           break;
         };*/
      }
    }
  } else if (rectPointSelected[2] === 'm') {
    pieces[movements[0][3]][0] = movements[0][0];
    pieces[movements[0][3]][1] = movements[0][1];
    pieces[movements[0][3]][2] = movements[0][2];


    pieceSelected = null;
    return;
  }

  /*
    if (pieceSelected) {
      
    }
  */

  // Calcula el índice del cuadro
  pieceSelected = {
    x: ((Math.floor(x / squareSize + 2) * 50) + 5),
    y: ((Math.floor(y / squareSize + 2) * 50) + 5)
  }
  //  pieceIndex



});


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


const div = document.querySelector<HTMLDivElement>('#app');

if (div) {
  div.style.border = '10px solid red';
  div.style.padding = '10px';
}

div!.appendChild(canvas1.element);
div!.appendChild(canvas2.element);
