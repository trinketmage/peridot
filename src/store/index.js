import { formatScenerioGrid } from "@/pure/ScenarioUtils";
import scenarios from "@/assets/Scenarios";
export default {
  robot: scenarios[0].robot,
  grid: formatScenerioGrid(scenarios[0]),
  scenarios
};
