class FirstDay{

    constructor(year, month){
        this.year = year;
        this.month = month;
    }

    firstDay(){
        const dd = new Date(this.year, this.month, 1);
        const total = dd.toDateString();
        const firstDayIs = total.split(" ");

        return firstDayIs[0]
    }

}

export default FirstDay