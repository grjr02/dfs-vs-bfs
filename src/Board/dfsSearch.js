export function getDfsAnimations(grid, word) {
  const animations = [];
  const visited = [];

  for (let i = 0; i < grid.length; i++) {
    const inner = [];
    for (let j = 0; j < grid[0].length; j++) {
      inner.push(false);
    }
    visited.push(inner);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] === word.charAt(0)) {
        var result = search(grid, visited, i, j, animations, word, 0);
        if (result){ return animations; } 
      }else {
        animations.push([i, j]);
      }
    }
  }

  return animations;
}

function search(grid, visited, i, j, animations, word, index) {
  if (
    i < 0 ||
    j < 0 ||
    i >= grid.length ||
    j >= grid.length ||
    visited[i][j] === true ||
    word.charAt(index) !== grid[i][j]
  ) {
    return false;
  }

  if (index === word.length - 1) {
    animations.push([i, j]);
    return true;
  }

  visited[i][j] = true;
  animations.push([i, j]);

  let right = search(grid, visited, i, j + 1, animations, word, index + 1);
  if (right) return true;
  let down = search(grid, visited, i + 1, j, animations, word, index + 1);
  if (down) return true;
  let left = search(grid, visited, i, j - 1, animations, word, index + 1);
  if (left) return true;
  let up = search(grid, visited, i - 1, j, animations, word, index + 1);
  if (up) return true;

  visited[i][j] = false;
  //animations.push([i, j]);

  return right || up || left || down;
}


