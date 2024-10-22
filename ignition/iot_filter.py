from datetime import datetime

def herbicide_filter(di):
    if di["herbicide?"]:
        return di["spray herbicide"]
    return None

def insecticide_filter(di):
    if di["insecticide?"]:
        return di["spray insecticide"]
    return None

def fungicide_filter(di):
    if di["fungicide?"]:
        return di["spray fungicide"]
    return None

def fertilizer_filter(di):
    if di["fertilizer?"]:
        return di["spray fertilizer"]
    return None

def chemical_sum(arr):
    time_start = datetime.strptime(arr[0]["time"], "%m/%d/%y %H:%M:%S.%f")
    time_stop = time_start
    amount = 0
    for di in arr:
        amount += di["amount"]
        curr_time = datetime.strptime(di["time"], "%m/%d/%y %H:%M:%S.%f")
        if curr_time < time_start:
            time_start = curr_time
        elif curr_time > time_stop:
            time_stop = curr_time

    
    return {"id" : arr[0]["id"], 
            "pesticide": arr[0]["pesticide"],
            "total amount": amount,
            "start time": time_start.strftime("%m/%d/%y %H:%M:%S.%f"),
            "end time": time_stop.strftime("%m/%d/%y %H:%M:%S.%f")}