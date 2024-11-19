// Used ChatGPT to translate these from Python

import {IoTSimulator} from "./iotSimulator"
import {herbicideFilter, insecticideFilter, fungicideFilter, fertilizerFilter, chemicalSum} from "./iotFilter"
import {fertilizerBulk, fungicideBulk, insecticideBulk, herbicideBulk} from "../web3Handler"

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
    let log = [];

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
            const cs = chemicalSum(currHerb);
            herbicideBulk(cs["location"], cs["total amount"], cs["crop count"], cs["crop type"], "", cs["times run"], formatDate(new Date(cs["start time"])), formatDate(new Date(cs["end time"])));
            currHerb = [];
            log.push(cs)
        }
        if (herbSpray && x === ct - 1) {
            herbSpray = false;
            const cs = chemicalSum(currHerb);
            herbicideBulk(cs["location"], cs["total amount"], cs["crop count"], cs["crop type"], "", cs["times run"], formatDate(new Date(cs["start time"])), formatDate(new Date(cs["end time"])));
            currHerb = [];
            log.push(cs)
        }

        // Insecticide processing
        out.push(dg.timer({ insecticide: true }));
        curr = insecticideFilter(out[1]);
        if (curr !== null) {
            currInsect.push(curr);
            insectSpray = true;
        } else if (insectSpray) {
            insectSpray = false;
            const cs = chemicalSum(currInsect);
            insecticideBulk(cs["location"], cs["total amount"], cs["crop count"], cs["crop type"], "", cs["times run"], formatDate(new Date(cs["start time"])), formatDate(new Date(cs["end time"])));
            currInsect = [];
            log.push(cs)
        }
        if (insectSpray && x === ct - 1) {
            insectSpray = false;
            const cs = chemicalSum(currInsect);
            insecticideBulk(cs["location"], cs["total amount"], cs["crop count"], cs["crop type"], "", cs["times run"], formatDate(new Date(cs["start time"])), formatDate(new Date(cs["end time"])));
            currInsect = [];
            log.push(cs)
        }

        // Fungicide processing
        out.push(dg.timer({ fungicide: true }));
        curr = fungicideFilter(out[2]);
        if (curr !== null) {
            currFungi.push(curr);
            fungiSpray = true;
        } else if (fungiSpray) {
            fungiSpray = false;
            const cs = chemicalSum(currFungi);
            fungicideBulk(cs["location"], cs["total amount"], cs["crop count"], cs["crop type"], "", cs["times run"], formatDate(new Date(cs["start time"])), formatDate(new Date(cs["end time"])));
            currFungi = [];
            log.push(cs)
        }
        if (fungiSpray && x === ct - 1) {
            fungiSpray = false;
            const cs = chemicalSum(currFungi);
            fungicideBulk(cs["location"], cs["total amount"], cs["crop count"], cs["crop type"], "", cs["times run"], formatDate(new Date(cs["start time"])), formatDate(new Date(cs["end time"])));
            currFungi = [];
            log.push(cs)
        }

        // Fertilizer processing
        out.push(dg.timer({ fertilizer: true }));
        curr = fertilizerFilter(out[3]);
        if (curr !== null) {
            currFert.push(curr);
            useFert = true;
        } else if (useFert) {
            useFert = false;
            const cs = chemicalSum(currFert);
            fertilizerBulk(cs["location"], cs["total amount"], cs["crop count"], cs["crop type"], "", cs["times run"], formatDate(new Date(cs["start time"])), formatDate(new Date(cs["end time"])));
            currFert = [];
            log.push(cs)
        }
        if (useFert && x === ct - 1) {
            useFert = false;
            const cs = chemicalSum(currFert);
            fertilizerBulk(cs["location"], cs["total amount"], cs["crop count"], cs["crop type"], "", cs["times run"], formatDate(new Date(cs["start time"])), formatDate(new Date(cs["end time"])));
            currFert = [];
            log.push(cs)
        }
    }
    return log
}

function formatDate(date){
    var d = date.getDate();
    var M = date.getMonth() + 1;
    var y = date.getFullYear();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var ms = date.getMilliseconds();

    return "" + M + "/" + d + "/" + y + " " + h + ":" + m + ":" + s + "." + ms + "CST"
}

export{
    gen
}