class PolygonHelper {
  public static draw(numberOfSides: number, width: number) {
    push();    
        const angle = TWO_PI / numberOfSides;
        const radius = width / 2;
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
          let sx = cos(a) * radius;
          let sy = sin(a) * radius;
          vertex(sx, sy);
        }
        endShape(CLOSE);
    pop();
  }

  public static drawCrossyPolygon(i: number, j: number) {
    push();
    const color = getColor(i, j);
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
  }
}
