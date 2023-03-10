
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
    background(200);
    angleMode(DEGREES);
    rectMode(CORNER);
    // let dataArray = data.getArray();
    // for (let i = 0; i<dataArray.length; i++){
    //   console.log(dataArray[i]);
    // } 
    noLoop();


    charts.push(new BarChart(500,600,200,600, data, 5,'Year','Total','Number of Total deaths','BarChart Total Suicides in Ireland '))
    //The stacked chart is able to stack from one to 4 data sets.
    charts.push(new StackedChart(500,800,1200,600, data, 12,'Stacked Suicides in Ireland (Males & Females)','Year','Number of male and female death','Male','Female'))

    charts.push(new HorizontalChart(500,800,200,1700, data, 5,'Year','Total','Number of Total deaths','HorizontalChart Total suicides in Irleand'));

    charts.push(new ClusteredChart(500,800,1200,1500, data, 12,'Clustered Suicides in Ireland (Males & Females)','Year','Number of male and female death','Male','Female'))

    charts.push(new StackedArea(500,800,1200,1500, data, 12,'Stacked Suicides in Ireland (Males & Females)','Year','Number of male and female death','Male','Female'))
    
  
}

function draw(){
  background(100)
  charts[0].render();
  charts[1].render();
  charts[2].render();
  charts[3].render();


}



