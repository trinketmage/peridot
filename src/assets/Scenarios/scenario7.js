export default {
  name: "Au pied du mur", //Do not hit a wall
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
  columns: 4,
  rows: 3,
  data: [
    {
      x: 3,
      y: 1,
      arrival: true
    },
    {
      x:1,
      y:1,
      right: {
        wall: true
      }
    }
  ]
};

//Win : arrivé sur la case de fin
