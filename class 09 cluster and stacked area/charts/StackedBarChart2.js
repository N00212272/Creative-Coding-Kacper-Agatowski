//passing a parameter and calling this height to whatever the height is placed
class StackedChart2 {
	constructor(
		_height,
		_width,
		_posX,
		_posY,
		_data,
		_numTicks,
		_title,
		_yValue,
		_yValueTitle,
		_total,
		_dataArray
		
	) {
		this.height = _height;
		this.width = _width;
		this.posX = _posX;
		this.posY = _posY;
		this.data = _data;
		this.margin = 20;
		this.numTicks = _numTicks;
		this.dataGap = 10;
		
		this.yValue = _yValue;
		this.yValueTitle = _yValueTitle;
		this.title = _title
		this.total = _total
		this.dataArray = _dataArray;
		this.colourPallete = ["#C73A40", "#416FEC", "#F77C3F", "#76332F"];

		this.highestNum = this.maximumValue();
	}

	render() {
		push();
		translate(this.posX, this.posY);
		this.drawXAxis();
		this.drawYAxis();
		this.drawBarData1();
		this.averageLine();
		pop();
	}
	maximumValue() {
		let highest = 0;
		
			for (let x = 0; x < this.data.getRowCount(); x++) {
				if (int(data.rows[x].obj[this.total]) > highest) {
					highest = int(data.rows[x].obj[this.total]);
				}
			}
		
		//managing the rounding
		for (let x = highest; x < 1000000; x++) {
			if (x % this.numTicks == 0 && x % 10 == 0) {
				highest = x;
				break;
			}
		}
		
		return highest;
	}

	dataScaled(_num) {
		let dataScaler = this.highestNum / this.height;
		return _num / dataScaler;
	}

	drawXAxis() {
		line(0, 0, this.width, 0);

		let dataWidth =
			(this.width -
				this.margin * 2 -
				(this.data.getRowCount() - 1) * this.dataGap) /
			this.data.getRowCount();
		let dataUnit = dataWidth + this.dataGap;

		push();
		translate(this.margin, 0);
		let labels = this.data.getColumn(this.yValue);
		for (let x = 0; x < labels.length; x++) {
			let value = labels[x];
			fill(0);
			textSize(20);
			textAlign(CENTER);
			text(value, x * dataUnit + dataWidth / 2, 20);
		}
		textSize(30);
		text(this.yValue, this.width / 2, 60);
		pop();
		textAlign(CENTER);
		textSize(50);
		text(this.title, this.width / 2, -this.height - this.margin);
	}

	drawYAxis() {
		line(0, 0, 0, -this.height);
		for (let x = 0; x < this.numTicks + 1; x++) {
			//Y axis Line
			stroke(50);
			let tickWidth = this.height / this.numTicks;
			line(0, -tickWidth * x, -this.margin, -tickWidth * x);
			//text
			let textGap = this.highestNum / this.numTicks;
			noStroke();
			fill(50);
			textSize(20);
			textAlign(RIGHT, CENTER);
			text((textGap * x).toFixed(0), -this.margin, -tickWidth * x);
			textSize(20);
			textWrap(WORD);
			text(this.yValueTitle, -this.margin, -this.height / 2, -this.margin * 2);
		}
	}

	drawBarData1() {
		let dataWidth =
			(this.width -
				this.margin * 2 -
				(this.data.getRowCount() - 1) * this.dataGap) /
			this.data.getRowCount();

		let dataUnit = dataWidth + this.dataGap;

		push();
		translate(this.margin);
		for (let x = 0; x < this.data.getRowCount(); x++) {
			push();
			translate(x * dataUnit + this.margin, 0);
			
            for (let y = 0; y < this.dataArray.length; y++) {
				
				let ary = this.dataArray[y];
				let col = this.colourPallete[y];

				noStroke();
				let stack = int(this.data.rows[x].obj[ary]);

				fill(color(col));

				rect(0, 0, dataWidth, -this.dataScaled(stack));
				translate(0, -this.dataScaled(stack));
				
			}
			
			pop();
			
			
		}
		pop();

		//Legend
		push()
	
		for (let i=0; i<this.dataArray.length;i++){
			let ary = this.dataArray[i];
			let col = this.colourPallete[i];
			fill(color(col))
			text( ary,i*this.width/8,this.height/4)
		}
		pop()
	}

	averageLine() {
		let dataWidth =
			(this.width -
				this.margin * 2 -
				(this.data.getRowCount() - 1) * this.dataGap) /
			this.data.getRowCount();
		let dataUnit = dataWidth + this.dataGap;
		push();
		translate(this.margin);
		
		for (let x = 0; x < this.data.getRowCount()-1; x++) {
			push()
			let sum = 0;
				let sum2 = 0;
				// let ary = this.dataArray[y];

				sum += (int(data.rows[x].obj[this.dataArray[1]]))
				sum2 +=  (int(data.rows[x].obj[this.dataArray[0]]))
			
				
				let finalSum = sum + sum2;
				
				let avg = finalSum/this.dataArray.length;
				
				console.log(avg)
				stroke(50)
				
				line(x*dataUnit + (dataWidth/2)+this.margin,-avg,(x+1)*dataUnit + (dataWidth/2)+this.margin,-avg)
				
				
				pop()
			}
			
				

				pop();
			}
			
			
		}
		
		
			
		
	

