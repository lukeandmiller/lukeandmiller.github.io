import { 
  client,
  useConfig, 
  useEditorPanelConfig, 
  useElementColumns, 
  useElementData 
} from '@sigmacomputing/plugin';
import React from "react";
import './App.css';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
//import 'tippy.js/themes/light.css'

var width = 800;
var height = 500;


var svg = d3.select("#map")
	.append("svg")
	.attr("height", height)
	.attr("width", width)
  


var g = svg
	.append('g')
    .attr('transform', 'translate(-240,' + (height - 50) + ')');
	//.style("background-color", 'red')

//changes the size of the tiles to fit the canvas
  var transform = d3.geoTransform({
    point: function(x, y) {
      this.stream.point(x / 1.5, -y / 1.5); // added here
    }
  })

  var path = d3.geoPath()
	.projection(transform)

const tile_data = await d3.json("/src/tiles.topojson");

const state_codes = await d3.csv("/src/state_codes.csv");


client.config.configureEditorPanel([
  {
    // configuring selection of data source
    name: "source",
    type: "element",
  },
  {
    // configuring selection of data column from the source that contains qualitative values
    // (e.g. state_code)
    name: "dimension",
    type: "column",
    source: "source",
    allowMultiple: false,
  },
  {
    // configuring selection of data column(s) from the source that contain quantitative, numeric values
    // (e.g. student_counts)
    name: "measures",
    type: "column",
    source: "source",
    allowMultiple: true,
  },
]);



function App() {
  const config = useConfig();

  // Sigma represents their data in a columnar format. Given a data source, useElementData will return 
  // any columns specified in the side panel with their respective data. 
  // The format is { [columnId: string]: any[] } 
  // For more details / examples on the API, refer to the documentation.
  const sigmaData = useElementData(config.source);

  console.log("sigmaData",sigmaData);

  const columnInfo = useElementColumns(config.source);

  console.log("columnInfo",columnInfo); 

  // arrays of the ids corresponding to the "dimension" and "measures" data columns from the editor panel
  const { dimension, measures } = config;

  console.log("config",config);

  if (dimension && measures && Object.keys(columnInfo).length && columnInfo) {
    var dimensionName = columnInfo[dimension].name;
    var numMeasures = measures.length;
  }

  //useMemo caches results in mem
  const measureNames = React.useMemo(() => {
    const measureNames = [];
    if (numMeasures && Object.keys(columnInfo).length) {
      for (let i = 0; i < numMeasures; i++) {
        measureNames.push(columnInfo[measures[i]].name);
      }
    }

    return measureNames;
  }, [columnInfo, measures, numMeasures]);

  // rearranging the data so that Recharts can accept it
  const sig_data = React.useMemo(() => {
    const data = [];

    if (dimension && measures && Object.keys(sigmaData).length && sigmaData) {
      for (let i = 0; i < sigmaData[dimension].length; i++) {
        let row = {};
        row[dimensionName] = sigmaData[dimension][i];
        for (let j = 0; j < numMeasures; j++) {
          row[measureNames[j]] = sigmaData[measures[j]][i];
        }
        data.push(row);
      }
    }
    //console.log("final_data",data);
    return data;
  }, [
    dimension,
    measures,
    numMeasures,
    dimensionName,
    sigmaData,
    measureNames,
  ]);

  console.log("sig_data",sig_data);
  
  console.log("tile_data",tile_data);

  var tiles = topojson.feature(tile_data, tile_data.objects.tiles).features

	console.log("state_codes",state_codes);

  g.selectAll("svg_tiles")
  .data(tiles)
  .enter().append("path")
  .attr("class", "tile")
  .attr("d", path)
  .style("fill", d => {
      // Find the corresponding state data
      const stateData = sig_data.find(
          st => st["State Name"].toLowerCase() === d.properties.name.toLowerCase()
      );
      // Fill green if Max Report Year is not NA, otherwise fill white
      return stateData?.["Max Report Year"] !== null ? "green" : "white";
  })
  .style("stroke", 'black')
  .attr('title', d => d.properties.name)
  .on("mouseover", function() {
    // Use back-ticks for string templates with variables
    // Tippy is a tooltip module created below
    tippy(this, { 
      content: () => {
        const stateData = sig_data.find(
          st => st["State Name"].toLowerCase() === this.getAttribute('title').toLowerCase()
        );
        return "Max Report Year= " + (stateData?.["Max Report Year"] || "NA"); }})
  });

// Adding state label
g.selectAll("state_labels")
  .data(tiles)
  .enter()
  // Append and group together
  .append("g")
  .attr("transform", d => {
    const center = path.centroid(d);
    return `translate(${center[0]}, ${center[1] + 5})`; // unclear why I need to +5....
  })
  .append("text")
  .style("pointer-events", "none")
  // Gets the Max Report Year or returns "NA"
  .text(d => state_codes.find(
    st => st.State.toLowerCase() === d.properties.name.toLowerCase()
  ).Code)
  .style("text-anchor", "middle")
  .style("font-size", "15px")
  .style("font-family", "sans-serif");


  return (
    <>
    <div id="map"></div>
    </>
  )
}

export default App
