// GLOBAL VARS & TYPES
let numberOfShapesControl: p5.Element;

const eventCatalog = {
  bounce: () => new BounceEvent(2000, 0.2),
  rotate: () => new RotateEvent(2000, 0.25)
} as const

const config: Configuration = {
  tesselationType: 'square',
  gridHorizontalElements: 15,
  gridVerticalElements: 15,
  drawGrid: false,
  allowDrawing: false,
  keepDrawing: true,
  drawEventElementsLast: true,
  backgroundColor: 'first',
  colorPalette: colorPalettes.spring,
  frameRate: 60,
  createElement: (i: number, j: number) =>
    new CrossyPolygon(i, j),
  eventChance: 0.001,
  createEvent: eventCatalog.rotate
}

const canvasWidth = 600;
const canvasHeight = 600;

const canvasMargin = 50;
const totalCanvasWidth = canvasWidth + (canvasMargin * 2);
const totalCanvasHeight = canvasHeight + (canvasMargin * 2);

const elementWidth = canvasWidth / config.gridHorizontalElements;
const elementHeight = canvasHeight / config.gridVerticalElements;

const drawingSize = 2;

const elements: Drawable[] = []

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
  console.log("🚀 - Setup initialized - P5 is running");

  createCanvas(totalCanvasWidth, totalCanvasHeight);
  rectMode(CORNER)
  frameRate(config.frameRate)
  // NUMBER OF SHAPES SLIDER
  // numberOfShapesControl = createSlider(1, 30, 15, 1).position(10, 10).style("width", "100px");

  setupElements()

  createButton("Reset").position(10, 10).mousePressed(() => {
    doDraw()
  })

  doDraw()
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
}

function setupElements() {
  for (let i = 0; i < config.gridHorizontalElements; i++) {
    for(let j = 0; j < config.gridVerticalElements; j++) {
      elements.push(config.createElement(i, j))
    }
  }
}

// p5 WILL HANDLE REQUESTING ANIM§ATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FRAME
function draw() {
  if(config.keepDrawing) {
    doDraw()
  }

  if(config.allowDrawing) {
    drawCursor()
  }
}

function doDraw() {
  push()
  // CLEAR BACKGROUND
  if(config.backgroundColor === 'first') {
    background(config.colorPalette[0])
  }
  else {
    background(config.backgroundColor);
  }

  // Move to effective canvas area
  translate(canvasMargin, canvasMargin);

  if(config.drawGrid) {
    drawGrid()
  }

  updateAllElements();
  drawAllElements();

  pop()
}

function updateAllElements() {
  elements.forEach(element => element.update())
}

function drawAllElements() {
  const elementsToDrawLast: Drawable[] = []
  for(let element of elements) {
    if(config.drawEventElementsLast && element.hasActiveEvent()) {
      elementsToDrawLast.push(element)
      continue
    }
    drawElement(element)
  }

  elementsToDrawLast.forEach(element => drawElement(element))
}

function drawElement(element: Drawable) {
  push()
  translate(element.i * elementWidth, element.j * elementHeight)
  scale(createVector(elementWidth, elementHeight))
  element.draw()
  pop()
}

function drawGrid() {
  noFill();
  stroke(0, 0, 0, 50);
  for (let i = 0; i < config.gridHorizontalElements + 1; i++) {
    line( i * elementWidth,
      0,
      i * elementWidth,
      canvasHeight);
  }
  for (let i = 0; i < config.gridVerticalElements + 1; i++) {
    line(0,
      i * elementHeight,
      canvasWidth,
      i * elementHeight);
  }
}

function drawCursor() {
  if(!mouseIsPressed) {
    return
  }
  fill('red')
  noStroke()
  const x = mouseX
  const y = mouseY
  ellipse(x, y, drawingSize)

  drawTranslatedCursors(x, y)
}

function drawTranslatedCursors(x: number, y: number) {
  fill(200)
  noStroke()
  for (let i = -config.gridHorizontalElements; i < config.gridHorizontalElements; i++) {
    for(let j = -config.gridVerticalElements; j < config.gridVerticalElements; j++) {
      if(i === 0 && j === 0) {
        continue
      }
      push();
      translate(i * elementWidth, j * elementHeight);
      ellipse(x, y, drawingSize)
      pop();
    }
  }
}
