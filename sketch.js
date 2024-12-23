let gridSize = 20; // Size of each cell
let cols, rows;
let colors = [];
let colorPicker; // Declare a color picker variable
let opacitySlider; // Declare an opacity slider variable
let showGrid = true; // Variable to control grid visibility
let gridOpacity = 255; // Default grid opacity
let dialogOverlay; // Overlay for the custom dialog
let promptActive = false; // Flag to indicate if confirmation prompt is active

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder'); // Attach the canvas to the 'sketch-holder' div

  cols = width / gridSize;
  rows = height / gridSize;

  // Initialize the grid with white color
  initializeGrid();

  // Select the button and color pickers from the HTML
  let saveButton = select('#saveButton');
  saveButton.mousePressed(saveArtwork);

  let clearButton = select('#clearButton'); // Select the clear button
  clearButton.mousePressed(showDialog); // Attach the showDialog function

  colorPicker = select('#colorPicker');
  colorPicker.value('#000000'); // Default color is black

  opacitySlider = select('#opacitySlider');
  opacitySlider.input(updateGridOpacity); // Attach the updateGridOpacity function

  dialogOverlay = select('#dialogOverlay'); // Select the dialog overlay
  select('#confirmButton').mousePressed(clearCanvas); // Confirm button clears the canvas
  select('#cancelButton').mousePressed(hideDialog); // Cancel button hides the dialog
}

function draw() {
  background(220); // Set a fixed background color

  // Draw the grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(colors[i][j]);
      if (showGrid) {
        stroke(0, 0, 0, gridOpacity); // Set grid opacity
      } else {
        noStroke(); // Hide grid lines
      }
      rect(i * gridSize, j * gridSize, gridSize, gridSize);
    }
  }
}

function mousePressed() {
  if (!promptActive) {
    updateGrid();
  }
}

function mouseDragged() {
  if (!promptActive) {
    updateGrid();
  }
}

function updateGrid() {
  let x = floor(mouseX / gridSize);
  let y = floor(mouseY / gridSize);

  // Left click to color a pixel with the selected color
  if (mouseButton === LEFT && x >= 0 && x < cols && y >= 0 && y < rows) {
    colors[x][y] = color(colorPicker.value());
  }
  
  // Right click to erase a pixel (color it white)
  if (mouseButton === RIGHT && x >= 0 && x < cols && y >= 0 && y < rows) {
    colors[x][y] = color(255);
  }
}

// Update grid opacity based on the slider value
function updateGridOpacity() {
  gridOpacity = opacitySlider.value();
}

// Initialize the grid with white color
function initializeGrid() {
  for (let i = 0; i < cols; i++) {
    colors[i] = [];
    for (let j = 0; j < rows; j++) {
      colors[i][j] = color(255);
    }
  }
}

// Show the custom dialog
function showDialog() {
  promptActive = true;
  dialogOverlay.style('display', 'flex'); // Show the dialog
}

// Hide the custom dialog
function hideDialog() {
  promptActive = false;
  dialogOverlay.style('display', 'none'); // Hide the dialog
}

// Function to clear the canvas
function clearCanvas() {
  hideDialog(); // Hide the dialog
  initializeGrid(); // Reinitialize the grid
  redraw(); // Redraw the canvas
}

// Function to save the canvas as PNG using html2canvas and manual download
function saveArtwork() {
  showGrid = false; // Hide grid lines
  redraw(); // Redraw the canvas without grid lines

  html2canvas(document.querySelector('canvas')).then(canvas => {
    canvas.toBlob(function(blob) {
      let link = document.createElement('a');
      link.download = 'pixel_art.png';
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href); // Clean up after download

      showGrid = true; // Show grid lines again
      redraw(); // Redraw the canvas with grid lines
    });
  });
}

// Prevent the context menu from appearing on right-click
function contextMenu(event) {
  return false;
}
document.oncontextmenu = contextMenu;
