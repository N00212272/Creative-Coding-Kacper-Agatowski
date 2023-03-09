//passing a parameter and calling this height to whatever the height is placed
class StackedChart {
    constructor(_height, _width, _posX, _posY, _data, _numTicks,_yValue,_xValue,_xValue2, ){
      this.height =  _height;
      this.width =  _width;
      this.posX =  _posX;
      this.posY =  _posY;
      this.data =  _data;
      this.margin = 20;
      this.numTicks = _numTicks;
      this.dataGap = 10;
      this.xValue = _xValue;
      this.xValue2 = _xValue2;
      this.yValue = _yValue;
      
      this.nameX =_xValue;
      this.nameX2 =_xValue2;
      this.highestNum = this.maximumValue();
     

      
    }
    
    render(){
        push();
        translate(this.posX, this.posY);
        this.drawXAxis();
        this.drawYAxis();
        this.drawBarData1();
        this.drawBarData2();
        this.averageLine();
          pop();
    }
    maximumValue(){
       let highest = 0;
        for(let x=0; x<this.data.getRowCount(); x++){
          if(int(data.rows[x].obj[this.xValue])>highest){
            highest=int(data.rows[x].obj[this.xValue]);          
          }
          for(let y=0;y<this.data.getRowCount(); y++ ){
            if(int(data.rows[x].obj[this.xValue2])>highest){
              highest=int(data.rows[x].obj[this.xValue2]);
            }
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
    let labels= this.data.getColumn(this.yValue);
    for(let x=0; x<labels.length; x++){
      let value = labels[x];
      fill(0);
      textSize(20);
      textAlign(CENTER);
      text(value,x*dataUnit + (dataWidth/2),20);
    }
    pop()
   }

   drawYAxis(){
    line(0,0,0,-this.height);
    for (let x=0; x<this.numTicks+1 ; x++){
      //Y axis Line
      stroke(50);
      let tickWidth = this.height/this.numTicks
      line(0,-tickWidth*x ,-this.margin ,-tickWidth*x);
      //text
      let textGap = this.highestNum/this.numTicks;
      noStroke();
      fill(50);
      textSize(20);
      textAlign(RIGHT,CENTER);
      text((textGap * x).toFixed(0), -this.margin, -tickWidth * x);
      }
   }
  
  drawBarData1(){
    let dataWidth =( this.width - (this.margin*2) - (this.data.getRowCount()-1)* this.dataGap) / this.data.getRowCount();
    let dataUnit = dataWidth + this.dataGap;

    push();
    translate(this.margin);  
    for(let x=0;x<this.data.getRowCount();x++){
        noStroke();
        let value =int(-this.data.rows[x].obj[this.xValue]);  
       
       if((int(this.data.rows[x].obj[this.xValue])+0)  < this.highestNum){
        textSize(20)
        text(this.nameX,this.width/2,this.height/6);
        fill(0,0,255);
        rect(x*dataUnit+this.margin,0,dataWidth,this.dataScaled(value));
      }
      else if((int(this.data.rows[x].obj[this.xValue])+0) > this.highestNum){
        textSize(20)
        text(this.nameX,this.width/1.5,this.height/6);
        fill(255,0,0)
        rect(x*dataUnit+this.margin,0,dataWidth,this.dataScaled(value));
       
      }
      
  }
  pop();
}
  
  drawBarData2(){
    let dataWidth =( this.width - (this.margin*2) - (this.data.getRowCount()-1)* this.dataGap) / this.data.getRowCount();
    let dataUnit = dataWidth + this.dataGap;

    push();
    translate(this.margin);  
    for(let x=0;x<this.data.getRowCount();x++){
        noStroke();
        let value =int(-this.data.rows[x].obj[this.xValue2]);  
        if((int(this.data.rows[x].obj[this.xValue2])+0) > this.highestNum){
          textSize(20)
          text(this.nameX2,this.width/2,this.height/6);
          fill(0,0,255);
          rect(x*dataUnit+this.margin,0,dataWidth,this.dataScaled(value));
        }
        else if((int(this.data.rows[x].obj[this.xValue2])+0) < this.highestNum){
          textSize(20)
          text(this.nameX2,this.width/1.5,this.height/6);
          fill(255,0,0)
          rect(x*dataUnit+this.margin,0,dataWidth,this.dataScaled(value));
        }
        
      }
      pop();
  }
  averageLine(){
    let dataWidth =( this.width - (this.margin*2) - (this.data.getRowCount()-1)* this.dataGap) / this.data.getRowCount();
    let dataUnit = dataWidth + this.dataGap;
    push()
        //Had to do -1 as it is looking for the next value which doesnt exist
      for(let x=0; x<this.data.getRowCount()-1; x++){
        let sum = 0;
        sum += int(-this.data.rows[x].obj[this.xValue]) +int(-this.data.rows[x].obj[this.xValue2])
        let sum2 = 0;
        sum2 += int(-this.data.rows[x+1].obj[this.xValue]) +int(-this.data.rows[x+1].obj[this.xValue2])
        // console.log(sum,"sum")
        let avg = sum/2;
        let avg2 = sum2/2
        // console.log(avg)
        stroke(25)
        line(x*dataUnit + (dataWidth/2)+this.margin,avg,(x+1)*dataUnit + (dataWidth/2)+this.margin,avg2)
        line(this.width/2,this.height/6,this.width/2.5,this.height/6)
        noStroke();
        text("average",this.width/2.5,this.height/6)
      }
      pop()
    
      

     
  }

}