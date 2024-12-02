import 'd3'

// var width = 800;
// var height = 500;


// var svg = d3.select("#map")
// 	.append("svg")
// 	.attr("height", height)
// 	.attr("width", width)


// var g = svg
// 	.append('g')
//     .attr('transform', 'translate(-240,' + (height - 50) + ')');
// 	//.style("background-color", 'red')


// d3.json("/src/tiles.topojson")

// // var projection = d3.geoMercator()
// // 	.translate( [width / 2, height / 2 ])
// // 	.scale(100)

//  var transform = d3.geoTransform({
//   point: function(x, y) {
//     this.stream.point(x / 1.5, -y / 1.5); // added here
//   }
// })

// //must always do this?
// //svg rendering 
// var path = d3.geoPath()
// 	.projection(transform)

// // Create a projection for the map
// // const projection = d3.geoAlbersUsa()
// //     .scale(1000)
// //     .translate([width / 2, height / 2]);

// // // Create a path generator
// // const path = d3.geoPath()
// //     .projection(projection);





 function Tilegram () {

    // d3.csv("/src/state_codes.csv", function(data) {
    //       console.log(data)
    //       }
    //   );

//     console.log(data);

// 	var tiles = topojson.feature(data, data.objects.tiles).features

// 	console.log(tiles);

// 	g.selectAll("svg_tiles")
// 		.data(tiles)
// 		.enter().append("path")
// 	.attr("class", "tile")
//     .attr("d", path)
//     .style("fill", 'white')
//     .style("stroke", 'black')
	//.attr('title', d => d.properties.name)
    // .on("mouseover", function() {
    //   // use back-ticks for string templates with variables
    //   //tippy is a tool tip module created below
    //   tippy(this, {content: `${this.getAttribute('title')}`});
	//    })
	  //Adding state label
  // g.selectAll("state_labels")
  //   .data(tiles)
  //   .enter()
  //   .append("g")
  //   .attr("transform", d => {
  //     const center = path.centroid(d);
  //     return `translate(${center[0]}, ${center[1] + 5})`; // unclear why I need to +5....
  //   })
  //   .append("text")
  //   .style("pointer-events", "none")
  //   //gets the 2 letter abbr.
  //   .text(
  //     d =>
  //       state_codes.find(
  //         st => st.State.toLowerCase() === d.properties.name.toLowerCase()
  //       ).Code
  //   )
  //   .style("text-anchor", "middle")
  //   .style("font-size", 15 + "px")
  //   .style("font-family", "sans-serif");


  return (
  <div>Hello World</div>
  )

};

export default Tilegram;