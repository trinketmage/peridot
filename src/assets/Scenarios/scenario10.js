export default {
  name: "Déménagement", //Moving out
  robot: {
    compartment: {
      capacity: 3,
      hold:0
    },
    position: {
      x: 1,
      y: 3
    },
    angle: 0
  },
  columns: 7,
  rows: 7,
  data: [
    {
      x: 5,
      y: 2,
      arrival: true
    },
    {
      x: 1,
      y: 3,
      tokens:12
    },
    { x: 0, y: 1, right: { wall: true }
    },
    { x: 0, y: 2, right: { wall: true }
    },
    { x: 0, y: 3, right: { wall: true }
    },
    { x: 1, y: 0, bottom: { wall: true }
    },
    { x: 1, y: 1, right: { wall: true }
    },
    { x: 1, y: 3, bottom: { wall: true }, right: { wall: true }
    },
    { x: 5, y: 5, bottom: { wall: true }, right: { wall: true }
    },
    { x: 5, y: 4, right: { wall: true }
    },
    { x: 5, y: 3, right: { wall: true }
    },
    { x: 5, y: 2, right: { wall: true }
    },
    { x: 4, y: 5, right: { wall: true }
    },
    { x: 3, y: 4, right: { wall: true }
    },
    { x: 3, y: 3, right: { wall: true }
    },
    { x: 3, y: 2, right: { wall: true }
    },
    { x: 4, y: 1, bottom: { wall: true }
    },
    { x: 5, y: 1, bottom: { wall: true }
    }
  ]
};


//Win : arrivé sur la case d'arrivée
//      ET 12 jetons sur la case d'arrivée
