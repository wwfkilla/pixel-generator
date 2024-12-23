let gridSize = 20; // Size of each cell
let cols, rows;
let colors = [];
let colorPicker; // Declare a color picker variable
let showGrid = true; // Variable to control grid visibility

function setup() {
  createCanvas(400, 400);
  cols = width / gridSize;
  rows = height / gridSize;

  // Initialize the grid with white color
  for (let i = 0; i < cols; i++) {
    colors[i] = [];
    for (let j = 0; j < rows; j++) {
      colors[i][j] = color(255);
    }
  }

  // Create a button to save the canvas as PNG
  let saveButton = createButton('Save as PNG');
  saveButton.position(width + 10, 10); // Position it on the right side

  // Create a color picker
  colorPicker = createColorPicker('#000000'); // Default color is black
  colorPicker.position(width + 10, 40); // Position it below the save button
}

function draw() {
  background(220);

  // Draw the grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(colors[i][j]);
      if (showGrid) {
        stroke(0); // Show grid lines
      } else {
        noStroke(); // Hide grid lines
      }
      rect(i * gridSize, j * gridSize, gridSize, gridSize);
    }
  }
}

function mousePressed() {
  updateGrid();
}

function mouseDragged() {
  updateGrid();
}

function updateGrid() {
  let x = floor(mouseX / gridSize);
  let y = floor(mouseY / gridSize);

  // Left click to color a pixel with the selected color
  if (mouseButton === LEFT && x >= 0 && x < cols && y >= 0 && y < rows) {
    colors[x][y] = colorPicker.color();
  }
  
  // Right click to erase a pixel (color it white)
  if (mouseButton === RIGHT && x >= 0 && x < cols && y >= 0 && y < rows) {
    colors[x][y] = color(255);
  }
}

// Function to save the canvas as PNG
function saveArtwork() {
    showGrid = false; // Hide grid lines
    redraw(); // Redraw the canvas without grid lines
    saveCanvas('pixel_art', 'png'); // Save the canvas
    showGrid = true; // Show grid lines again
    redraw(); // Redraw the canvas with grid lines
  }
  

// Prevent the context menu from appearing on right-click
function contextMenu(event) {
  return false;
}
document.oncontextmenu = contextMenu;
