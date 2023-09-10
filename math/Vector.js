module.exports = class Vector {
    static get zero() {
        return new Vector(0, 0);
    }

    static get unitX() {
        return new Vector(1, 0);
    }

    static get unitY() {
        return new Vector(0, 1);
    }

    static Dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static Cross(v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
    }
    
    static angle(v1, v2) {
        return Math.acos(this.Dot(this.Normalize(v1), this.Normalize(v2)));
    }

    static Angle(v1) {
        return Math.acos(this.Dot(this.Normalize(v1), this.Normalize(Vector.unitX)));
    }

    static normalize(vector) {
        if (vector.equals(Vector.Zero)) {
            return Vector.Zero;
        }

        return vector.divide(vector.Length);
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get length () {
        return Math.sqrt(this.squaredLength);
    }

    get squaredLength() {
        return this.x * this.x + this.y * this.y;
    }

    get angle() {
        return Math.Atan2(this.y, this.x);
    }

    invert() {
        return new Vector(-this.x, -this.y);
    }

    plus(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    minus(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    scale(scale) {
        return new Vector(this.x * scale, this.y * scale);
    }

    divide(divide) {
        return new Vector(this.x / divide, this.y / divide);
    }

    equals(vector) {
        return this === vector || (vector.x === this.x && vector.y === this.y);
    }

    toString() {
        return `[${this.x}, ${this.y}]`;
    }
}