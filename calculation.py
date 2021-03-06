
def compare(max_cpubench: int, max_gpubench: float,\
 cpu1: int, cpu2: int, gpu1: float, gpu2: float, ram1: float, ram2: int,\
 hdd1: int, hdd2: int, ssd1: int, ssd2: int):
 type1 = "video"
 if type1 == "video":
     return laptop_video_compare(max_cpubench, max_gpubench, cpu1, cpu2, gpu1, gpu2, ram1, ram2, hdd1, hdd2, ssd1, ssd2)
 elif type1 == "home":
     return laptop_home_compare(max_cpubench, max_gpubench, cpu1, cpu2, gpu1, gpu2, ram1, ram2, hdd1, hdd2, ssd1, ssd2)

def laptop_video_compare(max_cpubench: int, max_gpubench: float,\
 cpu1: int, cpu2: int, gpu1: float, gpu2: float, ram1: int, ram2: int,\
 hdd1: int, hdd2: int, ssd1: int, ssd2: int):

 lvc1 = laptop_video_percentage(max_cpubench, max_gpubench, cpu1, gpu1, ram1, hdd1, ssd1)
 lvc2 = laptop_video_percentage(max_cpubench, max_gpubench, cpu2, gpu2, ram2, hdd2, ssd2)

 if lvc1 == lvc2:
     return ['0', str(lvc1*100)]
 elif lvc1 > lvc2:
     return ['1', str((lvc1-lvc2)*100)]
 elif lvc1 < lvc2:
     return ['2', str((lvc2-lvc1)*100)]

 return ['3', '0']

def laptop_video_percentage(max_cpubench: int, max_gpubench: float,\
 cpu: int, gpu: float, ram: int, hdd: int, ssd: int):

 #percentages of component scores
 if ram == 4:
     ram = 25
 elif ram == 8:
     ram = 70
 elif ram == 16:
     ram = 90
 else:
     ram = 1

 if hdd == 0:
     hdd = 20
 elif hdd == 500:
     hdd = 40
 elif hdd == 1000:
     hdd = 80
 elif hdd == 2000:
     hdd = 100

 if ssd == 0:
     ssd = 0
 elif ssd == 128:
     ssd = 25
 elif ssd == 256:
     ssd = 50
 elif ssd == 512:
     ssd = 80
 elif ssd == 1000:
     ssd = 100


 #computer_percentage = (75*((cpu/max_cpubench)*0.35 + (gpu/max_gpubench)*0.65) + 0.25*(0.45*((ram)+0.35*(ssd)+0.20*(hdd))))/100
 bigscore = (cpu/max_cpubench)*0.35 + (gpu/max_gpubench)*0.65
 mscore=(75*bigscore)
 smalls =(0.45*((ram)+0.35*(ssd)+0.20*(hdd)))
 sscore = 0.25*smalls
 final = (mscore + sscore)/100

 return final

def laptop_home_compare(max_cpubench: int, max_gpubench: float,\
 cpu1: int, cpu2: int, gpu1: float, gpu2: float, ram1: int, ram2: int,\
 hdd1: int, hdd2: int, ssd1: int, ssd2: int):

 lvc1 = laptop_home_percentage(max_cpubench, max_gpubench, cpu1, gpu1, ram1, hdd1, ssd1)
 lvc2 = laptop_home_percentage(max_cpubench, max_gpubench, cpu2, gpu2, ram2, hdd2, ssd2)

 if lvc1 == lvc2:
     return [0, 1]
 elif lvc1 > lvc2:
     return [1, lvc1/lvc2]
 elif lvc1 < lvc2:
     return [2, lvc2/lvc1]

 return [3, 0]

def laptop_home_percentage(max_cpubench: int, max_gpubench: float,\
 cpu: int, gpu: float, ram: int, hdd: int, ssd: int):
 computer_percentage = 0.65*((cpu/max_cpubench)*0.75 + (gpu/max_gpubench)*0.25)

 if ram == 4:
     ram = 2.5
 elif ram == 8:
     ram = 7
 elif ram == 16:
     ram = 9
 else:
     ram = 10

 if hdd == 0:
     hdd = 1
 elif hdd == 500:
     hdd = 4
 elif hdd == 1000:
     hdd = 10
 elif hdd == 2000:
     hdd = 12.5

 if ssd == 0:
     ssd = 0
 elif ssd == 128:
     ssd = 4
 elif ssd == 256:
     ssd = 7
 elif ssd == 512:
     ssd = 10
 elif ssd == 1000:
     ssd = 12.5

 lvp = computer_percentage + ram + hdd + ssd
 return lvp
