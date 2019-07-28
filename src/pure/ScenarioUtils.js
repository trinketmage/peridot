import cloneDeep from "lodash/fp/cloneDeep";
import { angleToVector } from "@/pure/trigonometry";

export function formatScenerioGrid(scenario) {
  const { rows, columns, tokens, walls } = scenario;
  let data = Array(rows).fill(0);
  data = data.map(() => {
    return Array(columns)
      .fill(null)
      .map(() => {
        return {
          tokens: 0
        };
      });
  });
  tokens.forEach(token => {
    const { x, y, count } = token;
    data[y][x] = {
      tokens: count
    };
  });
  return {
    rows,
    columns,
    data,
    walls
  };
}
export function formatScenerioRobot(robot) {
  const newRobot = cloneDeep(robot);
  newRobot.direction = angleToVector(newRobot.angle);
  return newRobot;
}
