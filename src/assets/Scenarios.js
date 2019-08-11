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
      }
    ]
  }
];
