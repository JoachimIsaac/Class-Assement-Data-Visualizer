let { getCurrentSchoolTerm} = require('../testingFunctions');



test('Get current school term: both invalid, negative values', () => {

    expect(getCurrentSchoolTerm(-1,-1)).toStrictEqual('');
    
});



test('Get current school term: both invalid, both above their valid freshold', () => {

    expect(getCurrentSchoolTerm(13,2201)).toStrictEqual('');
    
});



test('Get current school term: valid month & invalid year above year 2200.', () => {

    expect(getCurrentSchoolTerm(1, 2201)).toStrictEqual('');
    
});



test('Get current school term: negative number for month & valid year.', () => {
    
    expect(getCurrentSchoolTerm(-1, 2017)).toStrictEqual('');
    
});



test('Get current school term: invalid month (above 12) & valid year.', () => {
    
    expect(getCurrentSchoolTerm(13, 2017)).toStrictEqual('');
    
});



test('Get current school term: valid month & invalid year before founding of school.', () => {
    
    expect(getCurrentSchoolTerm(1,1991)).toStrictEqual('');
    
});



test('Get current school term: passed in valide date but strings instead of numbers. ', () => {
    
    expect(getCurrentSchoolTerm("1", "2020")).toStrictEqual('');
    
});



test('Get current school term: passed in valid date as doubles ', () => {
    
    expect(getCurrentSchoolTerm(2.2, 2020.2)).toStrictEqual('19-20');
    
});



test('Get current school term: valid date but on the month of may ', () => {
    
    expect(getCurrentSchoolTerm(5, 2020)).toStrictEqual('20-21');
    
});




test('Get current school term: valid date but passed the month of may ', () => {
    
    expect(getCurrentSchoolTerm(6, 2020)).toStrictEqual('20-21');
    
});




test('Get current school term: valid month passed the month of may & invalid year', () => {
    
    expect(getCurrentSchoolTerm(6, 2201)).toStrictEqual('');
    
});



test('Get current school term: null input for both params ', () => {
    
    expect(getCurrentSchoolTerm(null, null)).toStrictEqual('');
    
});



test('Get current school term: valid month & null input for year ', () => {
    
    expect(getCurrentSchoolTerm(2, null)).toStrictEqual('');
    
});



test('Get current school term: null input for month & valid input for year ', () => {
    
    expect(getCurrentSchoolTerm(null, 2021)).toStrictEqual('');
    
});