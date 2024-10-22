import random
from string import ascii_letters, digits
from datetime import datetime

# Kylee Willis / kwcnr

# basic junk iot data simulator

class IoTSimulator:

    def __init__(self):
        self.used_ids = []
        self.sensor_ids = []
        self.timer_ids = []
        self.fertilizer_ids = []
        self.fungicide_ids = []
        self.herbicide_ids = []
        self.insecticide_ids = []
        self.monitor_ids = []
        
        self.fungicide_timer = 0
        self.fungicide_flag = False
        self.fungicide_index = -1
        self.insecticide_timer = 0
        self.insecticide_flag = False
        self.insecticide_index = -1
        self.herbicide_timer = 0
        self.herbicide_flag = False
        self.herbicide_index = -1
        self.fertilizer_timer = 0
        self.fertilizer_flag = False
        self.fertilizer_index = -1

    #generate "sensor" data -- temperature, soil readings, precipitation
    # basically returns dictionary/json-format
    def sensor(self, id="", temp=False, soil=False, precipitation=False):
        id = self.__gen_id()
        ret = {"id": id}
        self.sensor_ids.append(id)

        ret["location"] = "("+ str(random.randint(0, 25)) +", " + str(random.randint(0,25)) + ")"
        ret["time"] = datetime.now().strftime("%m/%d/%y %H:%M:%S.%f")

        if temp:
            ret["temp"] = random.randint(-20, 105)
        if soil:
            ret["acidity"] = random.randint(0,14) #should soil acidity be top/bottom of the ph scale? no. but the range technically exists
            ret["nutrients"] = [random.choice(["very low", "low", "average", "high", "very high"]) for i in range(6)] #doesn't really matter but NPKCaMgS
        if precipitation:
            ret["water-level"] = round(random.uniform(0.0, 20.0), 1)

        return ret

    #generate "timer" data -- irrigation timer, pesticide timer
    def timer(self, id="", irrigation=False, herbicide=False, insecticide=False, fungicide=False, fertilizer=False):
        if id == "":
            id = self.__gen_id()
            self.timer_ids.append(id)
        ret = {"id": id}

        ret["time"] = datetime.now().strftime("%m/%d/%y %H:%M:%S.%f")

        if irrigation:
            ret["watered?"] = random.randint(0,100) == 42

        if herbicide:
            if self.herbicide_timer == 0:
                self.herbicide_flag = False #will have unnecessary overrides but idc
                self.herbicide_index = -1
                ret["herbicide?"] = random.randint(0,10) == 4 #this would be smaller if i didn't need it to run a bunch
                if ret["herbicide?"]:
                    self.herbicide_timer = 9 #continue spraying for 10 rounds
                    self.herbicide_flag = True
                    ret["spray herbicide"] = self.__spray_pesticide("herbicide")
            else:
                self.herbicide_timer -= 1
                ret["herbicide?"] = True
                ret["spray herbicide"] = self.__spray_pesticide("herbicide", self.herbicide_ids[self.herbicide_index])

        if insecticide:
            if self.insecticide_timer == 0:
                self.herbicide_flag = False
                self.herbicide_index = -1
                ret["insecticide?"] = random.randint(0,10) == 4
                if ret["insecticide?"]:
                    self.insecticide_timer = 9
                    self.insecticide_flag = True
                    ret["spray insecticide"] = self.__spray_pesticide("insecticide")
            else:
                self.insecticide_timer -= 1
                ret["insecticide?"] = True
                ret["spray insecticide"] = self.__spray_pesticide("insecticide", self.insecticide_ids[self.insecticide_index])

        if fungicide:
            if self.fungicide_timer == 0:
                self.fungicide_flag = False
                self.fungicide_index = -1
                ret["fungicide?"] = random.randint(0,10) == 4
                if ret["fungicide?"]:
                    self.fungicide_timer = 9
                    self.fungicide_flag = True
                    ret["spray fungicide"] = self.__spray_pesticide("fungicide")
            else:
                self.fungicide_timer -= 1
                ret["fungicide?"] = True
                ret["spray fungicide"] = self.__spray_pesticide("fungicide", self.fungicide_ids[self.fungicide_index])

        if fertilizer: #lol fertilizer would likely not work like this
            if self.fertilizer_timer == 0:
                self.fertilizer_flag = False
                self.fertilizer_index = -1
                ret["fertilizer?"] = random.randint(0,10) == 4
                if ret["fertilizer?"]:
                    self.fertilizer_timer = 9
                    self.fertilizer_flag = True
                    ret["place fertilizer"] = self.__use_fertilizer()
            else:
                self.fertilizer_timer -= 1
                ret["fertilizer?"] = True
                ret["use fertilizer"] = self.__use_fertilizer(self.fertilizer_ids[self.fertilizer_index])
        
        return ret

    #automatic pesticide distribution
    def __spray_pesticide(self, pesticide_type, id=""):
        if id == "":
            id = self.__gen_id()
            if (pesticide_type == "herbicide"):
                self.herbicide_ids.append(id)
                self.herbicide_index = len(self.herbicide_ids) - 1
            elif (pesticide_type == "insecticide"):
                self.insecticide_ids.append(id)
                self.insecticide_index = len(self.insecticide_ids) - 1
            else:
                self.fungicide_ids.append(id)
                self.fungicide_index = len(self.fungicide_ids) - 1
        ret = {"id": id}

        ret["time"] = datetime.now().strftime("%m/%d/%y %H:%M:%S.%f")
        ret["pesticide"] = pesticide_type
        ret["amount"] = 1 #1 unit

        return ret
    
    #automatic fertilizer distribution
    def __use_fertilizer(self, id=""):
        if id == "":
            id = self.__gen_id()
            self.fertilizer_ids.append(id)
            self.fertilizer_index = len(self.fertilizer_ids) - 1
        ret = {"id": id}

        ret["time"] = datetime.now().strftime("%m/%d/%y %H:%M:%S.%f")
        ret["amount"] = 1 #1 unit

        return ret

    #generate "monitor" data -- bug identifier, wildlife identifier
    # i think these are mostly done with like... cameras and traps? i don't know that it's
    # super viable for a typical farmer, but i thought i'd include it anyway
    def monitor(self, id="", liquid=False, bug=False, wildlife=False):
        if id == "":
            id = self.__gen_id()
            self.monitor_ids.append(id)
        ret = {"id": id}

        ret["location"] = "("+ str(random.randint(0, 25)) +", " + str(random.randint(0,25)) + ")"
        ret["time"] = datetime.now().strftime("%m/%d/%y %H:%M:%S.%f")

        if liquid:
            ret["liquid"] = random.choice(["herbicide", "fungicide", "insecticide", "water", "unknown"])
        if bug:
            ret["type"] = random.choice(["mites", "sawfly", "borer", "weevil", "cutworm"])
        if wildlife:
            ret["species"] = random.choice(["deer", "bear", "moose", "duck", "mouse", "crow"])

        return ret
    
    # generate random id to be used as identifier. used internally.
    #  this is also possibly done at run time when the data is uploaded, but
    #      it can be filtered like this, as needed.
    def __gen_id(self, length=10):
        id = ""
        x = True

        while x:
            for i in range(length):
                # first character should be a letter, not numeric
                if (length == 0):
                    id += random.choice(ascii_letters)
                id += random.choice(ascii_letters + digits)

            if id in self.used_ids:
                id = ""
            else:
                self.used_ids.append(id)
                x = False

        return id


# basically, one dg.(function) would be used per sensor. see below for example usage

# dg = IoTSimulator()
# print(dg.sensor(True, True, True))
# for i in range(50):
#     print(dg.timer(herbicide=True))
#     print(dg.timer(insecticide=True))
#     print(dg.timer(fungicide=True))
#     print(dg.timer(fertilizer=True))
#     print("\n")
# print(dg.monitor(True, True))