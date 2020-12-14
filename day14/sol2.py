import re
from functools import reduce
from itertools import product


class Program:
    def __init__(self, mask, nums, x, dirs):
        self.mask = mask
        self.num_positions = nums
        self.x_positions = x
        self.dirs = dirs


if __name__ == '__main__':
    with open('./in') as f:
        input = f.readlines()
    programs = []
    p_mask_regex = r'^mask\s?=\s?([X10]+)\n?$'
    p_mem_dir = r'^mem\[(\d+)\]\s?=\s?(\d+)\n?$'
    aux = Program('', [], [], [])
    for line in input:
        m = re.match(p_mask_regex, line)
        if m:
            p_mask = m.group(1)
            p_nums = [len(p_mask) - 1 - i for i,
                      value in enumerate(p_mask) if value != 'X' and value != '1']
            p_x = [i for i,
                   value in enumerate(p_mask) if value == 'X']
            aux = Program(p_mask[::-1], p_nums, p_x, [])
            programs.append(aux)
        else:
            m = re.match(p_mem_dir, line)
            aux.dirs.append((int(m.group(1)), int(m.group(2))))

    mem = {}
    cache = {}
    for program in programs:
        for dir in program.dirs:
            current_mask = program.mask
            for num_position in program.num_positions:
                value = dir[0] & (1 << num_position)
                if value > 0:
                    value = value >> num_position
                current_mask = current_mask[:num_position] + \
                    str(value) + current_mask[num_position + 1:]
            current_mask = current_mask[::-1]
            products = cache.get(len(program.x_positions))
            if not products:
                combinations = list(
                    product(range(2), repeat=len(program.x_positions)))
                cache[len(program.x_positions)] = products
            mem_dirs = []
            for combination in combinations:
                current_dir = current_mask
                for i, x_position in enumerate(program.x_positions):
                    current_dir = current_dir[:x_position] + \
                        str(combination[i]) + current_dir[x_position + 1:]
                mem_dirs.append(int(current_dir, 2))
            for mem_dir in mem_dirs:
                mem[mem_dir] = dir[1]
    print(reduce(lambda acc, key: acc + mem[key], mem, 0))
