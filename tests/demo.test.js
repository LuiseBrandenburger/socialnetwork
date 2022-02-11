const myMockFn = jest.fn((n) => n * 2);

test("test that map call our function correctly", ()=> {
    const a = [10,20,30,64];
    a.map(myMockFn);
    console.log("meta info in our mocked function", myMockFn.mock);

    
});