// Used ChatGPT to translate these from Python

function herbicideFilter(di) {
    if (di["herbicide?"]) {
        return di["spray herbicide"];
    }
    return null;
}

function insecticideFilter(di) {
    if (di["insecticide?"]) {
        return di["spray insecticide"];
    }
    return null;
}

function fungicideFilter(di) {
    if (di["fungicide?"]) {
        return di["spray fungicide"];
    }
    return null;
}

function fertilizerFilter(di) {
    if (di["fertilizer?"]) {
        return di["use fertilizer"];
    }
    return null;
}

function chemicalSum(arr) {
    let timeStart = new Date(arr[0]["time"]);
    let timeStop = timeStart;
    let amount = 0;
    let timesRun = arr.length;
    let cropCount = arr[0]["cropCount"];
    let cropType = arr[0]["cropType"];
    let location = arr[0]["location"];

    for (let di of arr) {
        amount += di["amount"];
        let currTime = new Date(di["time"]);
        if (currTime < timeStart) {
            timeStart = currTime;
        } else if (currTime > timeStop) {
            timeStop = currTime;
        }
    }

    return {
        "id": arr[0]["id"],
        "pesticide": arr[0]["chemical"],
        "total amount": amount,
        "times run": timesRun,
        "location": location,
        "crop count": cropCount,
        "crop type": cropType,
        "start time": timeStart, // ISO string formatted to match %m/%d/%y %H:%M:%S.%f
        "end time": timeStop
    };
}

export{
    herbicideFilter, insecticideFilter, fungicideFilter, fertilizerFilter, chemicalSum
}