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

type Matrix = Array<number[]>

const INPUT_MATRIX : Matrix = 
[
    [2, 1, 0, 1, 6],
    [0, 0, 1, -2, -3],
    [0, 1, 2, -1, -2],
    [-2, 2, 1, 3, 0]
]

function helpers() {
    function vector_sum(vector1 : number[], vector2 : number[]) {
        let result : number[] = vector1.map((value: number, index: number) => value + vector2[index]);

        return result;
    }

    function vector_substraction(vector1 : number[], vector2 : number[]) {
        let result : number[] = vector1.map((value: number, index: number) => value - vector2[index]);

        return result;
    }

    function vector_scalar(vector : number[], scalar : number) {
        console.log(`Pivot: [${vector}]`)
        console.log("Scalar: " + scalar)

        let result : number[] = vector.map(value => value * scalar);

        console.log(`Vector post scalar: [${result}]`)

        return result;
    }

    function are_equal(vector1 : number[], vector2 : number[]) {
        return vector1.every((item, index) => vector2[index] === item) && vector2.every((item, index) => vector1[index] === item);
    }

    return {
        vector_sum,
        vector_substraction,
        vector_scalar,
        are_equal
    }
}

function gauss_reduction(input_matrix : Matrix, output_matrix? : Matrix) : Matrix {

    const hook = helpers();

    for(let [index,row] of input_matrix.entries()) {
        // input_matrix[0][0] = input_matrix's first row, first element
        if(input_matrix[0][0] !== 0) break; // if first row is already pivot, exit
        
        // row's first element
        if(row[0] !== 0) { 
            let temporal_copy_of_row = input_matrix[0];
            input_matrix[0] = row;
            input_matrix[index] = temporal_copy_of_row;
        }
    }
    
    console.table(input_matrix)

    input_matrix.forEach((row, index) => {
        if(index !== 0) { // first row? skip
            input_matrix[index] = hook.vector_substraction(row, hook.vector_scalar(input_matrix[0], row[0]/input_matrix[0][0]))
        }
    })

 

    if(output_matrix === undefined) {
        output_matrix = input_matrix.map((row, index) => 
            index === 0 ? row : [row[0]]
        )
    } else {
        const row_to_update_index = output_matrix.findIndex((row, index, output_matrix) => row.length < output_matrix[index-1]?.length)
    
        output_matrix[row_to_update_index] = [...output_matrix[row_to_update_index], ...input_matrix[0]]
     
        for(let [index, row] of output_matrix.entries()) {
            if(index > row_to_update_index) output_matrix[index].push(0)
        }
    }

    

    console.log("\n Output matrix")
    console.table(output_matrix)

    
    
    input_matrix = input_matrix.map(row => row.slice(1, row.length)).splice(1,input_matrix.length)

    console.log("\n Current working window")
    console.table(input_matrix)

    console.log("***End of iteration ****")
   
    if(input_matrix.length) return gauss_reduction(input_matrix, output_matrix)
    return output_matrix;
}

const OUTPUT_MATRIX : Matrix = gauss_reduction(INPUT_MATRIX);
console.table(OUTPUT_MATRIX)
