const parseInput = (input) => {
  const commands = input.split('\n');
  
  const index = [{
    type: 'dir',
    parent: null,
    children: [],
    name: '/'
  }];

  let curr;
  commands.forEach(cmd => {
    const parts = cmd.split(' ');
    if (parts[0] === '$') {
      if (parts[1]  === 'cd') {
        const dest = parts[2];
        if (dest === '/') {
          curr = index[0];
        } else if (dest === '..') {
          curr = curr.parent;
        } else {
          curr = curr.children.find(child => child.name === dest);
        }
      }
      return;
    }

    if (cmd[0] === 'd') {
      const newDir = {
        type: 'dir',
        name: parts[1],
        parent: curr,
        children: [],
      };
      curr.children.push(newDir);
      index.push(newDir)
      return;
    } 

    curr.children.push({
      type: 'file',
      size: +parts[0],
      name: parts[1],
    });
  });

  findAndAddSize = (node) => {
    if (node.type === 'file') {
      return node.size;
    }

    return node.children.map(child => {
      return findAndAddSize(child);
    })._sum();
  };

  index.forEach((folder => {
    folder.size = findAndAddSize(folder, 0);
  }));

  return index;
};

const partOne = (files) => {
  return files.filter(dir => dir.size <= 100000).map(({size}) => size)._sum();
};

const partTwo = (files) => {
  const total_disk_size = 70000000;
  const space_needed = 30000000;
  const space_free = total_disk_size - files[0].size;
  const require_space = space_needed - space_free;

  return files.map(dir => dir.size).filter(a => a >= require_space).sort((a, b) => a-b)[0];
};

module.exports = {
  parseInput,
  partOne,
  partTwo,
  testing: false,
  runPartOne: true,
  runPartTwo: true,
};