/**
 * Toda matriz puede ser transformada en una matriz escalerizada (o escalerizada reducida) mediante una cantidad
 * finita de transformaciones elementales
 *
 * Test input:
 * 1 1 -1 | 10
 * 3 -2 -2 | 10
 * 5 5 3 |10
 *
 * Expected output:
 * 1 0 0 | 2
 * 0 1 0 | 3
 * 0 0 1 | -5
 */
var INPUT_MATRIX = [
    [1, 1, -1, 10],
    [3, -2, -2, 10],
    [5, 5, 3, 10]
];
function gauss_reduction(matrix) {
    // 1. Se ha de identificar la primera entrada no nula de la primera columna y establecerla como pivot
    var pivot = 0;
    for (var row in matrix) {
        console.log(row[0]);
    }
    return matrix; // change
}
var OUTPUT_MATRIX = gauss_reduction(INPUT_MATRIX);
