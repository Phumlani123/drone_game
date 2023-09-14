import {
  LaserFacingEast,
  LaserFacingNorth,
  LaserFacingSouth,
  LaserFacingWest,
} from "./laserState.js";
export default class Laser {
  constructor(
    x,
    y,
    face,
    orientation,
    gameWidth,
    gameHeight,
    speed,
    laserImage,
    rotation
  ) {
    this.x = x;
    this.y = y;
    this.face = face;
    this.speed = speed;
    this.orientation = orientation;
    this.laser = laserImage;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.rotation = rotation;
    this.states = [
      new LaserFacingNorth(this),
      new LaserFacingEast(this),
      new LaserFacingSouth(this),
      new LaserFacingWest(this),
    ];
    this.currentState = this.states[0];
    this.distanceTraveled = 0;
  }

  fireLaser() {
    this.createLaser();
    let laserSound = new Audio("./sound/laser-gun.mp3");
    laserSound.play();
    this.updateLaserPosition();
  }

  createLaser() {
    const laserWidth = this.speed / 5 + "px";
    const laserHeight = this.speed / 3 + "px";
    this.laser.style.width = laserWidth;
    this.laser.style.height = laserHeight;

    const laserX = this.x + this.speed / 2 - this.speed / 10;
    const laserY = this.y + this.speed / 3;
    this.laser.style.left = laserX + "px";
    this.laser.style.top = laserY + "px";
    this.laser.style.opacity = "1";

    this.rotation = this.orientation[this.face][0];
    this.laser.style.transform = `rotate(${this.orientation[this.face][0]}deg)`;
    return this.laser;
  }

  destroyLaser() {
    this.laser.src = "./images/explosion_2.png";

    setTimeout(() => {
      this.laser.src = "./images/laser.png";
      this.laser.style.opacity = "0";
    }, 100);
  }

  updateLaserPosition() {
    const laserInterval = setInterval(() => {
      switch (this.face) {
        case "North":
          this.setstate(0);
          break;
        case "East":
          this.setstate(1);
          break;
        case "South":
          this.setstate(2);
          break;
        case "West":
          this.setstate(3);
          break;
      }

      this.currentState.handleLaserMovement(this);

      if (this.x < 0 || this.distanceTraveled === this.speed * 2) {
        clearInterval(laserInterval);
        this.destroyLaser();
      }
      if (this.y < 0 || this.distanceTraveled === this.speed * 2) {
        clearInterval(laserInterval);
        this.destroyLaser();
      }
    }, 1000 / 20);
  }

  setstate(index) {
    this.currentState = this.states[index];
  }
}
