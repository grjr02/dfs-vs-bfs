import Queue from "./Queue";

export function getBfsAnimations(grid, word) {
  const animations = [];
  var l = grid.length;
    var q = new Queue();
    animations.push([0,0]);

    q.enqueue(0);
    var set = new Set();

    while(!q.isEmpty()){
        var pop = q.front(); 
        set.add(pop);

        var w = Math.floor((pop)/l);
        var z = (pop) % l;
        animations.push([w,z]);

         
        q.dequeue();

        if((pop+1) % l !== 0 && !(set.has(pop+1))){
            if(word.charAt(0) === grid[Math.floor((pop+1)/l)][(pop+1)%l]){
                var x = Math.floor((pop+1)/l);
                var y = (pop+1) % l;
                
                set.add(pop+1);
                q.enqueue(pop+1);
                var res = searchB(word, grid, pop+1, animations);
                if(res){
                    search(grid, x, y, animations, word, 0)
                    return animations;
                }
            }else{
                set.add(pop+1);
                var x = Math.floor((pop+1)/l);
                var y = (pop+1) % l;
                q.enqueue(pop+1);
            }
        }
        if((pop-1) % l !== (l-1) && pop-1 > 0 && !(set.has(pop-1))){
            if(word.charAt(0) === grid[Math.floor((pop-1)/l)][(pop-1)%l]){
                var x = Math.floor((pop-1)/l);
                var y = (pop-1) % l;
                set.add(pop-1);
                q.enqueue(pop-1);
                var res = searchB(word, grid, pop-1, animations)
                if(res){
                    search(grid, x, y, animations, word, 0)
                    return animations;
                }
            }else{
                set.add(pop-1);
                var x = Math.floor((pop-1)/l);
                var y = (pop-1) % l;
                q.enqueue(pop-1);
            }
        }
        if(pop-l > 0 && !(set.has(pop-l))){
            if(word.charAt(0) === grid[Math.floor((pop-l)/l)][(pop-l)%l]){
                set.add(pop-l);
                var x = Math.floor((pop-l)/l);
                var y = (pop-l) % l;
                q.enqueue(pop-l);
                var res = searchB(word, grid, pop-l, animations)
                if(res){
                    search(grid, x, y, animations, word, 0)
                    return animations;
                }
            }else{
                set.add(pop-l);
                var x = Math.floor((pop-l)/l);
                var y = (pop-l) % l;
                q.enqueue(pop-l);
            }
        }
        if(pop+l < l*l && !(set.has(pop+l))){
            if(word.charAt(0) === grid[Math.floor((pop+l)/l)][(pop+l)%l]){
                set.add(pop+l);
                var x = Math.floor((pop+l)/l);
                var y = (pop+l) % l;
                q.enqueue(pop+l);
                var res = searchB(word, grid, pop+l, animations)
                if(res){
                    search(grid, x, y, animations, word, 0)
                    return animations;
                }
            }else{
                set.add(pop+l);
                var x = Math.floor((pop+l)/l);
                var y = (pop+l) % l;
                q.enqueue(pop+l);
            }
        }

    }

  return animations;
}

function searchB(word, grid, pop, animations){

    let c = 1;
    var l = grid.length
    
    var q2 = new Queue();
    q2.enqueue(pop);
    
    var w = Math.floor((pop)/l);
    var z = (pop) % l;
    animations.push([w,z]);
    var set2 = new Set();

    while (!q2.isEmpty()){

        
        var bool = false;
        
        var p = q2.front();
        set2.add(p);
        q2.dequeue();
        var w = Math.floor((p)/l);
        var z = (p) % l;

        if((p+1) % l !== 0 && !(set2.has(p+1))){
            if(word.charAt(c) === grid[Math.floor((p+1)/l)][(p+1)%l]){    
                q2.enqueue(p+1);
                bool = true;
            }
            
        }

        if((p-1) % l !== (l-1) && !(set2.has(p-1))){
            if(word.charAt(c) === grid[Math.floor((p-1)/l)][(p-1)%l]){
                q2.enqueue(p-1);
                bool = true;
            }
          
        }

        if(p-l > 0 && !(set2.has(p-l))){
            if(word.charAt(c) === grid[Math.floor((p-l)/l)][(p-l)%l]){
                q2.enqueue(p-l);
                bool = true;
            }
          
        }

        if(p+l < l*l && !(set2.has(p+l))){
            if(word.charAt(c) === grid[Math.floor((p+l)/l)][(p+l)%l]){
                q2.enqueue(p+l);
                bool = true;
            }
          
        }

        if(bool === false){
            animations.pop();
            continue;
        }
        c = c+1;

        if(c === word.length)return true;

    }

}

function search(grid, i, j, animations, word, index) {
    if (
      i < 0 ||
      j < 0 ||
      i >= grid.length ||
      j >= grid.length ||
      grid[i][j] === 0 ||
      word.charAt(index) !== grid[i][j]
    ) {
      return false;
    }
  
    if (index === word.length - 1) {
      animations.push([i, j]);
      return true;
    }
    
    let temp = grid[i][j];
    grid[i][j] = 0;
    animations.push([i, j]);
  
    let right = search(grid, i, j + 1, animations, word, index + 1);
    if (right) {grid[i][j] = temp;return true;}
    let down = search(grid, i + 1, j, animations, word, index + 1);
    if (down) {grid[i][j] = temp;return true;}
    let left = search(grid, i, j - 1, animations, word, index + 1);
    if (left) {grid[i][j] = temp;return true;}
    let up = search(grid, i - 1, j, animations, word, index + 1);
    if (up) {grid[i][j] = temp;return true;}
  
    grid[i][j] = temp;
  
    return right || up || left || down;
  }

