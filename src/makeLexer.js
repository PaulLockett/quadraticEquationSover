export default function makeLexer(start, end, step, str) {
  let nextIndex = start;
  //console.log(`start:${start}, nextIndex:${nextIndex},str:${str} `);

  const lexer = {
    next() {
      //console.log(`nextIndex:${nextIndex},str:${str}, in next`);
      let result;
      while (str[nextIndex] === " " && nextIndex < end) {
        nextIndex += step;
      }
      if (nextIndex < end) {
        // console.log(
        //   `nextIndex:${nextIndex},str:${str},str[nextIndex]:${str[nextIndex]} nextIndex < end`
        // );
        if (
          ["-", "x", "+", "^"].includes(str[nextIndex]) ||
          !isNaN(str[nextIndex])
        ) {
          // console.log(
          //   `nextIndex:${nextIndex},str:${str},str[nextIndex]:${str[nextIndex]} returning`
          // );
          result = { value: str[nextIndex], done: false };
        } else {
          result = { value: "*", done: false };
        }
        nextIndex += step;
        return result;
      }
      return { value: "*", done: true };
    }
  };
  return lexer;
}
