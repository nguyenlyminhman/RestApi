module.exports = {
    roundToTwo: roundToTwo
};

// roundToTwo(1.005)
// 1.01
// roundToTwo(10)
// 10
// roundToTwo(1.7777777)
// 1.78
// roundToTwo(9.1)
// 9.1
// roundToTwo(1234.5678)
// 1234.57
let roundToTwo = (num) => {
    +(Math.round(num + "e+2") + "e-2");
}