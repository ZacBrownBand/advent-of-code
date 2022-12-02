const rock = 'r';
const paper = 'p';
const scissors = 's';

const win = 'w';
const loss = 'l';
const tie = 't';

const outcomes = {
  X: loss,
  Y: tie,
  Z: win
 };

 const options = {
  A: rock,
  X: rock,
  B: paper,
  Y: paper,
  C: scissors,
  Z: scissors,
 };

const scores = {
  [rock]: 1,
  [paper]: 2,
  [scissors]: 3,
};

const beats = {
  [rock]: scissors,
  [scissors]: paper,
  [paper]: rock
};

const loses = {
  [rock]: paper,
  [scissors]: rock,
  [paper]: scissors
};

const getScore = (o, m) => {
  const baseScore = scores[m];
  if (loses[o] === m) {
    return baseScore + 6;
  }
  if (o === m) {
    return baseScore + 3;
  }
  return baseScore;
}

const getOptionFromOutcome = (outcome, opponent) => {
  const outcomeName = outcomes[outcome];
  if (outcomeName === loss) {
    return beats[opponent];
  }
  if (outcomeName === win) {
    return loses[opponent];
  }
  return opponent;
};

const partOne = (rounds) => {
  const points = rounds.map((value) => {
    const parts = value.split(' ');
    const opponent = options[parts[0]];
    const me = options[parts[1]];

    return getScore(opponent, me);
  });


  return points._sum();
};

const partTwo = (rounds) => {
  const points = rounds.map((value) => {
    const parts = value.split(' ');
    const opponent = options[parts[0]];
    const me = getOptionFromOutcome(parts[1], opponent);

    return getScore(opponent, me);
  });

  return points._sum();
};

module.exports = {
  partOne,
  partTwo,
  testing: false,
  runPartOne: true,
  runPartTwo: true,
};
