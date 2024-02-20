let spacingSlider, expansionSpeedSlider, lineThicknessSlider, shellsSlider;
let shapeDetailIncrement = 0.01; // How quickly the detail level changes over time
let initialRadius = 20;
let expansionSpeed = 0.041; // How quickly new shapes are added
let edgeBuffer = 20; // Variable buffer from the edges


function setup() {
  print(windowWidth);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100); // Include alpha in colorMode for opacity
  noFill();

  // Initialize sliders
  // spacingSlider = createSlider(5, 50, 15, 1).position(10, height - 80);
  // expansionSpeedSlider = createSlider(0.01, 0.1, 0.05, 0.001).position(10, height - 60);
  // lineThicknessSlider = createSlider(1, 10, 1, 0.1).position(10, height - 40);
  // shellsSlider = createSlider(20, 100, 20, 1).position(10, height - 20); // Default number of shells is 20
}

function draw() {
  background(0);

let spacing = map(dist(mouseX, mouseY, width / 2, height / 2), 0, dist(0, 0, width / 2, height / 2), 10, 20);
spacing = constrain(spacing, 10, 20); // Ensure lineThickness stays within bounds

  let lineThickness = map(dist(mouseX, mouseY, width / 2, height / 2), 0, dist(0, 0, width / 2, height / 2), 7, 1);
lineThickness = constrain(lineThickness, 1, 7); // Ensure lineThickness stays within bounds
  let maxShapes = 95;
  shapeDetailIncrement = 0.041;

  strokeWeight(lineThickness);

  let currentDetail = shapeDetailIncrement * frameCount;

  for (let i = maxShapes - 1; i >= 0; i--) {
    let radius = initialRadius + i * spacing;
    let detail = currentDetail - i * 0.1;
    drawShape(width / 2, height / 2, radius, detail, i, maxShapes);
  }
  
  
  drawFloatingText()
  
    // console.log(`Spacing: ${spacingSlider.value()}, Expansion Speed: ${expansionSpeedSlider.value()}, Line Thickness: ${lineThicknessSlider.value()}, Shells: ${shellsSlider.value()}`);


}


function drawShape(x, y, radius, detail, shapeIndex, maxShapes) {
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += TWO_PI / 100) {
    let xoff = map(cos(angle), -1, 1, 0, 2);
    let yoff = map(sin(angle), -1, 1, 0, 2);
    let r = map(noise(xoff + detail, yoff + detail), 0, 1, radius * 0.75, radius);
    let vx = x + r * cos(angle);
    let vy = y + r * sin(angle);

    // Adjust opacity from center to outer circles
    let opacity = map(shapeIndex, 0, maxShapes, 0, 100); // Center almost transparent, outer fully opaque
    
    // Dynamic hue for color traveling from the center outwards
    let hueBase = 200; // Base hue for sky blue
    let hueVariation = 10; // Variation range for hue to cycle through
    let hue = hueBase + sin(frameCount * 0.05 + shapeIndex * 0.1) * hueVariation; // Creates dynamic hue change

    stroke(hue, 80, 100, opacity); // Adjusted for sky blue shades with dynamic hue change
    vertex(vx, vy);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // spacingSlider.position(10, height - 80);
  // expansionSpeedSlider.position(10, height - 60);
  // lineThicknessSlider.position(10, height - 40);
  // shellsSlider.position(10, height - 20);
}
function drawFloatingText() {
  push();
  fill(255, map(dist(mouseX, mouseY, width / 2, height / 2), 0, dist(0, 0, width / 2, height / 2), 0, 100));
  noStroke();
  textFont("Times New Roman");
  textAlign(CENTER, CENTER);
  textSize(100);
  textStyle(BOLD);
  text("FLOAT", width / 2, height / 2);
  
  // Only draw the outer text if the window width is 989 or greater
  if (width >= 989) {
    textSize(20);
  textStyle(NORMAL);

    // Top left text
    textAlign(LEFT, TOP);
    text("DM FOR ADDRESS & DETAILS", edgeBuffer, edgeBuffer);

    // Bottom left text
    textAlign(LEFT, BOTTOM);
    text("FRIDAY, JUNE 16TH 8PM", edgeBuffer, height - edgeBuffer);
  textStyle(BOLD);

    // Bottom right text
    textAlign(RIGHT, BOTTOM);
    text("AN EVENING OF TRANSCENDENT QUEER CONNECTION, LIGHT, AND LOVE", width - edgeBuffer, height - edgeBuffer);
  textStyle(NORMAL);

    // Top right text
    textAlign(RIGHT, TOP);
    text("FEATURING: ARCA, OCTO OCTA, & SOFIA KOURTESIS", width - edgeBuffer, edgeBuffer);
  }
  
  pop();
}
