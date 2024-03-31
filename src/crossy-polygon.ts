abstract class Drawable {
  event: ShapeEvent | null = null

  constructor(
    public readonly i: number,
    public readonly j: number) {
  }

  update(): void {
    if(config.createEvent // a create event function exists
      && !this.event?.isEventActive // no event is currently running
      && Math.random() < config.eventChance // random chance
    ) {
      this.event = config.createEvent()
      this.event.start()
    }
  }

  abstract draw(): void

  hasActiveEvent(): boolean {
    return this.event?.isEventActive || false
  }
}

class CrossyPolygon extends Drawable {
  draw(): void {
    push()

    const color = getColor(this.i, this.j)
    fill(color)
    noStroke()

    translate(0.5, 0.5)

    if(this.event?.isEventActive) {
      this.event.apply()
    }

    beginShape()
    this.translatedVertex(0, 0)
    this.translatedVertex(0.3, -0.3)
    this.translatedVertex(0.7, 0.3)
    this.translatedVertex(1, 0)
    this.translatedVertex(1.3, 0.3)
    this.translatedVertex(0.7, 0.7)
    this.translatedVertex(1, 1)
    this.translatedVertex(0.7, 1.3)
    this.translatedVertex(0.3, 0.7)
    this.translatedVertex(0, 1)
    this.translatedVertex(-0.3, 0.7)
    this.translatedVertex(0.3, 0.3)
    endShape(CLOSE)

    pop()
  }

  translatedVertex(x: number, y: number) {
    vertex(x - 0.5, y - 0.5)
  }
}