module.exports = class Graphics {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.buffer = new ImageData(width, height);
        this.zBuffer = new Uint8Array(width * height).fill(255);
    }

    clearBounds() {
        this.buffer = new ImageData(this.width, this.height);
        this.zBuffer.fill(255)
    }

    applyContext(context) {
        context.putImageData(this.buffer, 0, 0);
        this.clearBounds();
    }

    drawPixel(x, y, zIndex, r, g, b) {
        let position;
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
        position = this.width * y + x;

        if (!zIndex && this.zBuffer[position] < zIndex) return;
        
        this.zBuffer[position] = zIndex;
        position *= 4;

        this.buffer.data[position] = r;
        this.buffer.data[position + 1] = g;
        this.buffer.data[position + 2] = b;
        this.buffer.data[position + 3] = 255;
    }

    drawLine(x0, y0, x1, y1, zIndex, r, g, b) {
        const dx = Math.abs(x1 - x0),
            sx = x0 < x1 ? 1 : -1;
        const dy = Math.abs(y1 - y0),
            sy = y0 < y1 ? 1 : -1;
        let err = (dx > dy ? dx : -dy) / 2;
        while (true) {
            const e2 = err;
            this.drawPixel(x0, y0, zIndex, r, g, b);
            if (e2 > -dx) {
                err -= dy;
                x0 += sx;
            }
            if (e2 < dy) {
                err += dx;
                y0 += sy;
            }
            if (x0 === x1 && y0 === y1) break;
        }
    }

    drawRect(x, y, w, h, zIndex, r, g, b) {
        this.drawLine(x, y, x, y + h, zIndex, r, g, b);
        this.drawLine(x + w, y, x + w, y + h, zIndex, r, g, b);
        this.drawLine(x, y, x + w, y, zIndex, r, g, b);
        this.drawLine(x, y + h, x + w, y + h, zIndex, r, g, b);
    }

    fillRect(x, y, w, h, zIndex, r, g, b) {
        for (let x1 = x; x1 < x + w; x1++) {
            this.drawLine(x1, y, x1, y + h, zIndex, r, g, b);
        }
    }

    drawTexture(texture,
        x,
        y,
        w,
        h,
        xClip = 0,
        yClip = 0,
        wClip,
        hClip,
        zIndex) {
        let xShift = 0;
        let yShift = 0;

        w = w || texture.width;
        h = h || texture.height;
        wClip = wClip || texture.width;
        hClip = hClip || texture.height;

        if(h > this.height) {
            yShift = Math.floor((h - this.height) >> 1);
        }
        if(w > this.width) {
            yShift = Math.floor((w - this.width) >> 1);
        }

        for (let yP = yShift; yP < h - yShift; yP++) {
            const yOffset = yP + y;
            for (let xP = xShift; xP < w - xShift; xP++) {
                const xOffset = xP + x;
                const xS = Math.floor(lerp(0, wClip, xP / w));
                const yS = Math.floor(lerp(0, hClip, yP / h));

                const color = texture.getColor(xS + xClip, yS + yClip);
                if (color.alpha) this.drawPixel(xOffset, yOffset, color, zIndex);
            }
        }
    }
}