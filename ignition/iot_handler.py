import iot_simulator as sim
import iot_filter as filter



def gen():
    ct = 50

    dg = sim.IoTSimulator()
    curr_herb = []
    herb_spray = False
    curr_insect = []
    insect_spray = False
    curr_fungi = []
    fungi_spray = False
    curr_fert = []
    fert_spray = False
    for x in range(ct):
        out = []
        out.append(dg.timer(herbicide=True))
        curr = filter.herbicide_filter(out[0])
        if curr != None:
            print(curr)
            curr_herb.append(curr)
            herb_spray = True
        elif herb_spray:
            herb_spray = False
            print(filter.chemical_sum(curr_herb))
            curr_herb = []
            print("\n")
        if herb_spray and x == ct-1:
            herb_spray = False
            print(filter.chemical_sum(curr_herb))
            curr_herb = []
            print("\n")

    # print(dg.used_ids)

gen()