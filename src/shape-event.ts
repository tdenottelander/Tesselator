abstract class ShapeEvent {
  isEventActive: boolean = false
  ticksSinceEventStart: number = 0
  startTime: number

  start() {
    this.isEventActive = true
    this.ticksSinceEventStart = 0
    this.startTime = millis()
  }

  apply() {
    this.ticksSinceEventStart++
  }

  stopEvent() {
    this.isEventActive = false
    // console.log('time taken: ' + (millis() - this.startTime) + 'ms')
  }
}

class RotateEvent extends ShapeEvent {
  speed: number
  constructor(
    /** in millis, approximately */
    private readonly duration: number,
    private readonly totalRotations: number
  ) {
    super()
    this.speed = 3130 / (config.frameRate * this.duration)
  }

  apply(): void {
    if(!this.isEventActive) {
      return
    }

    super.apply()

    const progress = this.ticksSinceEventStart * this.speed
    const rotationModifier = ease(progress) * this.totalRotations
    rotate(rotationModifier * TWO_PI)

    if(progress > PI) {
      this.stopEvent()
    }
  }
}

class BounceEvent extends ShapeEvent {
  speed: number
  constructor(
    /** in millis, approximately */
    private readonly duration: number,
    private readonly size: number
  ) {
    super()
    this.speed = 6260 / (config.frameRate * this.duration)
  }

  apply(): void {
    if(!this.isEventActive) {
      return
    }

    super.apply()

    const progress = this.ticksSinceEventStart * this.speed
    const scaleModifier = easeAndBack(progress)
    scale(1 + scaleModifier * this.size)

    if(progress > TWO_PI) {
      this.stopEvent()
    }
  }
}