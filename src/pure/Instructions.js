import { vectorToAngle, angleToVector } from "@/pure/trigonometry";

export default {
  forward(model) {
    model.robot.position.x += model.robot.direction.x;
    model.robot.position.y += model.robot.direction.y;
  },
  turnLeft(model) {
    model.robot.angle -= 90;
    model.robot.direction = angleToVector(model.robot.angle);
  },
  lookSouth(model) {
    model.robot.direction = {
      x: 0,
      y: 1
    };
    model.robot.angle = vectorToAngle(model.robot.direction);
  },
  lookEast(model) {
    model.robot.direction = {
      x: 1,
      y: 0
    };
    model.robot.angle = vectorToAngle(model.robot.direction);
  },
  lookWest(model) {
    model.robot.direction = {
      x: -1,
      y: 0
    };
    model.robot.angle = vectorToAngle(model.robot.direction);
  },
  lookNorth(model) {
    model.robot.direction = {
      x: 0,
      y: -1
    };
    model.robot.angle = vectorToAngle(model.robot.direction);
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
    const { capacity, hold } = model.robot.compartment;
    if (model.grid.data[y][x].tokens > 0 && hold < capacity) {
      model.grid.data[y][x].tokens--;
      model.robot.compartment.hold++;
    }
  },
  end() {}
};
