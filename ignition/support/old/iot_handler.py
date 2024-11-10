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
    use_fert = False
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
    
        out.append(dg.timer(insecticide=True))
        curr = filter.insecticide_filter(out[1])
        if curr != None:
            print(curr)
            curr_insect.append(curr)
            insect_spray = True
        elif insect_spray:
            insect_spray = False
            print(filter.chemical_sum(curr_insect))
            curr_insect = []
            print("\n")
        if insect_spray and x == ct-1:
            insect_spray = False
            print(filter.chemical_sum(curr_insect))
            curr_insect = []
            print("\n")
        
        out.append(dg.timer(fungicide=True))
        curr = filter.fungicide_filter(out[2])
        if curr != None:
            print(curr)
            curr_fungi.append(curr)
            fungi_spray = True
        elif fungi_spray:
            fungi_spray = False
            print(filter.chemical_sum(curr_fungi))
            curr_fungi = []
            print("\n")
        if fungi_spray and x == ct-1:
            fungi_spray = False
            print(filter.chemical_sum(curr_fungi))
            curr_fungi = []
            print("\n")

        out.append(dg.timer(fertilizer=True))
        curr = filter.fertilizer_filter(out[3])
        if curr != None:
            print(curr)
            curr_fert.append(curr)
            use_fert = True
        elif use_fert:
            use_fert = False
            print(filter.chemical_sum(curr_fert))
            curr_fert = []
            print("\n")
        if use_fert and x == ct-1:
            use_fert = False
            print(filter.chemical_sum(curr_fert))
            curr_fert = []
            print("\n")

    # print(dg.used_ids)

gen()