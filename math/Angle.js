module.exports = class AngleHelper {
    static toRadian(angle) {
        return Math.PI * angle / 180.0;
    }

    static toDegrees(angle) {
        return angle * (180.0 / Math.PI);
    }
}