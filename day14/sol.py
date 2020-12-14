import re
from functools import reduce


class Program:
    def __init__(self, mask, dirs):
        self.mask = mask
        self.dirs = dirs


if __name__ == '__main__':
    with open('./in') as f:
        input = f.readlines()
    programs = []
    p_mask_regex = r'^mask\s?=\s?([X10]+)\n?$'
    p_mem_dir = r'^mem\[(\d+)\]\s?=\s?(\d+)\n?$'
    aux = Program({}, [])
    for line in input:
        m = re.match(p_mask_regex, line)
        if m:
            p_mask = m.group(1)
            aux = Program(dict([(len(p_mask) - 1 - key, int(value))
                                for key, value in enumerate(p_mask) if value != 'X']), [])
            programs.append(aux)
        else:
            m = re.match(p_mem_dir, line)
            aux.dirs.append((m.group(1), int(m.group(2))))

    mem = {}
    for program in programs:
        for dir in program.dirs:
            mask = 1 << 35
            response = 0
            for i in range(35, -1, -1):
                if i in program.mask.keys():
                    if program.mask[i] == 1:
                        response = response | 1 << i
                    else:
                        response = response ^ 0 << i
                else:
                    response = response | (dir[1] & mask)
                mask = mask >> 1
            mem[dir[0]] = response
        # print(program.mask, program.dirs)

    print(reduce(lambda acc, key: acc + mem[key], mem, 0))
    # print(mem)
