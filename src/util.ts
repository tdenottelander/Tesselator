function easeAndBack(progress: number) {
  return 0.5 * (1 + (Math.sin(-HALF_PI + progress)))
}

function ease(progress: number) {
  return 0.5 * (1 + Math.sin(-HALF_PI + progress))
}

const getColor = (i: number, j: number): string => {
  const palette = config.colorPalette
  // i: 0, j: 0 => 0
  // i: 1, j: 0 => 1
  // i: 0, j: 1 => 2
  // i: 1, j: 1 => 3
  const index = (i % 2) + ((j % 2) * 2)
  return palette[index]
}

