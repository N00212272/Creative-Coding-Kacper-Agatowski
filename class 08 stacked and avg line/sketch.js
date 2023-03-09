
// let fruits = [23, 56, 100, 80 ,45]
// let dogs = [23, 56, 100, 80 ,45]
let data;

let charts = [];

// objVal = Object.values(data.getObject());



function preload() {
  data = loadTable('data/SucideStat.csv','csv','header');
}

// function tidyData(){
//   for(let x=0; x<table.getRowCount();x++){
//       data.push(table.rows[x].obj.Female);
//   }
// }

// function mapData(){
//   mappedData = [];
//   let maxValue = max(data)
//   for(let x = 0; x<data.length;x++){
//       mappedData.push(map(0,data[x].Sales,maxValue,0,chartHeight))
//   }
//   // console.log(mappedData);
// }



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
    
    // charts.push(new BarChart(600,800,100,450, dogs, 5))

    // //creating an array, where i create a loop
    // for (let x=0; x<100; x++){
    //   let _randomNum = Math.floor(random(0,400))
    //   charts.push(new BarChart(_randomNum));
    // }
}

function draw(){
  charts[0].render();
  charts[1].render();
  charts[2].render();


}



