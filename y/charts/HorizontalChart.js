//passing a parameter and calling this height to whatever the height is placed
class HorizontalChart {
  constructor(_height, _width, _posX, _posY, _data, _numTicks,_xValue,_yValue,_yValueTitle,_title ){
    this.height =  _height;
    this.width =  _width;
    this.posX =  _posX;
    this.posY =  _posY;
    this.data =  _data;
    this.margin = 20;
    this.numTicks = _numTicks;
    this.dataGap = 10;
    this.yValue = _yValue;
    this.xValue = _xValue;
    this.yValueTitle = _yValueTitle;
    this.title = _title;
    this.highestNum = this.maximumValue();

  
  }
  
  render(){
      push();
      translate(this.posX, this.posY);
      this.drawXAxis();
      this.drawYAxis();
      this.drawBarData();
        pop();
  }
  maximumValue(){
    let highest = 0;
    for(let x=0; x<this.data.getRowCount(); x++){
      if(int(data.rows[x].obj[this.yValue])>highest){
        highest=int(data.rows[x].obj[this.yValue]);
      }
    }
    //managing the rounding
    for (let x=highest; x<1000000;x++){
      if(x%this.numTicks==0 && x%10==0){
        highest = x;
        break;
      }
    }
    return highest;
  }
  dataScaled(_num){
      let dataScaler = this.highestNum/this.height
       return _num / dataScaler
       
 }
 colourScaled(_num){
   let dataScaler = 255/this.highestNum
   return _num * dataScaler
 }

 drawXAxis(){

  line(0,0,this.height,0);

  let dataWidth =( this.width - (this.margin*2) - (this.data.getRowCount()-1)* this.dataGap) / this.data.getRowCount();
  let dataUnit = dataWidth + this.dataGap;

  push();
  translate(this.margin);
  let labels= this.data.getColumn(this.xValue);
  for(let x=0; x<labels.length; x++){
    let value = labels[x];
    fill(0);
    textSize(15)
    textAlign(CENTER,BOTTOM);
    text(value,-this.margin,-x*dataUnit + -(dataWidth/2));
    
  }
  textSize(30);
  text(this.yValueTitle,this.width/3,this.height/5)
  pop()
 }

 drawYAxis(){
  line(0,0,0,-this.width);
  for (let x=0; x<this.numTicks+1 ; x++){
    //Y axis Line
    stroke(50);
    let tickWidth = this.height/this.numTicks
    line(tickWidth*x,0,tickWidth*x , -this.margin);
    //text
    let textGap = this.highestNum/this.numTicks;
    noStroke();
    fill(50);
    textSize(20);
    textAlign(CENTER,TOP);
    text((textGap * x).toFixed(0), tickWidth * x,this.margin);
    textAlign(CENTER)
    textSize(50)
    text(this.title,this.width/2,-this.width+-this.margin*2)
    textSize(30);
    text(this.xValue,-80,-this.width/2)
    
    }
 }
 
drawBarData(){

  let dataWidth =( this.width - (this.margin*2) - (this.data.getRowCount()-1)* this.dataGap) / this.data.getRowCount();
  let dataUnit = dataWidth + this.dataGap;

  push();
  translate(this.margin);  
  for(let x=0;x<this.data.getRowCount();x++){
      noStroke();
      
      let value =int(-this.data.rows[x].obj[this.yValue])    
      fill(this.colourScaled(-value),0,0)
      rect(0,-x*dataUnit+-this.margin,-this.dataScaled(value),-dataWidth);
    }
    pop();
}


}