let t = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];

let year = 2020;
month = 11;

/*
    sun=3;
    mon=4;
    tue=5;
    wed=6;
    thu=0;
    fri=1;
    sat=2;
*/

// let formula = year + year / 4 - year / 100 + year / 400 + t[month - 1] + 1;

// console.log(parseInt(formula % 7));

// let dd = new Date(2020, 11, 1);

// console.log(dd.getDay());

// W = (k + (2.6*m - 0.2) - 2C + Y + Y/4 + C/4 )%7

//  JFM AMJ JAS OND 144 025 036 146

/*
k is key (1 to 31)
m is month (1 = March, ..., 10 = December, 11 = Jan, 12 = Feb) Treat Jan & Feb as months of the preceding year
C is century (1987 has C = 19)
Y is year (1987 has Y = 87 except Y = 86 for Jan & Feb)
W is week day (0 = Sunday, ..., 6 = Saturday)
*/

// let y = 2019
// console.log(y % 100);
// console.log(parseInt(y / 100))

// const W = (-1 + Math.floor(2.6 * 4 - 0.2) - 2 * 20 + 2020 + Math.floor(2020 / 4) + Math.floor(20 / 4)) % 7
// console.log("W : ", W);


let d = 1;
let m = 1;
let y = 2021;
let C = Math.floor(y / 100);
let D = y % 100;

let N = d + 2 * m + (3 * (m + 1) / 5) + y + (y / 4) - (y / 100) + (y / 400) + 2;
N = Math.ceil(N);
console.log("N = ", N % 7)

let f = d + ((13 * m - 1) / 5) + D + (D / 4) + (C / 4) - 2 * C;
f = Math.ceil(f);
console.log("f = ", f % 7, C,D);