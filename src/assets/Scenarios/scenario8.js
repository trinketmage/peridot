export default {
  name: "Labyrinthe", //Maze
  robot: {
    compartment: {
      capacity: 0
    },
    position: {
      x: 0,
      y: 3
    },
    angle: 0
  },
  columns: 6,
  rows: 6,
  data: [
    {
      x: 2,
      y: 4,
      arrival: true
    },
    { x: 1,y: 3, bottom: { wall: true }
    },
    { x: 2,y: 3, bottom: { wall: true }
    },
    { x: 3,y: 3, bottom: { wall: true }, right: { wall: true }
    },
    { x: 1,y: 2, bottom: { wall: true }
    },
    { x: 2,y: 2, bottom: { wall: true }, right: { wall: true }
    },
    { x: 2,y: 1, right: { wall: true }
    },
    { x: 3,y: 0, bottom: { wall: true }
    },
    { x: 3,y: 2, right:{ wall: true }
    },
    { x: 4,y: 0, bottom: { wall: true }
    },
    { x: 4,y: 1, right: { wall: true }
    },
    { x: 4,y: 2, right: { wall: true }
    },
    { x: 4,y: 3, right: { wall: true }
    },
    { x: 4,y: 4, bottom:{ wall: true }, right: { wall: true }
    },
    { x: 4,y: 4, bottom:{ wall: true }
    },
    { x: 3,y: 4, bottom:{ wall: true }
    },
    { x: 2,y: 4, bottom:{ wall: true }
    },
    { x: 1,y: 4, right:{ wall: true }
    }
  ]
};

//
