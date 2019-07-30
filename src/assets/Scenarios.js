export default [
  {
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
    tokens: [
      {
        x: 3,
        y: 3,
        count: 2
      },
      {
        x: 1,
        y: 4,
        count: 1
      }
    ],
    walls: [[[0, 1], [1, 1]], [[3, 3], [3, 4]]]
  }
];
