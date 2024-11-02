/**/
/**/
import { getCanvas, Canvas } from './components/canvas.js'
import AniObj, { Size, Point } from './components/object.js';
import Sprite from './components/sprite.js';

export enum pieceOf {
  C = 'C',
  A = 'A',
  T = 'T',
  P = 'P',
  R = 'R'
};

const pieceName = {
  R: 'KingWhite'//rey
  , P: 'PawnWhite'//peon
  , T: 'RookWhite'//torre
  , C: 'NightWhite'//caballo
  , A: 'BishopWhite'//alfil
}

export default class Piece {
  private squareSize = 50;
  obj: AniObj;
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  movements: any;
  movementsByLocation: number[];
  pieceType: pieceOf;
  private _location: Point;

  constructor(canvas: Canvas, pieceType: pieceOf, size: Size, point: Point,) {
    this.element = canvas.element;
    this.ctx = this.element.getContext('2d');

    this.movements = movementsByLocationp[pieceType]
    this.pieceType = pieceType;
    this.obj = AniObj(this.element, size, point);
    this.obj.sprite(new Sprite(`/FreePack/${pieceName[pieceType]}.png`));
  }

  public get locatin() {
    return this._location;
  }

  public set location(point: Point) {
    this._location = point;

    const index = pieces.findIndex((piecesC: any) => piecesC[0] ===
      point.x && piecesC[1] === point.y);

    this.movementsByLocation = this.movements[index];
  }
}

//type movementsByLocationp
const movementsByLocationp = {
  T: {
    0: [+1, +2, +3, +4, +8, +12],
    1: [-1, +1, +2, +4, +8, +12],
    2: [-1, -2, +1, +4, +8, +12],
    3: [-1, -2, -3, +4, +8, +12],
    4: [-4, +1, +2, +3, +4, +8],
    5: [+4, -1, +1, +2, +4],
    6: [+4, -1, -2, +1],
    7: [+4, -1, -2, -3, +4, +8],
    8: [+4, +8, +1, +2, +3, +4],
    9: [+4, +8, -1, +1, +2],
    10: [+4, +8, -1, -2, +1],
    11: [+4, +8, -1, -2, -3, +4],
    12: [+4, +8, +12],
    13: [+4, +8, +12],
  },
  C: {
    0: [+9, +6],
    1: [+6, +7, +9],
    2: [+2, +7, +9],
    3: [+2, +7],
    4: [-2, +6],
    5: [-2, +6, +7],
    6: [-6, +2, +7],
    7: [-6, +2],
    8: [-7, -2],
    9: [-9, -7, -2, +4],
    10: [-9, -7, -6, +2],
    11: [-9, -6],
    12: [-7, -2],
    13: [-4, -7],
  },
  A: {
    0: [+5, 10, +13],
    1: [+3, +5, +10],
    2: [+3, +5, +6],
    3: [+3, +6, +9],
    4: [-3, +5],
    5: [-5, -3, +3, +5, +10],
    6: [-5, -3, +3, +5],
    7: [-5, +3],
    8: [-3, -6],
    9: [-5, -3, +3],
    10: [-5, -10, -3, +3],
    11: [-5, -10],
    12: [-3, -6, -9],
    13: [-3, -8, -12],
  },
  P: {
    7: [-4],
    11: [-5],
    13: [-2],
  },
  R: {
    0: [+1, +2, +3, +4, +5, +8, +10, +12, +13],
    1: [-1, +1, +2, +3, +4, +5, +8, +10],
    2: [-1, -2, +1, +3, +4, +5, +6, +8],
    3: [-1, -2, -3, +3, +4, +6, +8, +9, 10],
    4: [-3, -4, +1, +2, +3, +4, +5, +8],
    5: [-5, -4, -3, -1, +1, +2, +3, +4, +5],
    6: [-5, -4, -3, -2, -1, +1, +3, +4, +5],
    7: [-5, -4, -3, -2, -1, +3, +4, +6],
    8: [-8, -6, -4, -3, +1, +2, +3, +4],
    9: [-8, -6, -5, -4, -3, -1, +1, +2, +3],
    10: [-10, -8, -5, -4, -3, -2, -1, +1, +3],
    11: [-10, -8, -5, -4, -3, -2, -1, +2],
    12: [-12, -9, -8, -6, -4, -3],
    13: [-13, -10, -8, -6, -3, -2],
  },
}

const pieces: any[] = [
  [5, 5, 'c'], [55, 5, 'c'], [105, 5, 'c'], [155, 5, 'c'],
  [5, 55, 'a'], [55, 55, 'a'], [105, 55, 'a'], [155, 55, 'a'],
  [5, 105, 't'], [55, 105, 't'], [105, 105, 't'], [155, 105, 't'],
  [5, 155, null], [155, 155, 'p']];