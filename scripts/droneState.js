export const states = {
  FACING_NORTH: "North",
  FACING_EAST: "East",
  FACING_SOUTH: "South",
  FACING_WEST: "West",
};

class DroneState {
  constructor(state) {
    this.state = state;
  }
}

export class FacingNorth extends DroneState {
  constructor(drone) {
    super(states.FACING_NORTH);
    this.drone = drone;
  }

  handleDroneMovement = (drone) => {
    if (drone.y > 0) {
      drone.y -= drone.speed;
      drone.image.style.top = drone.y + "px";
    }
  };
}

export class FacingEast extends DroneState {
  constructor(drone) {
    super(states.FACING_EAST);
    this.drone = drone;
  }

  handleDroneMovement = (drone) => {
    if (drone.x + drone.speed < drone.gameWidth) {
      drone.x += drone.speed;
      drone.image.style.left = drone.x + "px";
    }
  };
}

export class FacingSouth extends DroneState {
  constructor(drone) {
    super(states.FACING_SOUTH);
    this.drone = drone;
  }

  handleDroneMovement = (drone) => {
    if (drone.y + drone.speed < drone.gameHeight) {
      drone.y += drone.speed;
      drone.image.style.top = drone.y + "px";
    }
  };
}

export class FacingWest extends DroneState {
  constructor(drone) {
    super(states.FACING_WEST);
    this.drone = drone;
  }

  handleDroneMovement = (drone) => {
    if (drone.x > 0) {
      drone.x -= drone.speed;
      drone.image.style.left = drone.x + "px";
    }
  };
}
