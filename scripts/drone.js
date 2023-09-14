import Laser from "./laser";
import { FacingNorth, FacingSouth, FacingEast, FacingWest } from "./droneState";

export default class Drone {
  constructor(
    gameWidth,
    gameHeight,
    speed,
    droneImage,
    orientation,
    rotation,
    laserImage,
    gameRunning
  ) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.width = speed;
    this.height = speed;
    this.x = 0;
    this.y = 0;
    this.image = droneImage;
    this.orientation = orientation;
    this.speed = speed;
    this.face;
    this.canShoot = true;
    this.rotation = rotation;
    this.laserImage = laserImage;
    this.gameRunning = gameRunning;
    this.states = [
      new FacingNorth(this),
      new FacingEast(this),
      new FacingSouth(this),
      new FacingWest(this),
    ];
    this.currentState = this.states[0];
  }

  updateDronePosition(input) {
    if (input.keyCodes.indexOf("ArrowRight") > -1) {
      this.rotation = (this.rotation + 90) % 360;
      this.image.style.transform = `rotate(${this.rotation}deg)`;
    } else if (input.keyCodes.indexOf("ArrowLeft") > -1) {
      this.rotation = (this.rotation - 90) % -360;
      this.image.style.transform = `rotate(${this.rotation}deg)`;
    }
  }

  getDronePositionAndOrientation() {
    const dronePosition = this.getDronePosition();
    const droneOrientation = this.getDroneOrientation();
    return { dronePosition, droneOrientation };
  }

  getDronePosition() {
    let x = this.x / this.speed;
    let y = this.y / this.speed;
    y = Math.abs(y - 9);
    return { x, y };
  }

  getDroneOrientation() {
    const key = Object.keys(this.orientation).find((k) => {
      for (let i = 0; i < this.orientation[k].length; i++) {
        if (this.orientation[k][i] === this.rotation) {
          return k;
        }
      }
    });
    return key;
  }

  updateDroneMovement(input) {
    this.face = this.getDroneOrientation();
    this.image.style.top = this.y + "px";
    if (input.keyCodes.indexOf("ArrowUp") > -1) {
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

      this.currentState.handleDroneMovement(this);
    }
  }

  handleDronePlacement(x, y, dir) {
    if (this.gameRunning) {
      return;
    } else {
      this.x = x * this.speed;
      this.y = y * this.speed;
      this.image.style.top = this.y + "px";
      this.image.style.left = this.x + "px";
      this.rotation = this.orientation[dir][0];
      this.image.style.transform = `rotate(${this.orientation[dir][0]}deg)`;
      this.gameRunning = true;
    }
  }

  shootLaser(input) {
    if (input.keyCodes.indexOf("Space") > -1) {
      const laser = new Laser(
        this.x,
        this.y,
        this.face,
        this.orientation,
        this.gameWidth,
        this.gameHeight,
        this.speed,
        this.laserImage,
        this.rotation
      );
      if (this.face === "North" && this.y - this.speed <= 0) {
        return;
      } else if (
        this.face === "East" &&
        this.x + this.speed * 2 >= this.gameWidth
      ) {
        return;
      } else if (
        this.face === "South" &&
        this.y + this.speed * 2 >= this.gameHeight
      ) {
        return;
      } else if (this.face === "West" && this.x - this.speed <= 0) {
        return;
      }

      laser.fireLaser();
    }
  }

  setstate(state) {
    this.currentState = this.states[state];
  }
}
