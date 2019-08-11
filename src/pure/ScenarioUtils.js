import cloneDeep from "lodash/fp/cloneDeep";
import { angleToVector } from "@trinketmage/sword";

export function formatScenerioGrid(scenario) {
  const { rows, columns, data, walls } = scenario;
  let formattedData = Array(rows).fill(0);
  formattedData = formattedData.map(() => {
    return Array(columns)
      .fill(null)
      .map(() => {
        return {
          tokens: 0,
          arrival: false,
          right: {
            wall: false
          },
          bottom: {
            wall: false
          }
        };
      });
  });
  data.forEach(data => {
    const { x, y, tokens, right, bottom, arrival } = data;
    const ref = formattedData[y][x];
    if (tokens) ref.tokens = tokens;
    if (bottom) ref.bottom = bottom;
    if (right) ref.right = right;
    if (arrival) ref.arrival = arrival;
  });
  // console.log(formattedData);
  return {
    rows,
    columns,
    data: formattedData,
    walls
  };
}
export function formatScenerioRobot(robot) {
  const newRobot = cloneDeep(robot);
  newRobot.direction = angleToVector(newRobot.angle);
  return newRobot;
}
