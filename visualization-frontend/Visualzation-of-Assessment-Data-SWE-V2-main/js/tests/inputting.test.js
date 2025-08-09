let { isNumeric, isBetweenInclusiveValues, numericInputIsValid, isEmptyString } = require('../testingFunctions');






//////////////////////////////////////////////////////isNumeric function////////////////////////////////////////////////////////
test('isNumeric function input string: 100 ', () => {

    expect(isNumeric("100")).toStrictEqual(true);
    
});

///
test('isNumeric function input string: 0 ', () => {

    expect(isNumeric("0")).toStrictEqual(true);
    
});


test('isNumeric function input string: 1 ', () => {

    expect(isNumeric("1")).toStrictEqual(true);
    
});



test('isNumeric function input string: -1 ', () => {

    expect(isNumeric("-1")).toStrictEqual(true);
    
});


test('isNumeric function input string: 0.2 ', () => {

    expect(isNumeric("0.2")).toStrictEqual(true);
    
});




test('isNumeric function input string: 111.5 ', () => {

    expect(isNumeric("111.5")).toStrictEqual(true);
    
});



test('isNumeric function input int:  1 ', () => {

    expect(isNumeric(1)).toStrictEqual(false);
    
});



test('isNumeric function input :  null ', () => {

    expect(isNumeric(null)).toStrictEqual(false);
    
});


test('isNumeric function string :  a ', () => {

    expect(isNumeric("a")).toStrictEqual(false);
    
});


test('isNumeric function string :  home ', () => {

    expect(isNumeric("home")).toStrictEqual(false);
    
});


test('isNumeric function float :  0.2', () => {

    expect(isNumeric(0.2)).toStrictEqual(false);
    
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////isBetweenInclusiveValues function////////////////////////////////////////////
test('isBetweenInclusiveValues function: input =>  (10,1,15)', () => {

    expect(isBetweenInclusiveValues(10,1,15)).toStrictEqual(true);
    
});


test('isBetweenInclusiveValues function: input =>  (100,101,1)', () => {

    expect(isBetweenInclusiveValues(100,101,1)).toStrictEqual(false);
    
});


test('isBetweenInclusiveValues function: input =>  (5,6,100)', () => {

    expect(isBetweenInclusiveValues(5,6,100)).toStrictEqual(false);
    
});


test('isBetweenInclusiveValues function: input =>  (1,1,1)', () => {

    expect(isBetweenInclusiveValues(1,1,1)).toStrictEqual(true);
    
});


test('isBetweenInclusiveValues function: input =>  (-5,-15,-2)', () => {

    expect(isBetweenInclusiveValues(-5,-15,-2)).toStrictEqual(true);
    
});


test('isBetweenInclusiveValues function: input =>  (-5,-1,-2)', () => {

    expect(isBetweenInclusiveValues(-5,-1,-2)).toStrictEqual(false);
    
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////numericInputIsValid function////////////////////////////////////////////////

test('numericInputIsValid input String =>  null ', () => {

    expect(numericInputIsValid(null)).toStrictEqual(false);
    
});


test('numericInputIsValid input String =>  -1 ', () => {

    expect(numericInputIsValid('-1')).toStrictEqual(false);
    
});


test('numericInputIsValid input String =>  101 ', () => {

    expect(numericInputIsValid('101')).toStrictEqual(false);
    
});


test('numericInputIsValid input String =>  0 ', () => {

    expect(numericInputIsValid('0')).toStrictEqual(true);
    
});


test('numericInputIsValid input String =>  1 ', () => {

    expect(numericInputIsValid('1')).toStrictEqual(true);
    
});


test('numericInputIsValid input String =>  50 ', () => {

    expect(numericInputIsValid('50')).toStrictEqual(true);
    
});


test('numericInputIsValid input String =>  70 ', () => {

    expect(numericInputIsValid('70')).toStrictEqual(true);
    
});



test('numericInputIsValid input String =>  100 ', () => {

    expect(numericInputIsValid('100')).toStrictEqual(true);
    
});



test('numericInputIsValid input String =>  1.5 ', () => {

    expect(numericInputIsValid('1.5')).toStrictEqual(true);
    
});


test('numericInputIsValid input String =>  -1.5 ', () => {

    expect(numericInputIsValid('-1.5')).toStrictEqual(false);
    
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////isEmptyString function/////////////////////////////////////////////////////


test('isEmptyString input String =>  empty string ', () => {

    expect(isEmptyString('')).toStrictEqual(true);
    
});



test('isEmptyString input String =>  string with only spaces ', () => {

    expect(isEmptyString('  ')).toStrictEqual(true);
    
});



test('isEmptyString input String =>  . ', () => {

    expect(isEmptyString('.')).toStrictEqual(false);
    
});


test('isEmptyString input String =>  Hello ', () => {

    expect(isEmptyString('Hello')).toStrictEqual(false);
    
});



test('isEmptyString input String =>  Hello World ', () => {

    expect(isEmptyString('Hello World')).toStrictEqual(false);
    
});


test('isEmptyString input String =>  null ', () => {

    expect(isEmptyString(null)).toStrictEqual(false);
    
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////