const { ethers } = require("hardhat");


async function main() {
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with the actual deployed address
    const MyToken = await ethers.getContractFactory("CropToken");
    const myToken = await MyToken.attach(contractAddress);
    const [deployer, acc1, acc2] = await ethers.getSigners();

    var deployerBalance = await myToken.balanceOf(deployer.address);
    console.log("Deployer's initial balance:", ethers.formatUnits(deployerBalance, "wei"), "tokens");
    
    console.log("\nApproving acc1 for 100 tokens to be transferred out of deployer");
    const a = await myToken.approve(acc1, 100);
    await a.wait();
    deployerBalance = await myToken.balanceOf(deployer.address);
    var acc1Balance = await myToken.balanceOf(acc1.address);
    var acc2Balance = await myToken.balanceOf(acc2.address);
    var acc1Approved = await myToken.approvedAmount(acc1.address);
    console.log("Deployer's balance: ", ethers.formatUnits(deployerBalance, "wei"), "tokens");
    console.log("Acc1's balance: ", ethers.formatUnits(acc1Balance, "wei"), "tokens");
    console.log("Acc2's balance: ", ethers.formatUnits(acc2Balance, "wei"), "tokens");
    console.log("Approved amount: ", ethers.formatUnits(acc1Approved, "wei"), "tokens");

    console.log("\nUsing acc1 to transfer 60 tokens to acc2 from deployer")
    const b = await myToken.connect(acc1).approvalTransfer(deployer, acc2, 60);
    await b.wait();
    deployerBalance = await myToken.balanceOf(deployer.address);
    acc1Balance = await myToken.balanceOf(acc1.address);
    acc2Balance = await myToken.balanceOf(acc2.address);
    acc1Approved = await myToken.approvedAmount(acc1.address);
    console.log("Deployer's balance: ", ethers.formatUnits(deployerBalance, "wei"), "tokens");
    console.log("Acc1's balance: ", ethers.formatUnits(acc1Balance, "wei"), "tokens");
    console.log("Acc2's balance: ", ethers.formatUnits(acc2Balance, "wei"), "tokens");
    console.log("Approved amount: ", ethers.formatUnits(acc1Approved, "wei"), "tokens");

    console.log("\nSetting acc1's fertilizer, fungicide, insecticide, and herbicide limits to 150");
    const c = await myToken.setFertilizerLimit(acc1, 150);
    await c.wait();
    console.log("Acc1's fertilizer limit: ", await myToken.fertilizerLimit(acc1.address));
    const d = await myToken.setFungicideLimit(acc1, 150);
    await d.wait();
    console.log("Acc1's fungicide limit: ", await myToken.fungicideLimit(acc1.address));
    const e = await myToken.setInsecticideLimit(acc1, 150);
    await e.wait();
    console.log("Acc1's insecticide limit: ", await myToken.insecticideLimit(acc1.address));
    const f = await myToken.setHerbicideLimit(acc1, 150);
    await f.wait();
    console.log("Acc1's herbicide limit: ", await myToken.herbicideLimit(acc1.address));

    console.log("\nUsing 100 of acc1's fertilizer, fungicide, insecticide, and herbicide");
    const g = await myToken.connect(acc1).useFertilizer("a", "b" , 100, 10, "tomato");
    await g.wait();
    console.log("Acc1's fertilizer limit: ", await myToken.fertilizerLimit(acc1.address));
    const h = await myToken.connect(acc1).usePesticide("a", "b" , 100, 10, "tomato", "Fungicide");
    await h.wait();
    console.log("Acc1's fungicide limit: ", await myToken.fungicideLimit(acc1.address));
    const i = await myToken.connect(acc1).usePesticide("a", "b" , 100, 10, "tomato", "Insecticide");
    await i.wait();
    console.log("Acc1's insecticide limit: ", await myToken.insecticideLimit(acc1.address));
    const j = await myToken.connect(acc1).usePesticide("a", "b" , 100, 10, "tomato", "Herbicide");
    await j.wait();
    console.log("Acc1's herbicide limit: ", await myToken.herbicideLimit(acc1.address));
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

