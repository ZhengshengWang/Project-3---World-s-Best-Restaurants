function buildCountryChart(restList){
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
        y: restCount
      }
    ];
    let b2Layout = {
      title: "Number of times in top 50"
    };
    // Render the Bar Chart #2
    Plotly.newPlot("bar2",b2Data,b2Layout);
  })
}
// function to build charts
function buildCharts(country) {
  d3.json("https://raw.githubusercontent.com/ZhengshengWang/Project-3---World-s-Best-Restaurants/refs/heads/main/Resource/csvjson.json").then((data) => {

    // Get the data
    let list = data;

    // Filter the list for the object with the desired Region
    let selection = list.filter((item)=>item.country === country);
    let restList = [];
    for (let i = 0; i<selection.length; i++){
      if (!restList.includes(selection[i].country)){
        restList.push(selection[i].restaurant);
      }
    };
    //console.log(country);
    //console.log(restList);
    buildCountryChart(restList);


    

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
        orientation: 'h'
      }
    ];
    let b1Layout = {
      title: "Counts of top Restaurants in Region",
      xaxis:{
        title:{text:'Count of Restaurants'}
      }
    };
    // Render the Bar Chart #1 
    Plotly.newPlot("bar1",b1Data,b1Layout);
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
    //init subfilt selection
    buildRegionChart(counList);
    let sel = counList[0]
    buildCharts(sel);
  });
  
}
// Function to run on page load
function init() {
    let dataSelect = d3.select("#selDataset");
    //init regional option
    let region = ['Africa','Asia','Australia','Europe','North America','South America']
    for (let i = 0; i<region.length; i++){
      dataSelect.append("option").text(region[i]);
    }
    //init start selection
    let firstSel = region[0];
    //build init sub filter
    buildSubFilt(firstSel);
}

// Function for event listener
function optionChanged(newRegion) {
  buildSubFilt(newRegion);
}
function optionChanged2(newCountry){
  buildCharts(newCountry);
}

// Initialize the dashboard
init();
