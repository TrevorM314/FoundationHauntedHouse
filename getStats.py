import pandas as pd

# Update this value to the relative path of your downloaded json
HAUNTED_HOUSE_HISTORY_FILE_PATH = "HauntedHouseHistory2023.json"

def main():
    df = pd.read_json(HAUNTED_HOUSE_HISTORY_FILE_PATH)
    df = df[df["cancelled"] != 1.0]

    totalPeople = df["size"].sum()
    numberOfGroups = df["size"].count()

    df["waitTimeSeconds"] = (df["entryTime"] - df["registrationTime"]) / 1000

    avgWaitTimeMinutes = df["waitTimeSeconds"].mean() / 60
    longestWaitTimeMinutes = df["waitTimeSeconds"].max() / 60

    print("Number of groups:       ", numberOfGroups)
    print("Total people:           ", totalPeople)
    print("Average wait time (min):", avgWaitTimeMinutes)
    print("Longest wait time (min):", longestWaitTimeMinutes)


main()