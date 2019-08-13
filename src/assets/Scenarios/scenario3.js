export default {
  name: "Petit Poucet", //Little Poucet
  robot: {
    compartment: {
      capacity: 4,
      hold:4
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
    }
  ]
};

//Win : arrivé sur la case de fin ET un jeton exactement sur chaque case de la ligne y=1
