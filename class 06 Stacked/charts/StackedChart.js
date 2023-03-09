//passing a parameter and calling this height to whatever the height is placed
class StackedChart {
    constructor(_height, _width, _posX, _posY, _data, _numTicks ){
      this.height =  _height;
      this.width =  _width;
      this.posX =  _posX;
      this.posY =  _posY;
      this.data =  _data;
      this.margin = 20;
      this.numTicks = _numTicks;
      this.dataGap = 10;
      // this.maximumValue = Math.max(...this.data.map(item => item.Sales));
      // this.maximumValue = Math.max(...this.data);
      this.highestNum = this.maximumValue();
    
    }
    
    render(){
        push();
        translate(this.posX, this.posY);
        this.drawXAxis();
        this.drawYAxis();
        this.drawBarData1();
        this.drawBarData2();
          pop();
    }
    maximumValue(){
        let highest = 0;
        for(let x=0; x<this.data.getRowCount(); x++){
          if(int(data.rows[x].obj.Male)>highest){
            highest=int(data.rows[x].obj.Male);
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

   drawXAxis(){

    line(0,0,this.width,0);

    let dataWidth =( this.width - (this.margin*2) - (this.data.getRowCount()-1)* this.dataGap) / this.data.getRowCount();
    let dataUnit = dataWidth + this.dataGap;

    push();
    translate(this.margin,0);
    let labels= this.data.getColumn("Year");
    for(let x=0; x<labels.length; x++){
      let value = labels[x];
      fill(0);
      textAlign(CENTER);
      text(value,x*dataUnit + (dataWidth/2),20);
    }
    pop()
    //LEGEND
    fill(0,255,0);
    rect(450,70,40,40);
    fill(0);
    textSize(20)
    text("Male",450,60)

    fill(255,0,0);
    rect(350,70,40,40);
    fill(0);
    textSize(20)
    text("Female",340,60)
   }

   drawYAxis(){
    line(0,0,0,-this.height);
    for (let x=0; x<this.numTicks+1 ; x++){
      //Y axis Line
      stroke(50);
      let tickWidth = this.height/this.numTicks
      line(0,-tickWidth*x ,-10 ,-tickWidth*x);
      //text
      let textGap = this.highestNum/this.numTicks;
      noStroke();
      fill(50);
      textSize(10);
      textAlign(RIGHT,CENTER);
      text((textGap * x).toFixed(0), -10, -tickWidth * x);
      }
   }
//    Female bar
  drawBarData1(){
    let dataWidth =( this.width - (this.margin*2) - (this.data.getRowCount()-1)* this.dataGap) / this.data.getRowCount();
    let dataUnit = dataWidth + this.dataGap;

    push();
    translate(this.margin);  
    for(let x=0;x<this.data.getRowCount();x++){
        noStroke();
        fill(255,0,0)
        let value =int(-this.data.rows[x].obj.Female)    
        // console.log("female",value)
        rect(x*dataUnit+this.margin,0,dataWidth,this.dataScaled(value));
      }
      pop();
  }
  //Male value 
  drawBarData2(){
    let dataWidth =( this.width - (this.margin*2) - (this.data.getRowCount()-1)* this.dataGap) / this.data.getRowCount();
    let dataUnit = dataWidth + this.dataGap;

    push();
    translate(this.margin);  
    for(let x=0;x<this.data.getRowCount();x++){
        noStroke();
        fill(0,0,0,50);
        let value =int(-this.data.rows[x].obj.Male);  
        // console.log("male",value)
        rect(x*dataUnit+this.margin,0,dataWidth,this.dataScaled(value));
      }
      pop();
  }
  // console.log(this.data[x].Salesthis.data.length);
    //    for(let x=0; x<this.data.rowCount; x++){
      //     console.log(int(this.data.rows[x].obj.Sales))
      // }
}