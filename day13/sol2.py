# Python 3.6
# Code from rosettacode.org
from functools import reduce


def chinese_remainder(n, a):
    sum = 0
    prod = reduce(lambda a, b: a*b, n)
    for n_i, a_i in zip(n, a):
        p = prod // n_i
        sum += a_i * mul_inv(p, n_i) * p
    return sum % prod


def mul_inv(a, b):
    b0 = b
    x0, x1 = 0, 1
    if b == 1:
        return 1
    while a > 1:
        q = a // b
        a, b = b, a % b
        x0, x1 = x1 - q * x0, x0
    if x1 < 0:
        x1 += b0
    return x1


if __name__ == '__main__':
    with open('./in') as f:
        f.readline()
        buses = [int(bus) if bus !=
                 'x' else bus for bus in f.readline().strip().split(',')]
    a = []
    n = []
    for i, bus in enumerate(buses):
        if bus != 'x':
            a.append((bus-i) % bus)
            n.append(bus)
    print(chinese_remainder(n, a))
