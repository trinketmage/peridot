import Scenario1 from "./scenario1";
import Scenario2 from "./scenario2";
import Scenario3 from "./scenario3";
import Scenario4 from "./scenario4";
import Scenario5 from "./scenario5";
import Scenario6 from "./scenario6";
import Scenario7 from "./scenario7";
import Scenario8 from "./scenario8";
import Scenario9 from "./scenario9";
import Scenario10 from "./scenario10";
export default [
  Scenario1,
  Scenario2,
  Scenario3,
  Scenario4,
  Scenario5,
  Scenario6,
  Scenario7,
  Scenario8,
  Scenario9,
  Scenario10,
  {
    name: "Peridot kills everyone",
    robot: {
      compartment: {
        capacity: 10,
        hold: 3
      },
      position: {
        x: 0,
        y: 0
      },
      angle: 90
    },
    columns: 5,
    rows: 6,
    data: [
      {
        x: 1,
        y: 1,
        right: {
          wall: true
        }
      },
      {
        x: 3,
        y: 3,
        tokens: 2,
        bottom: {
          wall: true
        }
      },
      {
        x: 1,
        y: 4,
        tokens: 1,
        right: {
          wall: true
        },
        bottom: {
          wall: true
        }
      },
      {
        x: 4,
        y: 5,
        arrival: true
      }
    ]
  },
  {
    name: "Peridot doesn't kill anyone",
    robot: {
      compartment: {
        capacity: 0
      },
      position: {
        x: 0,
        y: 1
      },
      angle: 0
    },
    columns: 10,
    rows: 10,
    data: []
  }
];
