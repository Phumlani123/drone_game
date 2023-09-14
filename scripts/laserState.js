export const states = {
  FACING_NORTH: "North",
  FACING_EAST: "East",
  FACING_SOUTH: "South",
  FACING_WEST: "West",
};

class LaserState {
  constructor(state) {
    this.state = state;
  }
}

export class LaserFacingNorth extends LaserState {
  constructor(laser) {
    super(states.FACING_NORTH);
    this.laser = laser;
  }

  handleLaserMovement = (laser) => {
    if (laser.y > 0) {
      laser.y -= laser.speed;
      laser.distanceTraveled += laser.speed;
      laser.laser.style.top = laser.y + "px";
    }
  };
}

export class LaserFacingEast extends LaserState {
  constructor(laser) {
    super(states.FACING_EAST);
    this.laser = laser;
  }

  handleLaserMovement = (laser) => {
    if (laser.x + laser.speed < laser.gameWidth) {
      laser.x += laser.speed;
      laser.distanceTraveled += laser.speed;
      laser.laser.style.left = laser.speed + laser.x + "px";
    }
  };
}

export class LaserFacingSouth extends LaserState {
  constructor(laser) {
    super(states.FACING_SOUTH);
    this.laser = laser;
  }

  handleLaserMovement = (laser) => {
    if (laser.y + laser.speed < laser.gameHeight) {
      laser.y += laser.speed;
      laser.distanceTraveled += laser.speed;
      laser.laser.style.top = laser.speed + laser.y + "px";
    }
  };
}

export class LaserFacingWest extends LaserState {
  constructor(laser) {
    super(states.FACING_WEST);
    this.laser = laser;
  }

  handleLaserMovement = (laser) => {
    if (laser.x > 0) {
      laser.x -= laser.speed;
      laser.distanceTraveled += laser.speed;
      laser.laser.style.left = laser.x + "px";
    }
  };
}
