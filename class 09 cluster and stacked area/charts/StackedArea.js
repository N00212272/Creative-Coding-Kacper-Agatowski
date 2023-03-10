//passing a parameter and calling this height to whatever the height is placed
class StackedArea {
    constructor(_height, _width, _posX, _posY, _data, _numTicks,_title,_yValue,_yValueTitle,_xValue1,_xValue2,_xValue3,_xValue4){
      this.height =  _height;
      this.width =  _width;
      this.posX =  _posX;
      this.posY =  _posY;
      this.data =  _data;
      this.margin = 20;
      this.numTicks = _numTicks;
      this.dataGap = 10;
      this.xValue1 = _xValue1;
      this.xValue2 = _xValue2;
      this.xValue3= _xValue3;
      this.xValue4 = _xValue4;
      this.yValue = _yValue;
      this.yValueTitle =_yValueTitle;
      this.title = _title;
      this.dataArray = [_xValue1,_xValue2,_xValue3,_xValue4]

      
      
      this.highestNum = this.maximumValue();
     

      
    }
    
    render(){
        push();
        translate(this.posX, this.posY);
        this.drawXAxis();
        this.drawYAxis();
        this.drawBarData1();
       
          pop();
    }
    maximumValue(){
       let highest = 0;
        for(let x=0; x<this.data.getRowCount(); x++){
          if(int(data.rows[x].obj[this.xValue1])>highest){
            highest=int(data.rows[x].obj[this.xValue1]);        
          }
          else if(int(data.rows[x].obj[this.xValue1])+int(data.rows[x].obj[this.xValue2])>highest){
            highest=int(data.rows[x].obj[this.xValue1])+int(data.rows[x].obj[this.xValue2])
        }
            else if(int(data.rows[x].obj[this.xValue1])+int(data.rows[x].obj[this.xValue2])+int(data.rows[x].obj[this.xValue3])>highest){
              highest=int(data.rows[x].obj[this.xValue1])+int(data.rows[x].obj[this.xValue2]+int(data.rows[x].obj[this.xValue3]))
          }
            else if(int(data.rows[x].obj[this.xValue1])+int(data.rows[x].obj[this.xValue2])+int(data.rows[x].obj[this.xValue3])+int(data.rows[x].obj[this.xValue4])>highest){
              highest=int(data.rows[x].obj[this.xValue1])+int(data.rows[x].obj[this.xValue2]+int(data.rows[x].obj[this.xValue3])+int(data.rows[x].obj[this.xValue4]))
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
    textSize(30);
    text(this.yValue,this.width/2,60)
    pop()
    textAlign(CENTER)
    textSize(50)
    text(this.title,this.width/2,-this.height-this.margin)
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
      textSize(20);
      textWrap(WORD);
      text(this.yValueTitle,-this.margin,-this.height/2,-this.margin*2)
      }
   }
  
   drawBarData1(){
  
    let dataWidth =( this.width - (this.margin*2) - (this.data.getRowCount()-1)* this.dataGap) / this.data.getRowCount();
    let dataUnit = dataWidth + this.dataGap;

    push();
    translate(this.margin);  
    for (let y=0; y<this.dataArray.length;y++){
      let ary = this.dataArray[y];
      beginShape()
    for(let x=0;x<this.data.getRowCount();x++){
        noStroke();
        // let stack = int(-this.data.rows[x].obj[ary]) 
        // rect(x*dataUnit+this.margin,0,dataWidth,this.dataScaled(stack))
        let value =int(-this.data.rows[x].obj[this.xValue1])  
        // let value2 = int(-this.data.rows[x].obj[this.xValue2])
        // let value3 = int(-this.data.rows[x].obj[this.xValue3])
        // let value4 = int(-this.data.rows[x].obj[this.xValue4])
       textSize(20)

        fill(0,0,255)
        
            let a = this.width;
            let b =  this.dataScaled(value);
            vertex(a,b);
           
            
        //     console.log(a,b)
        }
        endShape(CLOSE)
        // rect(x*dataUnit+this.margin,this.dataScaled(value2),dataWidth,this.dataScaled(value));
        
      }
      pop();
  }
 
}

    
      

     
  

