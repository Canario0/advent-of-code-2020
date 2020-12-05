import sys

if __name__ == '__main__':
    sum = 0
    for line in sys.stdin.readlines():
        min, max = line.replace('\n', '').replace(':', '').split('-')
        max, letter, passwd = max.split(' ')
        occurences = passwd.count(letter)
        if int(min) <= occurences and occurences <= int(max):
            sum += 1
    print(sum)
