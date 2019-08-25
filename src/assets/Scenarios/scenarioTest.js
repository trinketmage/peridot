export default {
  name: "Peridot kills everyone",
  robot: {
    compartment: {
      capacity: 999,
      hold: 4
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
      tokens: 4,
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
};

//Win : arrivé sur la case de fin
