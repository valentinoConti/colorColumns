import { render, fireEvent, act, screen } from "@testing-library/react";
import { getRandomMap } from '../src/utils';

it("should test the random map generator", async () => {
  // Test 4 times everything so we make sure the randomness works fine.

  for (let i = 0; i < 4; i++) {
    const randomMap = getRandomMap();
    // last two columns should always be blanks with greyed squares
    expect(randomMap[5]).toStrictEqual(['white', 'white', 'white', 'white', 'gray']);
    expect(randomMap[6]).toStrictEqual(['white', 'white', 'white', 'white', 'gray']);
  
    // last square of every column should be different than the others
    let foundRed = false;
    let foundBlue = false;
    let foundGreen = false;
    let foundYellow = false;
    let foundPurple = false;
    const check = (square) => {
      switch (square) {
        case 'red':
          foundRed = true
          break;
        case 'blue':
          foundBlue = true
          break;
        case 'green':
          foundGreen = true
          break;
        case 'yellow':
          foundYellow = true
          break;
        case 'purple':
          foundPurple = true
          break;
        default:
          break;
      }
    }
    check(randomMap[4][4]);
    check(randomMap[3][4]);
    check(randomMap[2][4]);
    check(randomMap[1][4]);
    check(randomMap[0][4]);
  
    expect(foundRed).toBe(true);
    expect(foundBlue).toBe(true);
    expect(foundGreen).toBe(true);
    expect(foundYellow).toBe(true);
    expect(foundPurple).toBe(true);
  }
});
