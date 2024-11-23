function exampleTest(n){
    return n*3;
}

test("example test", ()=>{
    expect(exampleTest(10)).toBe(50);
})