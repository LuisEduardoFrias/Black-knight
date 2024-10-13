/**/
import './style.css'
import { setupCounter } from './counter.ts'
import { canvasD2 } from './components/canvas.ts'

function drawing() {

}

function collisions() {

}

const { ctx, canvas } = canvasD2(drawing, collisions);

document.querySelector<HTMLDivElement>('#app')!.appendChild(canvas);
