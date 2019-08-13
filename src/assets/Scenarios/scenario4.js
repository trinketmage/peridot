export default {
  name: "Robot aspirateur", //Vacuum cleaner robot
  robot: {
    compartment: {
      capacity: 5,
      hold:0
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
      x: 0,
      y: 1,
      tokens: 1
    },
    {
      x: 1,
      y: 1,
      tokens: 1
    },
    {
      x: 2,
      y: 1,
      tokens: 2
    },
    {
      x: 3,
      y: 1,
      tokens: 1
    },

  ]
};

//Win : arrivé sur la case de fin
//      ET plus aucun jeton sur la map (cad 5 en poche)
