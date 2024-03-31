type Configuration = {
  tesselationType: 'square'
  gridHorizontalElements: number
  gridVerticalElements: number
  backgroundColor: string
  colorPalette: string[]
  drawGrid: boolean
  allowDrawing: boolean
  frameRate: number
  keepDrawing: boolean
  drawEventElementsLast: boolean
  createElement: (i: number, j: number) => Drawable
  eventChance: number
  createEvent?: () => ShapeEvent
}