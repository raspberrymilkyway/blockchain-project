// Used ChatGPT to translate these from Python

class IoTSimulator {
    constructor() {
        this.usedIds = [];
        this.timerIds = [];
        this.fertilizerIds = [];
        this.fungicideIds = [];
        this.herbicideIds = [];
        this.insecticideIds = [];

        this.fungicideTimer = 0;
        this.fungicideFlag = false;
        this.fungicideIndex = -1;
        this.insecticideTimer = 0;
        this.insecticideFlag = false;
        this.insecticideIndex = -1;
        this.herbicideTimer = 0;
        this.herbicideFlag = false;
        this.herbicideIndex = -1;
        this.fertilizerTimer = 0;
        this.fertilizerFlag = false;
        this.fertilizerIndex = -1;
    }

    timer({ id = "", irrigation = false, herbicide = false, insecticide = false, fungicide = false, fertilizer = false }) {
        if (id === "") {
            id = this.__genId();
            this.timerIds.push(id);
        }

        const ret = { id };
        ret["time"] = new Date().toISOString().slice(0, 23); // Format similar to %m/%d/%y %H:%M:%S.%f

        if (irrigation) {
            ret["watered?"] = Math.floor(Math.random() * 100) === 42;
        }

        // Herbicide logic
        if (herbicide) {
            if (this.herbicideTimer === 0) {
                ret["herbicide?"] = Math.floor(Math.random() * 10) === 4;
                if (ret["herbicide?"]) {
                    this.herbicideTimer = 9;
                    this.herbicideFlag = true;
                    ret["spray herbicide"] = this.__sprayPesticide("herbicide");
                } else {
                    this.herbicideFlag = false;
                    this.herbicideIndex = -1;
                }
            } else {
                this.herbicideTimer -= 1;
                ret["herbicide?"] = true;
                ret["spray herbicide"] = this.__sprayPesticide("herbicide", this.herbicideIds[this.herbicideIndex]);
            }
        }

        // Insecticide logic
        if (insecticide) {
            if (this.insecticideTimer === 0) {
                ret["insecticide?"] = Math.floor(Math.random() * 10) === 4;
                if (ret["insecticide?"]) {
                    this.insecticideTimer = 9;
                    this.insecticideFlag = true;
                    ret["spray insecticide"] = this.__sprayPesticide("insecticide");
                } else {
                    this.insecticideFlag = false;
                    this.insecticideIndex = -1;
                }
            } else {
                this.insecticideTimer -= 1;
                ret["insecticide?"] = true;
                ret["spray insecticide"] = this.__sprayPesticide("insecticide", this.insecticideIds[this.insecticideIndex]);
            }
        }

        // Fungicide logic
        if (fungicide) {
            if (this.fungicideTimer === 0) {
                ret["fungicide?"] = Math.floor(Math.random() * 10) === 4;
                if (ret["fungicide?"]) {
                    this.fungicideTimer = 9;
                    this.fungicideFlag = true;
                    ret["spray fungicide"] = this.__sprayPesticide("fungicide");
                } else {
                    this.fungicideFlag = false;
                    this.fungicideIndex = -1;
                }
            } else {
                this.fungicideTimer -= 1;
                ret["fungicide?"] = true;
                ret["spray fungicide"] = this.__sprayPesticide("fungicide", this.fungicideIds[this.fungicideIndex]);
            }
        }

        // Fertilizer logic
        if (fertilizer) {
            if (this.fertilizerTimer === 0) {
                ret["fertilizer?"] = Math.floor(Math.random() * 10) === 4;
                if (ret["fertilizer?"]) {
                    this.fertilizerTimer = 9;
                    this.fertilizerFlag = true;
                    ret["use fertilizer"] = this.__useFertilizer();
                } else {
                    this.fertilizerFlag = false;
                    this.fertilizerIndex = -1;
                }
            } else {
                this.fertilizerTimer -= 1;
                ret["fertilizer?"] = true;
                ret["use fertilizer"] = this.__useFertilizer(this.fertilizerIds[this.fertilizerIndex]);
            }
        }

        return ret;
    }

    // Helper function for pesticide distribution
    __sprayPesticide(pesticideType, id = "") {
        if (id === "") {
            id = this.__genId();
            if (pesticideType === "herbicide") {
                this.herbicideIds.push(id);
                this.herbicideIndex = this.herbicideIds.length - 1;
            } else if (pesticideType === "insecticide") {
                this.insecticideIds.push(id);
                this.insecticideIndex = this.insecticideIds.length - 1;
            } else {
                this.fungicideIds.push(id);
                this.fungicideIndex = this.fungicideIds.length - 1;
            }
        }
        const locations = ["Loc A", "Plot B", "Field C", "Loc D", "Plot E", "Field F"];
        const loc = locations[Math.floor(Math.random() * locations.length)];

        const cropTypes = ["Tomato", "Potato", "Corn"];
        const crop = cropTypes[Math.floor(Math.random() * cropTypes.length)];

        const count = Math.ceil(Math.random() * 50);

        const ret = {
            id,
            time: new Date().toISOString().slice(0, 23),
            chemical: pesticideType,
            amount: 1, // 1 unit
            location: loc,
            cropCount: count,
            cropType: crop,
        };

        return ret;
    }

    // Helper function for fertilizer distribution
    __useFertilizer(id = "") {
        if (id === "") {
            id = this.__genId();
            this.fertilizerIds.push(id);
            this.fertilizerIndex = this.fertilizerIds.length - 1;
        }
        const locations = ["Loc A", "Plot B", "Field C", "Loc D", "Plot E", "Field F"];
        const loc = locations[Math.floor(Math.random() * locations.length)];

        const cropTypes = ["Tomato", "Potato", "Corn"];
        const crop = cropTypes[Math.floor(Math.random() * cropTypes.length)];

        const count = Math.ceil(Math.random() * 50);

        const ret = {
            id,
            time: new Date().toISOString().slice(0, 23),
            chemical: "fertilizer",
            amount: 1, // 1 unit
            location: loc,
            cropCount: count,
            cropType: crop,
        };

        return ret;
    }

    // Generate random ID
    __genId(length = 10) {
        let id = "";
        let x = true;

        while (x) {
            id = "";
            for (let i = 0; i < length; i++) {
                if (i === 0) {
                    id += this.__randomChoice("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
                }
                id += this.__randomChoice("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
            }

            if (!this.usedIds.includes(id)) {
                this.usedIds.push(id);
                x = false;
            }
        }

        return id;
    }

    // Lol, ChatGPT couldn't find a JavaScript equivalent of random_choice, so it made one.
    __randomChoice(str) {
        return str.charAt(Math.floor(Math.random() * str.length));
    }
}

module.exports = {IoTSimulator}