export function randomChar() {
    return String.fromCharCode(Math.random() * (91 - 65) + 65);
}
  
export function makeWord(grid){
    var len = grid.length;

    var c1 = 0;
    var c2 = len-1;
    var c3 = len * len -len;
    var c4 = len*len-1;


    var num = Math.floor(Math.random() * (len*len - 0 + 1)) + 0;
    if(num === 0)num = num+15 ;
    var set = new Set();
    var ranLength = Math.floor(Math.random() * (9 - 4 + 1)) + 4; //Random string length bet 5-8
    var w = Math.floor(num/len);
    var z = num % len;
    let newWord = grid[w][z];  


    while(newWord.length !== ranLength){
        
        set.add(num);

        if(num === c1 || num === c2 || num === c3 || num === c4){ //Corner numbers in grid
            if(num === c1){
                var pick = Math.random() < 0.5 ? 1 : len;
                var nextNum = num + pick;
                if(set.has(nextNum)) continue;
                num = nextNum;

            }else if(num === c2){
                var pick = Math.random() < 0.5 ? -1 : len;
                var nextNum = num + pick;
                if(set.has(nextNum)) continue;
                num = nextNum;
            }else if(num === c3){
                var pick = Math.random() < 0.5 ? 1 : -len;
                var nextNum = num + pick;
                if(set.has(nextNum)) continue;
                num = nextNum;
            }else if(num === c4){
                var pick = Math.random() < 0.5 ? -1 : -len;
                var nextNum = num + pick;
                if(set.has(nextNum)) continue;
                num = nextNum;
            }
        }else if(num % len === 0 || ((num + 1)% len) === 0 || num < len || num > ((len*len) - len)){ //Edge numbers in grid

            if(num % len === 0){
                var arr = [1,len,-len];
                var pick = arr[Math.floor(Math.random() * arr.length)];
                var nextNum = num + pick;
                if(set.has(nextNum)) continue;
                num = nextNum;
            }else if(((num + 1)% len) === 0){
                var arr = [-1,len,-len];
                var pick = arr[Math.floor(Math.random() * arr.length)];
                var nextNum = num + pick;
                if(set.has(nextNum)) continue;
                num = nextNum;
            }else if(num < len){
                var arr = [-1,1,len];
                var pick = arr[Math.floor(Math.random() * arr.length)];
                var nextNum = num + pick;
                if(set.has(nextNum)) continue;
                num = nextNum;
            }else if(num > ((len*len) - len)){
                var arr = [-1,1,-len];
                var pick = arr[Math.floor(Math.random() * arr.length)];
                var nextNum = num + pick;
                if(set.has(nextNum)) continue;
                num = nextNum;
            }
        }else{ //Middle number. No corners or edges
            var arr = [-1,1,len,-len];
            var pick = arr[Math.floor(Math.random() * arr.length)];
            var nextNum = num + pick;
            if(set.has(nextNum)) continue;
            num = nextNum;
        }
        var x = Math.floor(num/len);
        var y = num % len;
    
        newWord = newWord.concat(grid[x][y]);        
        
    }

    return newWord;

}