import matrix from './matrix';
import Matrix3x3 from './matrix3x3';
import Vector from './vector';
import Point from './point';

function Matrix4x4(elements) {
    this.size = 4;
    this.elements = elements || new Float32Array(16).fill(0);
}

Matrix4x4.prototype = Object.create(matrix);
Matrix4x4.prototype.constructor = Matrix4x4;

//this is not part of the matrix prototype because only 4x4s are multiplied in this renderer
Matrix4x4.prototype.matrixMultiply = function (other) {
    return new Matrix4x4([
        //row 1
        this.getElement(0, 0) * other.getElement(0, 0) + this.getElement(0, 1) * other.getElement(1, 0) + this.getElement(0, 2) * other.getElement(2, 0) + this.getElement(0, 3) * other.getElement(3, 0),
        this.getElement(0, 0) * other.getElement(0, 1) + this.getElement(0, 1) * other.getElement(1, 1) + this.getElement(0, 2) * other.getElement(2, 1) + this.getElement(0, 3) * other.getElement(3, 1),
        this.getElement(0, 0) * other.getElement(0, 2) + this.getElement(0, 1) * other.getElement(1, 2) + this.getElement(0, 2) * other.getElement(2, 2) + this.getElement(0, 3) * other.getElement(3, 2),
        this.getElement(0, 0) * other.getElement(0, 3) + this.getElement(0, 1) * other.getElement(1, 3) + this.getElement(0, 2) * other.getElement(2, 3) + this.getElement(0, 3) * other.getElement(3, 3),
        //row 2
        this.getElement(1, 0) * other.getElement(0, 0) + this.getElement(1, 1) * other.getElement(1, 0) + this.getElement(1, 2) * other.getElement(2, 0) + this.getElement(1, 3) * other.getElement(3, 0),
        this.getElement(1, 0) * other.getElement(0, 1) + this.getElement(1, 1) * other.getElement(1, 1) + this.getElement(1, 2) * other.getElement(2, 1) + this.getElement(1, 3) * other.getElement(3, 1),
        this.getElement(1, 0) * other.getElement(0, 2) + this.getElement(1, 1) * other.getElement(1, 2) + this.getElement(1, 2) * other.getElement(2, 2) + this.getElement(1, 3) * other.getElement(3, 2),
        this.getElement(1, 0) * other.getElement(0, 3) + this.getElement(1, 1) * other.getElement(1, 3) + this.getElement(1, 2) * other.getElement(2, 3) + this.getElement(1, 3) * other.getElement(3, 3),
        //row 3
        this.getElement(2, 0) * other.getElement(0, 0) + this.getElement(2, 1) * other.getElement(1, 0) + this.getElement(2, 2) * other.getElement(2, 0) + this.getElement(2, 3) * other.getElement(3, 0),
        this.getElement(2, 0) * other.getElement(0, 1) + this.getElement(2, 1) * other.getElement(1, 1) + this.getElement(2, 2) * other.getElement(2, 1) + this.getElement(2, 3) * other.getElement(3, 1),
        this.getElement(2, 0) * other.getElement(0, 2) + this.getElement(2, 1) * other.getElement(1, 2) + this.getElement(2, 2) * other.getElement(2, 2) + this.getElement(2, 3) * other.getElement(3, 2),
        this.getElement(2, 0) * other.getElement(0, 3) + this.getElement(2, 1) * other.getElement(1, 3) + this.getElement(2, 2) * other.getElement(2, 3) + this.getElement(2, 3) * other.getElement(3, 3),
        //row 4
        this.getElement(3, 0) * other.getElement(0, 0) + this.getElement(3, 1) * other.getElement(1, 0) + this.getElement(3, 2) * other.getElement(2, 0) + this.getElement(3, 3) * other.getElement(3, 0),
        this.getElement(3, 0) * other.getElement(0, 1) + this.getElement(3, 1) * other.getElement(1, 1) + this.getElement(3, 2) * other.getElement(2, 1) + this.getElement(3, 3) * other.getElement(3, 1),
        this.getElement(3, 0) * other.getElement(0, 2) + this.getElement(3, 1) * other.getElement(1, 2) + this.getElement(3, 2) * other.getElement(2, 2) + this.getElement(3, 3) * other.getElement(3, 2),
        this.getElement(3, 0) * other.getElement(0, 3) + this.getElement(3, 1) * other.getElement(1, 3) + this.getElement(3, 2) * other.getElement(2, 3) + this.getElement(3, 3) * other.getElement(3, 3),
    ]);
}

