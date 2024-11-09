// Used ChatGPT to translate these from Python

import {IoTSimulator} from "./iot_simulator"
import {herbicideFilter, insecticideFilter, fungicideFilter, fertilizerFilter, chemicalSum} from "./iot_filter"

function gen(ct) {
    const dg = new IoTSimulator(); 
    let currHerb = [];
    let herbSpray = false;
    let currInsect = [];
    let insectSpray = false;
    let currFungi = [];
    let fungiSpray = false;
    let currFert = [];
    let useFert = false;

    for (let x = 0; x < ct; x++) {
        let out = [];

        // Herbicide processing
        out.push(dg.timer({ herbicide: true }));
        let curr = herbicideFilter(out[0]);
        if (curr !== null) {
            currHerb.push(curr);
            herbSpray = true;
        } else if (herbSpray) {
            herbSpray = false;
            console.log(chemicalSum(currHerb));
            currHerb = [];
        }
        if (herbSpray && x === ct - 1) {
            herbSpray = false;
            console.log(chemicalSum(currHerb));
            currHerb = [];
        }

        // Insecticide processing
        out.push(dg.timer({ insecticide: true }));
        curr = insecticideFilter(out[1]);
        if (curr !== null) {
            currInsect.push(curr);
            insectSpray = true;
        } else if (insectSpray) {
            insectSpray = false;
            console.log(chemicalSum(currInsect));
            currInsect = [];
        }
        if (insectSpray && x === ct - 1) {
            insectSpray = false;
            console.log(chemicalSum(currInsect));
            currInsect = [];
        }

        // Fungicide processing
        out.push(dg.timer({ fungicide: true }));
        curr = fungicideFilter(out[2]);
        if (curr !== null) {
            currFungi.push(curr);
            fungiSpray = true;
        } else if (fungiSpray) {
            fungiSpray = false;
            console.log(chemicalSum(currFungi));
            currFungi = [];
        }
        if (fungiSpray && x === ct - 1) {
            fungiSpray = false;
            console.log(chemicalSum(currFungi));
            currFungi = [];
        }

        // Fertilizer processing
        out.push(dg.timer({ fertilizer: true }));
        curr = fertilizerFilter(out[3]);
        if (curr !== null) {
            currFert.push(curr);
            useFert = true;
        } else if (useFert) {
            useFert = false;
            console.log(chemicalSum(currFert));
            currFert = [];
        }
        if (useFert && x === ct - 1) {
            useFert = false;
            console.log(chemicalSum(currFert));
            currFert = [];
        }
    }
    console.log("\n")
}

export{
    gen
}