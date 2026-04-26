async function main() {
  const Bank = await ethers.getContractFactory("Bank");
  const bank = await Bank.deploy();

  await bank.waitForDeployment();

  console.log("Contract deployed at:", await bank.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});