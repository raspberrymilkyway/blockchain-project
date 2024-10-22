import iot_simulator

def gen(filename="generated.jsonl"):
    # get number of times to generate
    ct = input("Number of times data should be generated: ")
    while True:
        try:
            ct = int(ct)
            break
        except:
            ct = input("Number of times data should be generated: ")

    # anyway, generate and send data
    # alter this based on current needs!
    dg = iot_simulator.IoTSimulator()
    f = open(filename, "a")
    for x in range(ct):
        out = []
        out.append(dg.sensor(True, True, True))
        out.append(dg.timer(True, True))
        out.append(dg.monitor(True, True))
        f.write("{" + str(out[0]) + ", " + str(out[1]) + ", " + str(out[2]) + "}\n")
    f.close()
    print(dg.used_ids)

gen(input("File name: ")+".jsonl")