let canvasWidth = 450
let canvasHeight = 600

let ballRadius = 8.5
let holeRadius = 12.5

let ballColor = (255,255,255)
let holeColor = (127,127,127)
let obstacleColor = (255, 0, 0)

let ballStartX = canvasWidth/2
let ballStartY = canvasHeight/2

let holeStartX = canvasWidth/2
let holeStartY = canvasHeight/10

let initialMouseX = 0.0
let initialMouseY = 0.0

let maxArrowSize = 100
let arrowReductionRatio = 0.7 // allows for finer control when using the mouse

let holeTolerance = 8 // tolerance whether we were close enough to the hole or not
let ballStillTolerance = 1e-3 // tolerence for ball to be considered to be still


let newX = 0.0
let newY = 0.0

let ballXSpeed = 0.0
let ballYSpeed = 0.0

let ball = {}