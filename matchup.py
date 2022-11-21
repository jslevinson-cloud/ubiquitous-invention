import sys, csv

word = 1
while word != "":
    word = input("Enter Word\n")
    if word == "":
        sys.exit()
    print(word)
    with open("kjv.csv", "r") as file:
        kjv = csv.reader(file)
        for lines in kjv:
            if len(lines) > 2:
                if lines[5].find(word) != -1:
                    print(lines[5])
