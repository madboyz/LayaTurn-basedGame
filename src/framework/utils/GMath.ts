abstract class GMath {

	public static K_R2A: number = 180 / Math.PI;
	public static K_A2R: number = Math.PI / 180;


	public static random(first, end, isInt: boolean = true): number {
		var r = end - first;
		r = Math.random() * r + first;
		if (isInt) {
			r = Math.floor(r);
		}
		return r;
	}

	/**
	 * 获取某点的夹角
	 * 返回为弧度值
	 */
	public static getPointRadian(x: number, y: number): number {
		return Math.atan2(y, x);
	}

	/**
	  * 将一对极坐标转换为笛卡尔点坐标。
	  * @param len 极坐标对的长度。
	  * @param radian 极坐标对的角度（以弧度表示）。
	  */
	public static polar(len: number, radian: number): { x: number, y: number } {
		return { x: Math.floor(len * Math.cos(radian)), y: Math.floor(len * Math.sin(radian)) };
	}


	/**
	 * 弧度转角度
	 */
	public static R2A(r: number): number {
		return Math.floor(r * GMath.K_R2A)
	}

	/**
	 * 角度转弧度
	 */
	public static A2R(a: number = 0): number {
		return a * GMath.K_A2R;
	}

	/**
	 * 求两点夹角
	 * @returns 角度
	 */
	public static getAngle(x1, y1, x2, y2) {
		let radian = this.getPointRadian(x2 - x1, y2 - y1);
		let a = this.R2A(radian);

		return a < 0 ? 360 + a : a;
	}

	public static getAngle1(x1, y1, x2, y2) {
		let radian = this.getPointRadian(x2 - x1, y2 - y1);
		let a = this.R2A(radian);
		return a;
	}
	/**
	 * 根据角度获得方向
	 * @param angle -180 ~ 180 
	 */
	public static getDirection(angle): number {
		let a = angle < 0 ? 360 + angle + 22.5 : angle + 22.5;
		let d = Math.floor(a / 45);
		return d < 8 ? d : 0;
	}

	/**
	 * 随机范围取值
	 */
	public static randRange(minNum: number, maxNum: number): number {
		return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
	}

	public static getPath(angle: number): number {
		return angle >= 0 ? 0 : 1;
	}

	/**
	 * 获得中文数字
	 * @param value 
	 */
	public static GetChineseNumber(value:number):string
	{
		var show_count = value.toString();
		if(value>99999999)
		{
			show_count =  (value / 100000000).toFixed(1)+"亿";
			value = value % 100000000
		}
		else if(value > 99999)
		{
			show_count = (value / 10000).toFixed(1) +"万";
			value = value % 10000
		}
		return show_count;
	}
	/**
	 * 洗牌算法
	 * @param arr 
	 */
	public static Shuffle(arr):Array<any> {
		for(var i = arr.length-1; i >=0; i--) {
			var randomIndex = Math.floor(Math.random()*(i+1)); 
			var itemAtIndex = arr[randomIndex]; 
			arr[randomIndex] = arr[i]; 
			arr[i] = itemAtIndex;
		}
			
		return arr;
	}
}
