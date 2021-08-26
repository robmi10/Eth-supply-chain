const Supply = artifacts.require("./Supply.sol");

contract("Supply", accounts => {
  it("Supply = get..", async () => {
    const SupplyInstance = await Supply.deployed();
    const result = await SupplyInstance.get.call();
    
    assert.equal(result, "Hello World")
  });



});