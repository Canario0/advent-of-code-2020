from itertools import combinations
import sys

if __name__ == '__main__':
    data = sys.stdin.read().split('\n')[0:-1]
    data = list(map(int, data))
    data = list(combinations(data, 3))
    result = next(filter(lambda x : x[0] + x[1] + x[2] == 2020, data ))
    print(result[0] * result[1] * result[2])
