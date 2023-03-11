
// let fruits = [23, 56, 100, 80 ,45]
// let dogs = [23, 56, 100, 80 ,45]
let data;
let clusData;
let charts = [];
// objVal = Object.values(data.getObject());



function preload() {
  data = loadTable('data/SucideStat.csv','csv','header');


}




function setup(){
  
    createCanvas(10000,10000);
    angleMode(DEGREES);
   
    // let dataArray = data.getArray();
    // for (let i = 0; i<dataArray.length; i++){
    //   console.log(dataArray[i]);
    // } 
    noLoop();


    charts.push(new BarChart(
      500,600,200,600, 
      data, 
      5,
      'Year',
      'Total',
      'Number of Total deaths',
      'BarChart Total Suicides in Ireland '))
    //The stacked chart is able to stack from one to 4 data sets.
    charts.push(new StackedChart(500,800,2400,1500,
       data, 
       12,
       'Stacked Suicides in Ireland (Males & Females)',
       'Year','Number of male and female death',
       'Male','Female'))

    charts.push(new HorizontalChart(500,800,200,1700,
       data,
        5,
        'Year',
        'Total',
        'Number of Total deaths',
        'HorizontalChart Total suicides in Ireland'));

    charts.push(new ClusteredChart(500,800,1200,1500,
      data, 
      12,
      'Clustered Suicides in Ireland (Males & Females)',
      'Year',
      'Number of male, Females and deaths',
      'Total',
      ['Male','Female','Total']))


       charts.push(new StackedChart2(500,800,2400,600,
        data, 
        12,
        'Stacked Suicides in Ireland (Males & Females)',
        'Year',
        'Number of male and female deaths',
        'Total',
        ['Male','Female']))

        charts.push(new BarChart(
          500,600,1200,600, 
          data, 
          5,
          'Year',
          'Female',
          'Number of Female deaths',
          'BarChart Female Suicides in Ireland '))
  
}

function draw(){
  background(200)
  charts[0].render();
  charts[1].render(); //This the chart which was not looped but has an average line
  charts[2].render();
  charts[3].render();
  charts[4].render();
  charts[5].render();
  // charts[5].render();


}



