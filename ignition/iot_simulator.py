import random
from string import ascii_letters, digits
from datetime import datetime

# Kylee Willis / kwcnr

# basic junk iot data simulator

class IoTSimulator:

    def __init__(self):
        self.used_ids = []

    def use_fungicide(self, amount, id=""):
        if id == "":
            id = self.__gen_id()
        ret = {"id": id}
        ret["time"] = datetime.now().strftime("%m/%d/%y %H:%M:%S")
        ret["amount"] = amount

        return ret
    
    def use_insecticide(self, amount, id=""):
        if id == "":
            id = self.__gen_id()
        ret = {"id": id}
        ret["time"] = datetime.now().strftime("%m/%d/%y %H:%M:%S")
        ret["amount"] = amount

        return ret

    def use_herbicide(self, amount, id=""):
        if id == "":
            id = self.__gen_id()
        ret = {"id": id}
        ret["time"] = datetime.now().strftime("%m/%d/%y %H:%M:%S")
        ret["amount"] = amount

        return ret

    def use_fertilizer(self, amount, id=""):
        if id == "":
            id = self.__gen_id()
        ret = {"id": id}
        ret["time"] = datetime.now().strftime("%m/%d/%y %H:%M:%S")
        ret["amount"] = amount

        return ret
    
    # generate random id to be used as identifier. used internally.
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
# print(dg.timer(True, True))
# print(dg.monitor(True, True))