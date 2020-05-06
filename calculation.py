
def compare(string type, int max_cpubench, float max_gpubench,\
 int cpu1, int cpu2, float gpu1, float gpu2, int ram1, int ram2,\
 int hdd1, int hdd2, int ssd1, int ssd2, int price):
pass

def laptop_video(int max_cpubench, float max_gpubench,\
 int cpu1, int cpu2, float gpu1, float gpu2, int ram1, int ram2,\
 int hdd1, int hdd2, int ssd1, int ssd2):
 pass

def laptop_video_percentage(max_cpubench: int, max_gpubench: float,\
 cpu: int, gpu: float, ram: int, hdd: int, ssd: int):

 computer_percentage = (0.75)((cpu/max_cpubench)(0.35) + (gpu/max_gpubench)(0.65))

 if ram = 4:
     ram = 2.5
 elif ram = 8:
     ram = 7
 elif ram = 16:
     ram = 9
 else:
     ram = 10

 if hdd = 0:
     hdd = 0
 elif hdd = 500:
     hdd = 2
 elif hdd = 1000:
     hdd = 4
 elif hdd = 2000:
     hdd = 5

 if ssd = 0:
     ssd = 0
 elif ssd = 128:
     ssd = 2.5
 elif sdd = 256:
     ssd = 5
 elif ssd 512:
     ssd = 8
 elif ssd 1000:
     ssd = 10

lvp = computer_percentage + ram + hdd + ssd
return lvp

"""def laptop_home(int max_cpubench, float max_gpubench,\
 int cpu1, int cpu2, float gpu1, float gpu2, int ram1, int ram2,\
 int hdd1, int hdd2, int ssd1, int ssd2):
    pass

def laptop_home_percentage(int max_cpubench, float max_gpubench,\
 int cpu, float gpu, int ram, int hdd, int ssd): """