Matrix4x4.prototype.vectorMultiply = function (vector) {
    return new Vector(
        //w would be 0 in all cases
        this.getElement(0, 0) * vector.x + this.getElement(0, 1) * vector.y + this.getElement(0, 2) * vector.z + this.getElement(0, 3) * vector.w,
        this.getElement(1, 0) * vector.x + this.getElement(1, 1) * vector.y + this.getElement(1, 2) * vector.z + this.getElement(1, 3) * vector.w,
        this.getElement(2, 0) * vector.x + this.getElement(2, 1) * vector.y + this.getElement(2, 2) * vector.z + this.getElement(2, 3) * vector.w
    );
}

Matrix4x4.prototype.pointMultiply = function (point) {
    console.log("multiplying point by matrix");
    return new Point(
        //w would be 1 in all cases
        this.getElement(0, 0) * point.x + this.getElement(0, 1) * point.y + this.getElement(0, 2) * point.z + this.getElement(0, 3) * point.w,
        this.getElement(1, 0) * point.x + this.getElement(1, 1) * point.y + this.getElement(1, 2) * point.z + this.getElement(1, 3) * point.w,
        this.getElement(2, 0) * point.x + this.getElement(2, 1) * point.y + this.getElement(2, 2) * point.z + this.getElement(2, 3) * point.w
    );
}

Matrix4x4.prototype.transpose = function () {
    return new Matrix4x4([
        this.getElement(0, 0), this.getElement(1, 0), this.getElement(2, 0), this.getElement(3, 0),
        this.getElement(0, 1), this.getElement(1, 1), this.getElement(2, 1), this.getElement(3, 1),
        this.getElement(0, 2), this.getElement(1, 2), this.getElement(2, 2), this.getElement(3, 2),
        this.getElement(0, 3), this.getElement(1, 3), this.getElement(2, 3), this.getElement(3, 3),
    ]);
}

Matrix4x4.prototype.subMatrix = function(removeRowIndex, removeColIndex) {
    // hardcoded to avoid branching for performance
    switch (`${removeRowIndex}${removeColIndex}`) {
        case '00': return new Matrix3x3([this.getElement(1, 1), this.getElement(1, 2), this.getElement(1, 3), 
                                         this.getElement(2, 1), this.getElement(2, 2), this.getElement(2, 3),
                                         this.getElement(3, 1), this.getElement(3, 2), this.getElement(3, 3)
                                        ]);
        case '01': return new Matrix3x3([this.getElement(1, 0), this.getElement(1, 2), this.getElement(1, 3), 
                                         this.getElement(2, 0), this.getElement(2, 2), this.getElement(2, 3),
                                         this.getElement(3, 0), this.getElement(3, 2), this.getElement(3, 3)
                                        ]);
        case '02': return new Matrix3x3([this.getElement(1, 0), this.getElement(1, 1), this.getElement(1, 3), 
                                         this.getElement(2, 0), this.getElement(2, 1), this.getElement(2, 3),
                                         this.getElement(3, 0), this.getElement(3, 1), this.getElement(3, 3)
                                        ]);
        case '03': return new Matrix3x3([this.getElement(1, 0), this.getElement(1, 1), this.getElement(1, 2), 
                                         this.getElement(2, 0), this.getElement(2, 1), this.getElement(2, 2),
                                         this.getElement(3, 0), this.getElement(3, 1), this.getElement(3, 2)
                                        ]);

        case '10': return new Matrix3x3([this.getElement(0, 1), this.getElement(0, 2), this.getElement(0, 3), 
                                         this.getElement(2, 1), this.getElement(2, 2), this.getElement(2, 3),
                                         this.getElement(3, 1), this.getElement(3, 2), this.getElement(3, 3)
                                        ]);
        case '11': return new Matrix3x3([this.getElement(0, 0), this.getElement(0, 2), this.getElement(0, 3), 
                                         this.getElement(2, 0), this.getElement(2, 2), this.getElement(2, 3),
                                         this.getElement(3, 0), this.getElement(3, 2), this.getElement(3, 3)
                                        ]);
        case '12': return new Matrix3x3([this.getElement(0, 0), this.getElement(0, 1), this.getElement(0, 3), 
                                         this.getElement(2, 0), this.getElement(2, 1), this.getElement(2, 3),
                                         this.getElement(3, 0), this.getElement(3, 1), this.getElement(3, 3)
                                        ]);
        case '13': return new Matrix3x3([this.getElement(0, 0), this.getElement(0, 1), this.getElement(0, 2), 
                                         this.getElement(2, 0), this.getElement(2, 1), this.getElement(2, 2),
                                         this.getElement(3, 0), this.getElement(3, 1), this.getElement(3, 2)
                                        ]);

        case '20': return new Matrix3x3([this.getElement(0, 1), this.getElement(0, 2), this.getElement(0, 3), 
                                         this.getElement(1, 1), this.getElement(1, 2), this.getElement(1, 3),
                                         this.getElement(3, 1), this.getElement(3, 2), this.getElement(3, 3)
                                        ]);
        case '21': return new Matrix3x3([this.getElement(0, 0), this.getElement(0, 2), this.getElement(0, 3), 
                                         this.getElement(1, 0), this.getElement(1, 2), this.getElement(1, 3),
                                         this.getElement(3, 0), this.getElement(3, 2), this.getElement(3, 3)
                                        ]);
        case '22': return new Matrix3x3([this.getElement(0, 0), this.getElement(0, 1), this.getElement(0, 3), 
                                         this.getElement(1, 0), this.getElement(1, 1), this.getElement(1, 3),
                                         this.getElement(3, 0), this.getElement(3, 1), this.getElement(3, 3)
                                        ]);
        case '23': return new Matrix3x3([this.getElement(0, 0), this.getElement(0, 1), this.getElement(0, 2), 
                                         this.getElement(1, 0), this.getElement(1, 1), this.getElement(1, 2),
                                         this.getElement(3, 0), this.getElement(3, 1), this.getElement(3, 2)
                                        ]);
    
        case '30': return new Matrix3x3([this.getElement(0, 1), this.getElement(0, 2), this.getElement(0, 3), 
                                         this.getElement(1, 1), this.getElement(1, 2), this.getElement(1, 3),
                                         this.getElement(2, 1), this.getElement(2, 2), this.getElement(2, 3)
                                        ]);
        case '31': return new Matrix3x3([this.getElement(0, 0), this.getElement(0, 2), this.getElement(0, 3), 
                                         this.getElement(1, 0), this.getElement(1, 2), this.getElement(1, 3),
                                         this.getElement(2, 0), this.getElement(2, 2), this.getElement(2, 3)
                                        ]);
        case '32': return new Matrix3x3([this.getElement(0, 0), this.getElement(0, 1), this.getElement(0, 3), 
                                         this.getElement(1, 0), this.getElement(1, 1), this.getElement(1, 3),
                                         this.getElement(2, 0), this.getElement(2, 1), this.getElement(2, 3)
                                        ]);
        case '33': return new Matrix3x3([this.getElement(0, 0), this.getElement(0, 1), this.getElement(0, 2), 
                                         this.getElement(1, 0), this.getElement(1, 1), this.getElement(1, 2),
                                         this.getElement(2, 0), this.getElement(2, 1), this.getElement(2, 2)
                                        ]);
    }
    
    throw new Error('Invalid row/col');
}

