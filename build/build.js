var PolygonHelper = (function () {
    function PolygonHelper() {
    }
    PolygonHelper.draw = function (numberOfSides, width) {
        push();
        var angle = TWO_PI / numberOfSides;
        var radius = width / 2;
        beginShape();
        for (var a = 0; a < TWO_PI; a += angle) {
            var sx = cos(a) * radius;
            var sy = sin(a) * radius;
            vertex(sx, sy);
        }
        endShape(CLOSE);
        pop();
    };
    PolygonHelper.drawCrossyPolygon = function (i, j) {
        push();
        var color = getColor(i, j);
        console.log(color);
        fill(color);
        noStroke();
        beginShape();
        vertex(0, 0);
        vertex(0.3, -0.3);
        vertex(0.7, 0.3);
        vertex(1, 0);
        vertex(1.3, 0.3);
        vertex(0.7, 0.7);
        vertex(1, 1);
        vertex(0.7, 1.3);
        vertex(0.3, 0.7);
        vertex(0, 1);
        vertex(-0.3, 0.7);
        vertex(0.3, 0.3);
        endShape(CLOSE);
        pop();
    };
    return PolygonHelper;
}());
var colorPalettes = {
    pastel: [
        '#ffcdb2',
        '#ffb4a2',
        '#e5989b',
        '#b5838d',
    ],
    neon: [
        '#f72585',
        '#7209b7',
        '#3a0ca3',
        '#4361ee',
    ],
    dark: [
        '#000000',
        '#14213d',
        '#fca311',
        '#e5e5e5',
    ],
    spring: [
        '#f6bd60',
        '#f7ede2',
        '#f5cac3',
        '#84a59d',
    ]
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Drawable = (function () {
    function Drawable(i, j) {
        this.i = i;
        this.j = j;
        this.event = null;
    }
    Drawable.prototype.update = function () {
        var _a;
        if (config.createEvent
            && !((_a = this.event) === null || _a === void 0 ? void 0 : _a.isEventActive)
            && Math.random() < config.eventChance) {
            this.event = config.createEvent();
            this.event.start();
        }
    };
    Drawable.prototype.hasActiveEvent = function () {
        var _a;
        return ((_a = this.event) === null || _a === void 0 ? void 0 : _a.isEventActive) || false;
    };
    return Drawable;
}());
var CrossyPolygon = (function (_super) {
    __extends(CrossyPolygon, _super);
    function CrossyPolygon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CrossyPolygon.prototype.draw = function () {
        var _a;
        push();
        var color = getColor(this.i, this.j);
        fill(color);
        noStroke();
        translate(0.5, 0.5);
        if ((_a = this.event) === null || _a === void 0 ? void 0 : _a.isEventActive) {
            this.event.apply();
        }
        beginShape();
        this.translatedVertex(0, 0);
        this.translatedVertex(0.3, -0.3);
        this.translatedVertex(0.7, 0.3);
        this.translatedVertex(1, 0);
        this.translatedVertex(1.3, 0.3);
        this.translatedVertex(0.7, 0.7);
        this.translatedVertex(1, 1);
        this.translatedVertex(0.7, 1.3);
        this.translatedVertex(0.3, 0.7);
        this.translatedVertex(0, 1);
        this.translatedVertex(-0.3, 0.7);
        this.translatedVertex(0.3, 0.3);
        endShape(CLOSE);
        pop();
    };
    CrossyPolygon.prototype.translatedVertex = function (x, y) {
        vertex(x - 0.5, y - 0.5);
    };
    return CrossyPolygon;
}(Drawable));
var ShapeEvent = (function () {
    function ShapeEvent() {
        this.isEventActive = false;
        this.ticksSinceEventStart = 0;
    }
    ShapeEvent.prototype.start = function () {
        this.isEventActive = true;
        this.ticksSinceEventStart = 0;
        this.startTime = millis();
    };
    ShapeEvent.prototype.apply = function () {
        this.ticksSinceEventStart++;
    };
    ShapeEvent.prototype.stopEvent = function () {
        this.isEventActive = false;
    };
    return ShapeEvent;
}());
var RotateEvent = (function (_super) {
    __extends(RotateEvent, _super);
    function RotateEvent(duration, totalRotations) {
        var _this = _super.call(this) || this;
        _this.duration = duration;
        _this.totalRotations = totalRotations;
        _this.speed = 3130 / (config.frameRate * _this.duration);
        return _this;
    }
    RotateEvent.prototype.apply = function () {
        if (!this.isEventActive) {
            return;
        }
        _super.prototype.apply.call(this);
        var progress = this.ticksSinceEventStart * this.speed;
        var rotationModifier = ease(progress) * this.totalRotations;
        rotate(rotationModifier * TWO_PI);
        if (progress > PI) {
            this.stopEvent();
        }
    };
    return RotateEvent;
}(ShapeEvent));
var BounceEvent = (function (_super) {
    __extends(BounceEvent, _super);
    function BounceEvent(duration, size) {
        var _this = _super.call(this) || this;
        _this.duration = duration;
        _this.size = size;
        _this.speed = 6260 / (config.frameRate * _this.duration);
        return _this;
    }
    BounceEvent.prototype.apply = function () {
        if (!this.isEventActive) {
            return;
        }
        _super.prototype.apply.call(this);
        var progress = this.ticksSinceEventStart * this.speed;
        var scaleModifier = easeAndBack(progress);
        scale(1 + scaleModifier * this.size);
        if (progress > TWO_PI) {
            this.stopEvent();
        }
    };
    return BounceEvent;
}(ShapeEvent));
var numberOfShapesControl;
var eventCatalog = {
    bounce: function () { return new BounceEvent(2000, 0.2); },
    rotate: function () { return new RotateEvent(2000, 0.25); }
};
var config = {
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
    createElement: function (i, j) {
        return new CrossyPolygon(i, j);
    },
    eventChance: 0.001,
    createEvent: eventCatalog.rotate
};
var canvasWidth = 600;
var canvasHeight = 600;
var canvasMargin = 50;
var totalCanvasWidth = canvasWidth + (canvasMargin * 2);
var totalCanvasHeight = canvasHeight + (canvasMargin * 2);
var elementWidth = canvasWidth / config.gridHorizontalElements;
var elementHeight = canvasHeight / config.gridVerticalElements;
var drawingSize = 2;
var elements = [];
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    createCanvas(totalCanvasWidth, totalCanvasHeight);
    rectMode(CORNER);
    frameRate(config.frameRate);
    setupElements();
    createButton("Reset").position(10, 10).mousePressed(function () {
        doDraw();
    });
    doDraw();
}
function windowResized() {
}
function setupElements() {
    for (var i = 0; i < config.gridHorizontalElements; i++) {
        for (var j = 0; j < config.gridVerticalElements; j++) {
            elements.push(config.createElement(i, j));
        }
    }
}
function draw() {
    if (config.keepDrawing) {
        doDraw();
    }
    if (config.allowDrawing) {
        drawCursor();
    }
}
function doDraw() {
    push();
    if (config.backgroundColor === 'first') {
        background(config.colorPalette[0]);
    }
    else {
        background(config.backgroundColor);
    }
    translate(canvasMargin, canvasMargin);
    if (config.drawGrid) {
        drawGrid();
    }
    updateAllElements();
    drawAllElements();
    pop();
}
function updateAllElements() {
    elements.forEach(function (element) { return element.update(); });
}
function drawAllElements() {
    var elementsToDrawLast = [];
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var element = elements_1[_i];
        if (config.drawEventElementsLast && element.hasActiveEvent()) {
            elementsToDrawLast.push(element);
            continue;
        }
        drawElement(element);
    }
    elementsToDrawLast.forEach(function (element) { return drawElement(element); });
}
function drawElement(element) {
    push();
    translate(element.i * elementWidth, element.j * elementHeight);
    scale(createVector(elementWidth, elementHeight));
    element.draw();
    pop();
}
function drawGrid() {
    noFill();
    stroke(0, 0, 0, 50);
    for (var i = 0; i < config.gridHorizontalElements + 1; i++) {
        line(i * elementWidth, 0, i * elementWidth, canvasHeight);
    }
    for (var i = 0; i < config.gridVerticalElements + 1; i++) {
        line(0, i * elementHeight, canvasWidth, i * elementHeight);
    }
}
function drawCursor() {
    if (!mouseIsPressed) {
        return;
    }
    fill('red');
    noStroke();
    var x = mouseX;
    var y = mouseY;
    ellipse(x, y, drawingSize);
    drawTranslatedCursors(x, y);
}
function drawTranslatedCursors(x, y) {
    fill(200);
    noStroke();
    for (var i = -config.gridHorizontalElements; i < config.gridHorizontalElements; i++) {
        for (var j = -config.gridVerticalElements; j < config.gridVerticalElements; j++) {
            if (i === 0 && j === 0) {
                continue;
            }
            push();
            translate(i * elementWidth, j * elementHeight);
            ellipse(x, y, drawingSize);
            pop();
        }
    }
}
function easeAndBack(progress) {
    return 0.5 * (1 + (Math.sin(-HALF_PI + progress)));
}
function ease(progress) {
    return 0.5 * (1 + Math.sin(-HALF_PI + progress));
}
var getColor = function (i, j) {
    var palette = config.colorPalette;
    var index = (i % 2) + ((j % 2) * 2);
    return palette[index];
};
//# sourceMappingURL=build.js.map