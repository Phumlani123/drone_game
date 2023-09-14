import InputHandler from "./inputHandler";
import Drone from "./drone";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const droneImage = document.getElementById("drone");
  const laserImage = document.getElementById("laser");
  const xRangeInput = document.getElementById("xRange");
  const yRangeInput = document.getElementById("yRange");
  const directionInput = document.getElementById("direction");
  const placeButton = document.getElementById("place");
  const reportButton = document.getElementById("reportBtn");
  const report = document.getElementById("report");
  let xRange, yRange, direction;
  let gameRunning = false;

  const CANVAS_WIDTH = canvas.clientWidth;
  const CANVAS_HEIGHT = canvas.clientWidth;
  const unitSize = Math.ceil(CANVAS_WIDTH / 10);
  let rotation = 0;
  let speed = unitSize;
  droneImage.style.width = unitSize + "px";
  droneImage.style.height = unitSize + "px";

  const ORIENTATION = {
    North: [-0, 0],
    East: [90, -270],
    South: [180, -180],
    West: [270, -90],
  };

  const gameReset = () => {
    drone.gameRunning = false;
  };

  const input = new InputHandler();
  const drone = new Drone(
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    speed,
    droneImage,
    ORIENTATION,
    rotation,
    laserImage,
    gameRunning
  );

  placeButton.addEventListener("click", () => {
    if (!gameRunning) {
      gameStart();
    }
  });

  placeButton.addEventListener("mouseenter", () => {
    gameReset();
  });

  reportButton.addEventListener("click", () => {
    if (!drone.gameRunning) return;
    const { dronePosition, droneOrientation } =
      drone.getDronePositionAndOrientation();
    report.innerHTML = `X: ${dronePosition.x}, Y: ${dronePosition.y}, Direction: ${droneOrientation}`;

    setTimeout(() => {
      report.innerHTML = "";
    }, 5000);
  });

  function invertRange(range) {
    return Math.abs(range - 9);
  }

  function gameStart() {
    xRange = xRangeInput.value;
    yRange = yRangeInput.value;
    const newRange = invertRange(yRange);
    direction = directionInput.value;
    droneImage.style.display = "block";
    drone.handleDronePlacement(xRange, newRange, direction);
  }

  function gameLoop() {
    drone.shootLaser(input);
    drone.updateDronePosition(input);
    drone.updateDroneMovement(input);

    setTimeout(() => {
      window.requestAnimationFrame(gameLoop);
    }, 1000 / 10);
  }

  gameLoop();
});
