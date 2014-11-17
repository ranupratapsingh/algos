// @author R. P. Singh


/************** Application code starts here ***********/

// @constructor
// @param i source node index
var Node = function(i){
  this.index = i;
  this.neighbours = [];	// list of neighbours which could be derrived from the edges as well
  this.edges = [];		// list of edges
}

// @constructor
// @param s source node index
// @param e target node index
// @param c cost of this edge
var Edge = function(s, e, c){
  this.start = s;
  this.end = e;
  this.cost = c;
}

// @constructor
// @param v_arr vertices indices
// @param e_arr array of all the edges
var Graph = function(v_arr, e_arr){
  this.vertices = [];
  this.visible = [];		// array for storing visible nodes later
  this.edges = e_arr;
  var e;
  // creating vertices below
  for(var i = 0; i< v_arr.length; i++){
    v = new Node(v_arr[i]);
    this.vertices.push(v);
  }
  // filling data in vertices below
  for(var i = 0; i< e_arr.length; i++){
    e = e_arr[i];
    this.vertices[e.start].edges.push(e);
    this.vertices[e.start].neighbours.push(e.end);
  }
}

// @method markVisible
// @param node the node which is to be set visible
// @param node new potential distance
// @param node previous node
Graph.prototype.markVisible = function(node,newDist,prev){
  if(newDist < node.dist){
    node.dist = newDist;
    node.prev = prev;
  }
  if(!node.visible){
    node.visible = true;
    this.visible.push(node);
  }
}

// @method markVisible
// @return Node the node with minimum dist
Graph.prototype.popNearest = function(){
  var i,minIndex = 0,min;
  for(i = 0; i < this.visible.length ; i++)
    if(this.visible[i].dist < this.visible[minIndex].dist)
      minIndex = i;
  min = this.visible[minIndex];
  this.visible.splice(minIndex,1);
  return min;
}

// @method visitNode
// @param node vertex which is to be visited
Graph.prototype.visitNode = function(node){
  var edge, neigh;
  node.visited = true;
  for(i in node.edges){
    edge = node.edges[i];
    neigh = this.vertices[edge.end];
    if(!neigh.visited)
      this.markVisible(neigh,node.dist+edge.cost, node);
  }
}

// @method shortest path
// @param si source node index
// @param vi destination node index
Graph.prototype.shortestPath = function(si,di){
  var i,node,dest,source,path=[];
  for(i in this.vertices){
    this.vertices[i].dist = Infinity;
  }
  source = this.vertices[si];
  this.markVisible(source,0)		// distance from self is 0
  while(this.visible.length){
    node = this.popNearest();
    this.visitNode(node);
  }
  //printing the shortest paths to all nodes from the source node
  for(i in this.vertices){
    node = this.vertices[i];
    console.log("node => "+ node.index + " distance => " + node.dist);
  }
  dest = this.vertices[di];
  while(dest !== source){
    path.unshift(dest);
    dest = dest.prev;
  }
  path.unshift(dest);
  return path;
}

/************** Application code ends here ***********/




// this  is test method for giving input
var testMethod = function(){
  var path = [];
  // below are the inputs 
  var vertices = [0,1,2,3,4];		// vertices array
  // below are the edges array. please refer to Edge constrctor for params info.
  var edges = [new Edge(0,1,1),new Edge(1,2,1),new Edge(2,3,3),new Edge(1,3,3),new Edge(0,4,10),new Edge(3,4,2)];
  var g = new Graph(vertices,edges);
  path = g.shortestPath(0,4);
  var pathStr = '';
  for(var i in path){
    if(i != path.length - 1)
      pathStr += path[i].index + " --> ";
    else
      pathStr += path[i].index ;
  }
  console.log("The path is " + pathStr);
}

// calling the test method
testMethod();