Matrix4x4.prototype.minor = function (row, col) {
    return this.subMatrix(row, col).determinant();
}

Matrix4x4.prototype.cofactor = function (row, col) {
    return (row + col) % 2 == 0 ? this.minor(row, col) : -this.minor(row, col);
}

Matrix4x4.prototype.determinant = function () {
    return this.getElement(0, 0) * this.cofactor(0, 0) + this.getElement(0, 1) * this.cofactor(0, 1) + this.getElement(0, 2) * this.cofactor(0, 2) + this.getElement(0, 3) * this.cofactor(0, 3);
}

Matrix4x4.prototype.inverse = function () {

    const det = this.determinant();

    let cofactorMatrix = new Matrix4x4([
        this.cofactor(0, 0), this.cofactor(0, 1), this.cofactor(0, 2), this.cofactor(0, 3),
        this.cofactor(1, 0), this.cofactor(1, 1), this.cofactor(1, 2), this.cofactor(1, 3),
        this.cofactor(2, 0), this.cofactor(2, 1), this.cofactor(2, 2), this.cofactor(2, 3),
        this.cofactor(3, 0), this.cofactor(3, 1), this.cofactor(3, 2), this.cofactor(3, 3)
    ]);

    cofactorMatrix = cofactorMatrix.transpose();
    
    cofactorMatrix.elementwiseDiv(det);

    return cofactorMatrix;
}

Matrix4x4.getIdentity = function() {
    return new Matrix4x4([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
}

//Transformation functions:


Matrix4x4.prototype.toString = function() {
    return `\n
            [${this.getElement(0, 0)}, ${this.getElement(0, 1)}, ${this.getElement(0, 2)}, ${this.getElement(0, 3)}]\n
            [${this.getElement(1, 0)}, ${this.getElement(1, 1)}, ${this.getElement(1, 2)}, ${this.getElement(1, 3)}]\n
            [${this.getElement(2, 0)}, ${this.getElement(2, 1)}, ${this.getElement(2, 2)}, ${this.getElement(2, 3)}]\n
            [${this.getElement(3, 0)}, ${this.getElement(3, 1)}, ${this.getElement(3, 2)}, ${this.getElement(3, 3)}]`;
}


export default Matrix4x4;