import cloneDeep from "lodash/fp/cloneDeep";
import { formatScenerioGrid } from "@/pure/ScenarioUtils";
import scenarios from "@/assets/Scenarios";
export default {
  robot: cloneDeep(scenarios[0].robot),
  grid: formatScenerioGrid(scenarios[0]),
  scenarios
};
