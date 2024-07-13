import requests
import csv
import os

def download_csv(url, save_path):
    res = requests.get(url)
    if res.status_code == 200:
        # Create the directory if it doesn't exist
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        # Write the content to the file
        with open(save_path, 'wb') as file:
            file.write(res.content)
        print(f"CSV file downloaded successfully: {save_path}")
    else:
        print(f"Failed to download CSV file. Status code: {res.status_code}")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.abspath(__file__))
    urls = [
        ["https://www.userbenchmark.com/resources/download/csv/CPU_UserBenchmarks.csv", os.path.join(base_dir, "csv/cpu.csv")],
        ["https://www.userbenchmark.com/resources/download/csv/GPU_UserBenchmarks.csv", os.path.join(base_dir, "csv/gpu.csv")],
        ["https://www.userbenchmark.com/resources/download/csv/SSD_UserBenchmarks.csv", os.path.join(base_dir, "csv/ssd.csv")],
        ["https://www.userbenchmark.com/resources/download/csv/HDD_UserBenchmarks.csv", os.path.join(base_dir, "csv/hdd.csv")],
        ["https://www.userbenchmark.com/resources/download/csv/RAM_UserBenchmarks.csv", os.path.join(base_dir, "csv/ram.csv")],
    ]

    for url in urls:
        download_csv(url[0], url[1])