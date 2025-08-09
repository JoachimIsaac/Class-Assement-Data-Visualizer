const { loadDataTableBothTargets,loadDataTableBasedOnTargets} = require("../testingFunctions.js");



const testDataObj = {
  dates : ["17-18","18-19","19-20","20-21"],
  T1 : [50,50,50,50,50],
  T2 : [40,40,50,40,45],
  percentagesMetT1: [45,42,52,40,43],
  percentagesMetT2: [38,45,42,37,47],
  mostRecentT1Des:"T1:" + " Group avg > 50%",
  mostRecentT2Des:"T2:" + " Students want more juice in class",
  title: "S1M1 T1 & T2 \n Program Dev. & ETS Major Field Test"
  
}




////////////////////////////////loadDataTableBothTargets////////////////////////////////
test('loadDataTableBothTargets: Loads value from object into 2d Array Input: valid object', () => {

    expect(loadDataTableBothTargets(testDataObj)).toEqual(
      [
        ['X',
        'Percentage Met for T1',
        'Percentage Met for T2',
        'T1: Group avg > 50%',
        'T2: Students want more juice in class' ],
        [ '17-18', 45, 38, 50, 40 ],
        [ '18-19', 42, 45, 50, 40 ],
        [ '19-20', 52, 42, 50, 50 ],
        ['20-21', 40, 37, 50, 40]
      ]
    )
});



test('loadDataTableBothTargets: Loads value from object into 2d Array: Input null', () => {

  expect(loadDataTableBothTargets(null)).toEqual([]);

});


test('loadDataTableBothTargets: Loads value from object into 2d Array: Input array', () => {

  expect(loadDataTableBothTargets([])).toEqual([]);
  
});


test('loadDataTableBothTargets: Loads value from object into 2d Array: Input empty object', () => {

  expect(loadDataTableBothTargets({})).toEqual([]);
  
});


test('loadDataTableBothTargets: Loads value from object into 2d Array: Input string', () => {

  expect(loadDataTableBothTargets("")).toEqual([]);
  
});

//////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////loadDataTableBasedOnTargets////////////////////////////////
test('loadDataTableBasedOnTargets: Loads value from object into 2d Array for T1: Input obj & T1', () => {

  expect(loadDataTableBasedOnTargets(testDataObj, "T1")).toEqual(
    [
      ['X', 'Percentage Met for T1', 'T1: Group avg > 50%'],
      [ '17-18', 45, 50 ],
      [ '18-19', 42, 50 ],
      [ '19-20', 52, 50 ],
      ['20-21', 40, 50]
    ]);
  
});

test('loadDataTableBasedOnTargets Input: null & T1', () => {

  expect(loadDataTableBasedOnTargets(null, "T1")).toEqual([]);
  
});



test('loadDataTableBasedOnTargets Input: [] & T1', () => {

  expect(loadDataTableBasedOnTargets([], "T1")).toEqual([]);
  
});



test('loadDataTableBasedOnTargets Input: object & T1', () => {

  expect(loadDataTableBasedOnTargets({}, "T1")).toEqual([]);
  
});


test('loadDataTableBasedOnTargets Input: object & T1', () => {

  expect(loadDataTableBasedOnTargets("", "T1")).toEqual([]);
  
});




test('loadDataTableBasedOnTargets: Loads value from object into 2d Array for T1: Input obj & T2', () => {

  expect(loadDataTableBasedOnTargets(testDataObj, "T2")).toEqual(
    [
      ['X','Percentage Met for T2','T2: Students want more juice in class' ],
      [ '17-18', 38, 40 ],
      [ '18-19', 45, 40 ],
      [ '19-20', 42, 50 ],
      ['20-21', 37, 40]
    ]
  );
  
});


test('loadDataTableBasedOnTargets Input: null & T2', () => {

  expect(loadDataTableBasedOnTargets(null, "T2")).toEqual([]);
  
});



test('loadDataTableBasedOnTargets Input: [] & T2', () => {

  expect(loadDataTableBasedOnTargets([], "T2")).toEqual([]);
  
});



test('loadDataTableBasedOnTargets Input: object & T2', () => {

  expect(loadDataTableBasedOnTargets({}, "T2")).toEqual([]);
  
});


test('loadDataTableBasedOnTargets Input: object & T1', () => {

  expect(loadDataTableBasedOnTargets("", "T2")).toEqual([]);
  
});

//////////////////////////////////////////////////////////////////////////////////////




  