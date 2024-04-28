class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
}

function GetConstantVector(v) {
    // v is the value from the permutation table
    const h = v & 3;
    if (h === 0) {
        return new Vector2(1.0, 1.0);
    } else if (h === 1) {
        return new Vector2(-1.0, 1.0);
    } else if (h === 2) {
        return new Vector2(-1.0, -1.0);
    } else {
        return new Vector2(1.0, -1.0);
    } // Ensure each conditional has a closing brace
}

function Fade(t) {
    return ((6 * t - 15) * t + 10) * t * t * t;
}

function Lerp(t, a1, a2) {
    return a1 + t * (a2 - a1);
}

const PerlinNoise2D = (x, y, Permutation) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);

    const topRight = new Vector2(xf - 1.0, yf - 1.0);
    const topLeft = new Vector2(xf, yf - 1.0);
    const bottomRight = new Vector2(xf - 1.0, yf);
    const bottomLeft = new Vector2(xf, yf);

    const valueTopRight = Permutation[Permutation[X + 1] + Y + 1];
    const valueTopLeft = Permutation[Permutation[X] + Y + 1];
    const valueBottomRight = Permutation[Permutation[X + 1] + Y];
    const valueBottomLeft = Permutation[Permutation[X] + Y];

    const dotTopRight = topRight.dot(GetConstantVector(valueTopRight));
    const dotTopLeft = topLeft.dot(GetConstantVector(valueTopLeft));
    const dotBottomRight = bottomRight.dot(GetConstantVector(valueBottomRight));
    const dotBottomLeft = bottomLeft.dot(GetConstantVector(valueBottomLeft));

    const u = Fade(xf);
    const v = Fade(yf);

    return Lerp(
        u,
        Lerp(v, dotBottomLeft, dotTopLeft),
        Lerp(v, dotBottomRight, dotTopRight)
    ); // Ensure correct number of closing braces
};

export default PerlinNoise2D;
