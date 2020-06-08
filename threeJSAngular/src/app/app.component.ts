// tslint:disable:max-line-length
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

interface Coords {
  width: number;
  rightX: number;
  leftX: number;
  upperY: number;
  lowerY: number;
  height: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {
  }

  title = 'threeJSAngular';

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  private cnv: HTMLCanvasElement;

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.cnv = document.getElementById('canvas') as HTMLCanvasElement;

    this.cnv.height = window.innerHeight;
    this.cnv.width = window.innerWidth;

    this.drawGraph(this.ctx, 'TestService', 'RemoteService', 0 , 0, 1);
  }

  private async drawGraph(
    ctx: CanvasRenderingContext2D,
    mainTitle: string = 'NaN',
    subTitle: string = 'NaN',
    posX: number = 0,
    posY: number = 0,
    subRects: number = 0
    ) {
    const subRectWidth = 450;
    const addWidth = 30 * (subRects - 1);
    const widthMain = (150 + (subRectWidth * subRects)) + addWidth;

    const mainRectCoords = await this.drawMainRect(ctx, mainTitle, posX, posY, widthMain);

    let leftX = mainRectCoords.leftX;
    for (let i = 0; i < subRects; i++) {
      this.drawSubRectangle(ctx, subTitle, mainRectCoords.leftX + leftX);
      leftX += 480;
    }
  }

  private async drawMainRect(
    ctx: CanvasRenderingContext2D,
    mainTitle: string = 'NaN',
    posX: number = 0,
    posY: number = 0,
    graphWidth: number = 600,
  ): Promise<Coords> {
    const graphHeight = 350;
    const font = 'Arial';

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 0.5;

    const mainRectCoords = this.drawRect(ctx, posX, posY, graphWidth, graphHeight);
    const mainTitleRectCoords = this.drawRect(ctx, mainRectCoords.leftX, posY, mainRectCoords.width, graphHeight - 300, 'rgba(255,41,41,0.91)');
    const greyRectCoords = this.drawRect(ctx, mainRectCoords.leftX, posY + 300, mainRectCoords.width, graphHeight - 300, 'rgba(13,13,13,0.1)');
    const mainArrDCoords = await this.insertImage(ctx, 'assets/img/arr_down.png', mainTitleRectCoords.leftX + 10, posY + 13, 0.13, 0.13);
    const mainArrDTxtCoords = this.typeText('25px ' + font, 'rgb(255,255,255)', 'left', '2,231,908', mainArrDCoords.rightX + 5, posY + 33);
    const mainTxtCoords = this.typeText('25px ' + font, 'rgb(255,255,255)', 'center', mainTitle, posX + mainRectCoords.width / 2, posY + 33);
    const mainIconCoords = await this.insertImage(ctx, 'assets/img/rem_black.png', mainTxtCoords.leftX - 35, posY + 9, 0.06, 0.06);
    const yellowRectCoords = this.drawRect(ctx,  mainTxtCoords.rightX + 5, posY + 10, 50, 30, 'rgba(238,218,44,0.7)', 10, 10, 10, 10);
    const yellowTxtCoords = this.typeText('20px ' + font, 'rgb(0,0,0)', 'left', 'zh2', yellowRectCoords.leftX + 10, posY + 33);
    const mainArrUCoords = await this.insertImage(ctx, 'assets/img/arr_up.png', mainRectCoords.rightX - 155, posY + 13, 0.13, 0.13);
    const mainArrUTxtCoords = this.typeText('25px ' + font, 'rgb(255,255,255)', 'left', '1,023,783', mainArrUCoords.rightX + 5, posY + 33);
    const pipelineTxtCoords = this.typeText('20px ' + font, 'rgb(0,0,0)', 'left', 'Pipeline Id: 120', mainRectCoords.leftX + 10, posY + 330);
    const verTxtCoords = this.typeText('20px ' + font, 'rgb(0,0,0)', 'left', 'Version Id: 5', pipelineTxtCoords.rightX + 30, posY + 330);
    const instTxtCoords = this.typeText('20px ' + font, 'rgb(0,0,0)', 'left', 'Instances: 12,234', mainRectCoords.rightX - 190, posY + 330);

    return new Promise<Coords>(resolve => {
      resolve( {
        upperY: posY,
        lowerY: posY + graphHeight,
        height: graphHeight,
        leftX: posX,
        rightX: posX + graphWidth,
        width: graphWidth
    });
    });
  }

  private async drawSubRectangle(ctx: CanvasRenderingContext2D,
                                 subTitle: string = 'NaN',
                                 posX: number = 0,
                                 posY: number = 0) {
    const font = 'Arial';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 0.5;

    const upperSubRectCoords = this.drawRect(ctx, posX + 75, posY + 60, 450, 180, null, 10, 10, 0, 0);
    const lowerSubRectCoords = this.drawRect(ctx, upperSubRectCoords.leftX, upperSubRectCoords.lowerY, 450, 50, 'rgba(28,168,51,0.81)');
    const subArrowDCoords = await this.insertImage(ctx, 'assets/img/arr_down.png', lowerSubRectCoords.leftX + 10, lowerSubRectCoords.upperY + 15, 0.1, 0.1);
    const subArrDTxtCoords = this.typeText('22px ' + font, 'rgb(255,255,255)', 'left', '12,441', subArrowDCoords.rightX + 2, subArrowDCoords.upperY + 16);
    const subTxtCoords = this.typeText('20px ' + font, 'rgb(255,255,255)', 'center', subTitle, lowerSubRectCoords.leftX + (lowerSubRectCoords.width / 2), lowerSubRectCoords.upperY + 31);
    const subIconCoords = await this.insertImage(ctx, 'assets/img/check_mark.png', subTxtCoords.leftX - 30, lowerSubRectCoords.upperY + 12, 0.04, 0.04);
    const arrSubUCoords = await this.insertImage(ctx, 'assets/img/arr_up.png', lowerSubRectCoords.rightX - 130, lowerSubRectCoords.upperY + 15, 0.1, 0.1);
    const subArrUTxtCoords = this.typeText('20px ' + font, 'rgb(255,255,255)', 'left', '1,222,710', arrSubUCoords.rightX + 2, arrSubUCoords.upperY + 16);
    const reqRectCoords = this.drawRect(ctx, lowerSubRectCoords.leftX + lowerSubRectCoords.width / 2 - 120, lowerSubRectCoords.upperY - 130, 70, 110, 'rgba(11,126,12,0.7)', 10, 10, 10, 10);
    const reqTxtCoords = this.typeText('20px ' + font, 'rgb(0,0,0)', 'center', 'Request', reqRectCoords.leftX + reqRectCoords.width / 2, reqRectCoords.upperY - 10);
    const respRectCoords = this.drawRect(ctx, lowerSubRectCoords.leftX + lowerSubRectCoords.width / 2 + 50, posY + 110, 70, 110, 'rgba(11,126,12,0.7)', 10, 10, 10, 10);
    const respTxtCoords = this.typeText('20px ' + font, 'rgb(0,0,0)', 'center', 'Response', respRectCoords.leftX + respRectCoords.width / 2, respRectCoords.upperY - 10);
  }

  private drawProgressBar(ctx: CanvasRenderingContext2D, value: number) {
    // let width = parseInt($('#width').val());
    // let height = parseInt($('#height').val());
    // let max = parseInt($('#max').val());
    // let val = Math.min(Math.max(parseInt(parseInt($('#val').val())), 0), max);
    // let  direction = $('input[name="direction"]:checked').val();

    // Draw the background
    ctx.fillStyle = 'rgba(11,126,12,0.7)';
    const fillVal = Math.min(Math.max(value / 100, 0), 1);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, 40, fillVal * 100);
  }

  private async insertImage(ctx: CanvasRenderingContext2D, path: string,
                            dx: number, dy: number, widthScale: number, heightScale: number): Promise<Coords> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = path;
      image.onload = () => {
        ctx.drawImage(image, dx, dy, image.width * widthScale, image.height * heightScale);
        resolve({
          width: image.width * widthScale,
          rightX: (image.width * widthScale) + dx,
          leftX: dx,
          upperY: dy,
          lowerY: dy + (image.height * widthScale),
          height: image.height * widthScale} as Coords);
      };
    });
  }

  private typeText(font: string, fillStyle: string, textAlign: CanvasTextAlign, text: string, x: number, y: number): Coords {
    this.ctx.font = font;
    this.ctx.fillStyle = fillStyle;
    this.ctx.textAlign = textAlign;
    this.ctx.fillText(text, x, y);

    let leftX = 0;

    if (textAlign === 'center') {
      leftX = x - this.ctx.measureText(text).width / 2;
    } else if (textAlign === 'left') {
      leftX = x;
    }

    return {
      width: this.ctx.measureText(text).width,
      leftX,
      rightX: leftX + this.ctx.measureText(text).width,
      height: 0,
      upperY: 0,
      lowerY: 0
    };
  }

  private roundRect(ctx: CanvasRenderingContext2D,
                    x: number, y: number,
                    width: number, height: number,
                    rLeftUpper: number, rRightUpper: number, rRightLower: number, rLeftLower: number) {
    let radius = {
      tl: rLeftUpper,
      tr: rRightUpper,
      br: rRightLower,
      bl: rLeftLower
    };
    if (typeof rLeftUpper === 'undefined' &&
      typeof rRightUpper === 'undefined' &&
      typeof rRightLower === 'undefined' &&
      typeof rLeftLower === 'undefined') {
      rLeftUpper = 5;
      rRightUpper = 5;
      rRightLower = 5;
      rLeftLower = 5;
    }
    if (typeof rLeftUpper === 'number' &&
      typeof rRightUpper === 'number' &&
      typeof rRightLower === 'number' &&
      typeof rLeftLower === 'number') {
      radius = {
        tl: rLeftUpper,
        tr: rRightUpper,
        br: rRightLower,
        bl: rLeftLower
      };
    } else {
      const defaultRadius = {
        tl: 0,
        tr: 0,
        br: 0,
        bl: 0
      };
      for (const side of Object.keys(defaultRadius)) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr); // right upper corner
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height); // right lower corner
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl); // left lower corner
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y); // left upper corner
    ctx.closePath();
  }

  private drawRect(context: CanvasRenderingContext2D,
                   x: number, y: number, w: number, h: number,
                   color: string = null,
                   rLeftUpper: number = null,
                   rRightUpper: number = null,
                   rRightLower: number = null,
                   rLeftLower: number = null): Coords {
    if (rLeftUpper !== null && rRightUpper !== null && rRightLower !== null && rLeftLower !== null) {
      this.roundRect(context, x, y, w, h, rLeftUpper, rRightUpper, rRightLower, rLeftLower);
    } else {
      context.beginPath();
      context.rect(x, y, w, h);
      context.closePath();
    }
    if (color !== null) {
      context.fillStyle = color;
      context.fill();
    }
    context.stroke();

    return {
      width: w,
      rightX: w + x,
      leftX: x,
      height: h,
      lowerY: y + h,
      upperY: y};
  }
}
