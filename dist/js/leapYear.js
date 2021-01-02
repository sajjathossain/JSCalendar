class LeapYear {

    constructor(year) {
        this.year = year;
    }

    leap() {
        if (this.year % 400 === 0 && this.year % 100 !== 0 || this.year % 4 === 0) {
            return true;
        }
    }
    
}

export default LeapYear;