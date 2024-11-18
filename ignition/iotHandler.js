// Used ChatGPT to translate these from Python

const IoTSimulator = require("./support/iotSimulator").IoTSimulator;
const Filters = require("./support/iotFilter").Filters;

const {ethers} = require("hardhat");

function gen(ct) {
    const dg = new IoTSimulator(); 
    const fil = new Filters();
    let currHerb = [];
    let herbSpray = false;
    let currInsect = [];
    let insectSpray = false;
    let currFungi = [];
    let fungiSpray = false;
    let currFert = [];
    let useFert = false;
    let log = [];

    for (let x = 0; x < ct; x++) {
        let out = [];

        // Herbicide processing
        out.push(dg.timer({ herbicide: true }));
        let curr = fil.herbicideFilter(out[0]);
        if (curr !== null) {
            currHerb.push(curr);
            herbSpray = true;
        } else if (herbSpray) {
            herbSpray = false;
            const cs = fil.chemicalSum(currHerb);
            console.log(cs);
            currHerb = [];
            log.push(cs)
        }
        if (herbSpray && x === ct - 1) {
            herbSpray = false;
            const cs = fil.chemicalSum(currHerb);
            currHerb = [];
            log.push(cs)
        }

        // Insecticide processing
        out.push(dg.timer({ insecticide: true }));
        curr = fil.insecticideFilter(out[1]);
        if (curr !== null) {
            currInsect.push(curr);
            insectSpray = true;
        } else if (insectSpray) {
            insectSpray = false;
            const cs = fil.chemicalSum(currInsect);
            currInsect = [];
            log.push(cs)
        }
        if (insectSpray && x === ct - 1) {
            insectSpray = false;
            const cs = fil.chemicalSum(currInsect);
            currInsect = [];
            log.push(cs)
        }

        // Fungicide processing
        out.push(dg.timer({ fungicide: true }));
        curr = fil.fungicideFilter(out[2]);
        if (curr !== null) {
            currFungi.push(curr);
            fungiSpray = true;
        } else if (fungiSpray) {
            fungiSpray = false;
            const cs = fil.chemicalSum(currFungi);
            currFungi = [];
            log.push(cs)
        }
        if (fungiSpray && x === ct - 1) {
            fungiSpray = false;
            const cs = fil.chemicalSum(currFungi);
            currFungi = [];
            log.push(cs)
        }

        // Fertilizer processing
        out.push(dg.timer({ fertilizer: true }));
        curr = fil.fertilizerFilter(out[3]);
        if (curr !== null) {
            currFert.push(curr);
            useFert = true;
        } else if (useFert) {
            useFert = false;
            const cs = fil.chemicalSum(currFert);
            currFert = [];
            log.push(cs)
        }
        if (useFert && x === ct - 1) {
            useFert = false;
            const cs = fil.chemicalSum(currFert);
            currFert = [];
            log.push(cs)
        }
    }
    return log
}

async function main(){
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with the actual deployed address
    const MyToken = await ethers.getContractFactory("CropToken");
    const myToken = await MyToken.attach(contractAddress);
    const [deployer, acc1, acc2] = await ethers.getSigners();
    //vvvv https://stackoverflow.com/questions/8896327/jquery-wait-delay-1-second-without-executing-code
    const delay = millis => new Promise((resolve, reject) => {
        setTimeout(_ => resolve(), millis)
      });

    console.log("Acc1's fertilizer limit: ", await myToken.fertilizerLimit(acc1.address));
    console.log("Acc1's fungicide limit: ", await myToken.fungicideLimit(acc1.address));
    console.log("Acc1's herbicide limit: ", await myToken.herbicideLimit(acc1.address));
    console.log("Acc1's insecticide limit: ", await myToken.insecticideLimit(acc1.address));

    //always true. please use ctrl+c / command+c to quit
    while (true){
        const log = gen(10);
        console.log("\n\n\n");
        console.log(log);
        
        for (var i=0; i<log.length; i++){
            chemical =log[i]["pesticide"];
            location =log[i]["location"];
            amount   =log[i]["total amount"];
            timesRun =log[i]["times run"];
            cropCount=log[i]["crop count"];
            cropType =log[i]["crop type"];
            startTime=log[i]["start time"];
            endTime  =log[i]["end time"];
            imageLink=""

            out = []
            try{
                if (chemical.localeCompare("fertilizer") == 0){
                    const a = await myToken.connect(acc1).useFertilizerBulk(location, amount, cropCount, cropType, imageLink, timesRun, startTime, endTime);
                    await a.wait();
                }
                else if (chemical.localeCompare("fungicide") == 0){
                    const a = await myToken.connect(acc1).useFungicideBulk(location, amount, cropCount, cropType, imageLink, timesRun, startTime, endTime);
                    await a.wait();
                }
                else if (chemical.localeCompare("herbicide") == 0){
                    const a = await myToken.connect(acc1).useHerbicideBulk(location, amount, cropCount, cropType, imageLink, timesRun, startTime, endTime);
                    await a.wait();
                }
                else { //insecticide
                    const a = await myToken.connect(acc1).useInsecticideBulk(location, amount, cropCount, cropType, imageLink, timesRun, startTime, endTime);
                    await a.wait();
                }
            } catch(e){
                console.error(e);
            }
        }
        console.log("Acc1's fertilizer limit: ", await myToken.fertilizerLimit(acc1.address));
        console.log("Acc1's fungicide limit: ", await myToken.fungicideLimit(acc1.address));
        console.log("Acc1's herbicide limit: ", await myToken.herbicideLimit(acc1.address));
        console.log("Acc1's insecticide limit: ", await myToken.insecticideLimit(acc1.address));

        //add 3s delay so this isn't constantly, constantly running
        await delay(4000);
    }
}

main()