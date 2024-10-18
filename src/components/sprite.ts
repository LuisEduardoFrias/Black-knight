/**/
export default class Sprite {
  img: HTMLImageElement;

  constructor(url: string, id?: string) {
    this.img = document.createElement('img');

    if (id) {
      this.img.id = id;
    }

    this.img.src = url; // Corrección aquí
  }
}

