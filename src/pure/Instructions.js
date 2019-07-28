import { vectorToAngle, angleToVector } from "@/pure/trigonometry";

export default {
  forward(model) {
    model.robot.position.x += model.robot.direction.x;
    model.robot.position.y += model.robot.direction.y;
  },
  turnLeft(model) {
    const newAngle = vectorToAngle(model.robot.direction) - 90;
    model.robot.direction = angleToVector(newAngle);
  },
  lookSouth(model) {
    model.robot.direction = {
      x: 0,
      y: 1
    };
  },
  lookEast(model) {
    model.robot.direction = {
      x: 1,
      y: 0
    };
  },
  lookWest(model) {
    model.robot.direction = {
      x: -1,
      y: 0
    };
  },
  lookNorth(model) {
    model.robot.direction = {
      x: 0,
      y: -1
    };
  },
  dropToken(model) {
    if (model.robot.compartment.hold > 0) {
      const { x, y } = model.robot.position;
      model.grid.data[y][x].tokens++;
      model.robot.compartment.hold--;
    }
  },
  pickToken(model) {
    const { x, y } = model.robot.position;
    if (model.grid.data[y][x].tokens > 0) {
      model.grid.data[y][x].tokens--;
      model.robot.compartment.hold++;
    }
  },
  end() {}
};
