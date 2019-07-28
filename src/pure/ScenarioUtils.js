export function formatScenerioGrid(scenario) {
  const { rows, columns, tokens } = scenario;
  let data = Array(rows).fill(0);
  data = data.map(() => {
    return new Array(columns).fill(null);
  });
  tokens.forEach(token => {
    const { x, y, count } = token;
    data[x][y] = {
      tokens: count
    };
  });
  return {
    rows,
    columns,
    data
  };
}
