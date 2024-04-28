import PerlinNoise2D from "./Perlin_Noise"; // Import Perlin Noise function
import Cellular_Automata from "./Cellular_Automata"; // Import Cellular Automata function
const svg = d3.select("#grid"); // Select the SVG element

const numRows = 100; // Number of rows
const numCols = 150; // Number of columns
const cellSize = 10; // Size of each cell

const colorScale = d3.scaleLinear()
    .domain([0, 255]) // Domain of the scale
    .range(["green", "blue"]); // Color range

const handleAlgo = (algo) => {
    let grid = [];
    switch (algo) {
        case "Perlin_noise":
            const Shuffle = (arrayToShuffle) => {
                for(let e = arrayToShuffle.length-1; e > 0; e--) {
                    const index = Math.round(Math.random()*(e-1));
                    const temp = arrayToShuffle[e];
                    
                    arrayToShuffle[e] = arrayToShuffle[index];
                    arrayToShuffle[index] = temp;
                }
            }
            
            function MakePermutation() {
                const permutation = [];
                for(let i = 0; i < 256; i++) {
                    permutation.push(i);
                }
            
                Shuffle(permutation);
                
                for(let i = 0; i < 256; i++) {
                    permutation.push(permutation[i]);
                }
                
                return permutation;
            }
            let Permutation = MakePermutation();
            for (let r = 0; r < numRows; r++) {
                grid[r] = [];
                for (let c = 0; c < numCols; c++) {
                    grid[r][c] = (PerlinNoise2D(r * 0.1, c * 0.1, Permutation) + 1) / 2 * 255; // Normalize and scale
                }
            }
            console.log(',.')
            return grid;
           

        case "Cellular_Automata":
            grid = Cellular_Automata(60, numRows, numCols, 5);
            return grid;
            

        case "none":
            return []; // Return empty grid
    }
    
};

// Function to create a grid based on the selected algorithm
const createGrid = async (algorithm) => {
    // Clear the existing grid once
    svg.selectAll("rect").remove(); // Remove existing rectangles

    // Display a loading indicator (using a simple text element)
    svg.append("text")
        .attr("x", 20)
        .attr("y", 30)
        .text("Loading...");


    let grid = handleAlgo(algorithm); // Get the grid data based on the selected algorithm

    if (grid.length === 0) {
        svg.select("text").remove(); // Remove loading indicator
        return; // Nothing to render
    }

    // Remove loading indicator before rendering the new grid
    svg.select("text").remove();

    let data = [];

    // Populate data array with grid information
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            data.push({
                x: c * cellSize, // Horizontal position
                y: r * cellSize, // Vertical position
                value: grid[r][c], // The cell value
            });
        }
    }

    // Render the cells with colors based on the grid data
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => d.x) // Horizontal position
        .attr("y", (d) => d.y) // Vertical position
        .attr("width", cellSize) // Cell width
        .attr("height", cellSize) // Cell height
        .attr("fill", (d) => colorScale(d.value)); // Color based on cell value
};

// Function to handle the selection change and update the grid
const handleSelectionChange = () => {
    const select = document.getElementById("algorithm"); // Get the select element
    const selectedValue = select.value; // Get the selected value
    createGrid(selectedValue); // Create the grid based on the selected algorithm
};

// Attach the event listener to the dropdown
document.getElementById("algorithm").addEventListener("change", handleSelectionChange);
document.getElementById("regenerate").addEventListener("click", handleSelectionChange);



// Create the initial grid with default algorithm (Cellular Automata)
createGrid("Cellular_Automata");
