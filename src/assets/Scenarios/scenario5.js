export default {
  name: "Grand Poucet", //Big Poucet
  robot: {
    compartment: {
      capacity: 2,
      hold:2
    },
    position: {
      x: 0,
      y: 1
    },
    angle: 0
  },
  columns: 4,
  rows: 2,
  data: [
    {
      x: 3,
      y: 0,
      arrival: true
    },
    {
      tokens:2,
      x:2,
      y:1
    }
  ]
};

//Win : arrivé sur la case de fin ET un jeton exactement sur chaque case de la ligne y=1
