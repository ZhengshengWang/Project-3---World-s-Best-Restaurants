function zoomTo(lat,lng,zoom){
  //set map view to ([lat,lng],zoom Level)
  map_06c7c6fd049b8c568e0b30a5a6e021b2.setView([lat,lng],zoom);
};
function buildCountryChart(restList,lat,lng){
  d3.json("https://raw.githubusercontent.com/ZhengshengWang/Project-3---World-s-Best-Restaurants/refs/heads/main/Resource/restRepeatRank.json").then((data)=>{
    let restCount = [];
    for (let i = 0; i<restList.length; i++){
      let restObj = data.filter((item)=>item.restaurant === restList[i]);
      restCount.push(restObj[0].count);
    }
    let b2Data = [
      {
        type: 'bar',
        x: restList,
        y: restCount,
        hovertemplate: `<i>%{x}</i>` +
                       `<br><b>Number of Top 50s: </b> %{y}<extra></extra>`
      }
    ];
    let b2Layout = {
      title: {
        text: "Number of times in top 50s",
        automargin: true
      },
      hovermode: 'closest',
      xaxis: {
        type: 'category',
        automargin: true
      }
    };

    // Render the Bar Chart #2
    Plotly.newPlot("bar2",b2Data,b2Layout);
    buildBumpChart(restList);
    // bar2 chart even set up
    let bar2 = document.getElementById('bar2');
    bar2.on('plotly_click',function(data){
      //zoom to [lat,lng] by the index value.
      zoomTo(lat[restList.indexOf(data.points[0].x)],lng[restList.indexOf(data.points[0].x)],15)
    });
  })
}
// function to build charts
function buildCharts(country) {
  d3.json("https://raw.githubusercontent.com/ZhengshengWang/Project-3---World-s-Best-Restaurants/refs/heads/main/Resource/csvjson.json").then((data) => {

    // Get the data
    let list = data;

    // Filter the list for the object with the desired Region
    let selection = list.filter((item)=>item.country === country);
    //for calculation
    let restLat = 0;
    let restLng = 0;
    //saving data to variable
    let restList = [];
    let latList = [];
    let lngList = [];
    for (let i = 0; i<selection.length; i++){
      //check if repeat
      if (!restList.includes(selection[i].restaurant)){
        restLat = restLat + selection[i].lat;
        restLng = restLng + selection[i].lng;
        restList.push(selection[i].restaurant);
        latList.push(selection[i].lat);
        lngList.push(selection[i].lng);
      }
    };
    //zoom to average of lat and lng for markers
    zoomTo(restLat/latList.length,restLng/lngList.length,5);
    buildCountryChart(restList,latList,lngList);

    // Render the Bar Chart #3
    //Plotly.newPlot("bar3",b3Data,b3Layout);
  });
}
function buildRegionChart(counList){
  d3.json("https://raw.githubusercontent.com/ZhengshengWang/Project-3---World-s-Best-Restaurants/refs/heads/main/Resource/countryTopRest.json").then((data)=>{
    let counCount = [];
    for (let i = 0; i <counList.length; i++){
      let counObj = data.filter((item)=>item.country === counList[i]);
      counCount.push(counObj[0].count);
    }
  
    let b1Data = [
      {
        type: 'bar',
        y: counList,
        x: counCount,
        orientation: 'h',
        hovertemplate: `<i>%{y}</i>` +
                `<br><b>Number of Top 50s: </b> %{x}<extra></extra>`
      }
    ];
    let b1Layout = {
      title: "Counts of Top 50s for Restaurants in Region",
      hovermode: 'closest',
      xaxis:{
        title:{text:'Number of Awards'}
      },
      yaxis:{
        automargin: true,
        tickfont:{
          size: 12
        }
      }
    };
    // Render the Bar Chart #1 
    Plotly.newPlot("bar1",b1Data,b1Layout);
    // bar1 chart event set up
    let bar1 = document.getElementById('bar1');
    bar1.on('plotly_click', function(data){
      //changing dropdown option display
      let optSel = document.getElementById("selDataset2");
      optSel.value = data.points[0].y;
      //changing chart display to the clicked country
      buildCharts(data.points[0].y);
    });
  });
}

function buildSubFilt(region){
  d3.json("https://raw.githubusercontent.com/ZhengshengWang/Project-3---World-s-Best-Restaurants/refs/heads/main/Resource/csvjson.json").then((data)=>{
    let list = data;
    //filter data to the region
    let selection = list.filter((item)=>item.Region === region);
    //store list of country
    let counList = [];
    for (let i = 0; i<selection.length;i++){
      if (!counList.includes(selection[i].country)){
        counList.push(selection[i].country);
      }
    }
    //build dropdown for country selection
    let dataSelect = d3.select('#selDataset2')
    //remove anything outdated by re-selection
    dataSelect.selectAll("option").remove();
    //append a new list of option
    for (let i = 0; i<counList.length; i++){
      dataSelect.append("option").text(counList[i]);
    }
    //init subfilter selection
    buildRegionChart(counList);
    //init restaurant chart by first country
    let sel = counList[0]
    buildCharts(sel);
  });
  
}
// Function to run on page load
function init() {
    let dataSelect = d3.select("#selDataset");
    //init regional option
    let region = ['North America','Africa','Asia','Australia','Europe','South America']
    for (let i = 0; i<region.length; i++){
      dataSelect.append("option").text(region[i]);
    }
    //init start selection
    let firstSel = region[0];
    //build init sub filter
    buildSubFilt(firstSel);
    //buildBumpChart();
}

// Function for event listener
function optionChanged(newRegion) {
  buildSubFilt(newRegion);
}
function optionChanged2(newCountry){
  buildCharts(newCountry);
}
function buildBumpChart(restList) {
  d3.json("https://raw.githubusercontent.com/ZhengshengWang/Project-3---World-s-Best-Restaurants/refs/heads/main/Resource/csvjson.json")
  .then((data) => {
      // create traces for each restaurant
      let restaurants = Array.from(new Set(data.map(d => d.restaurant)));
      let traces = [];
      restaurants.forEach(restaurant => {
          let restaurantData = data.filter(d => d.restaurant === restaurant);
          // x (years) and y (rankings) arrays
          let x = restaurantData.map(d => d.year);
          let y = restaurantData.map(d => d.rank);
          traces.push({
              x: x,
              y: y,
              type: 'scatter',
              mode: 'lines+markers',
              name: restaurant,
              hovertemplate: `<b>${restaurant}</b><br>Year: %{x}<br>Rank: %{y}<extra></extra>`,
              line: { width: 2 }
          });
      });
      // Set up the layout
      let layout = {
          title: 'Ranking Changes Over Time',
          xaxis: {
              title: 'Year',
              tickmode: 'linear'
          },
          yaxis: {
              title: 'Ranking',
              autorange: 'reversed', // Rank 1 at the top
              tickvals: [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
          },
          hovermode: 'closest'
      };
      // Step 3: Render the chart
      Plotly.newPlot('bar3', traces, layout)
})};







// Initialize the dashboard
init();




