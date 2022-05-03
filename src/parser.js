import * as algebra from "@nohns/algebra.js";
import makeLexer from "./makeLexer";
import checker from "./checker";

export default function Parser(eq) {
  console.log(`eq.length:${eq.length}, eq:${eq}`);
  const lex = makeLexer(0, eq.length, 1, eq);
  let check = new checker();
  let final = start(lex.next());
  if (typeof final !== "string") {
    return "check the console";
  }
  return final;

  function logger(place, token, termList) {
    console.log(
      `place:${place}\n token:${JSON.stringify(token)}\n termList:${termList}`
    );
  }

  function start(token, termList = []) {
    console.log("enter start");
    logger("start", token, termList);
    let expr = "";
    let ans = "";

    if (token.value === "-") {
      expr += "-";
      token = lex.next();
    }

    if (!isNaN(token.value)) {
      ans = check.checkIn(lex, "number", token, expr).value;
      token = ans.token;
      termList.push(ans.term);
      ans = {};
      if (["x", "+", "-"].includes(token.value)) {
        ans = CorVorE(token, termList);
      } else {
        console.log(`token:${token.value} broke me :(`);
      }
    } else {
      console.log(`token:${token.value} broke me :(`);
    }

    console.log("exit start");
    return ans;
  }

  function CorVorE(token, termList) {
    console.log("enter CorVorE");
    logger("CorVorE", token, termList);
    let ans;

    if (token.value === "x") {
      ans = check.checkIn(lex, "x", token, termList[0]).value;
      token = ans.token;
      termList[0] = ans.term;
      ans = VorE(token, termList);
    } else if (token.value in ["-", "+"]) {
      let expr;
      ans = check
        .checkIn(lex, ["-", "+"], token, expr)
        .checkIn(lex, "number")
        .checkIn(lex, "x").value;
      token = ans.token;
      termList.push(ans.term);
      ans = {};
      ans = CEorCVE(token, termList);
    } else {
      console.log(`token:${token} broke me :(`);
    }

    console.log("exit CorVorE");
    return ans;
  }

  function VorE(token, termList) {
    console.log("enter VorE");
    logger("VorE", token, termList);
    let ans;
    let check = new checker();

    if (token.value === "^") {
      ans = check.checkIn(lex, "^", token, termList[0]).checkIn(lex, "2").value;
      token = ans.token;
      termList[0] = ans.term;
      ans = {};
      if (["-", "+"].includes(token.value)) {
        let expr;
        ans = check.checkIn(lex, ["-", "+"], token, expr).checkIn(lex, "number")
          .value;
        token = ans.token;
        termList.push(ans.term);
        ans = {};
        if (["x", "*", "+", "-"].includes(token.value)) {
          ans = ECorECVorEV(token, termList);
        } else {
          console.log(`token:${token} broke me :(`);
        }
      }
    } else if (["-", "+"].includes(token.value)) {
      let expr;
      ans = check.checkIn(lex, ["-", "+"], token, expr).checkIn(lex, "number")
        .value;
      token = ans.token;
      termList.push(ans.term);
      ans = {};
      if (["+", "-", "x"].includes(token.value)) {
        ans = VCEorVE(token, termList);
      } else {
        console.log(`token:${token} broke me :(`);
      }
    } else {
      console.log(`token:${token} broke me :(`);
    }

    console.log("exit VorE");
    return ans;
  }

  function CEorCVE(token, termList) {
    console.log("enter CEorCVE");
    logger("CEorCVE", token, termList);
    let ans;
    let check = new checker();

    if (token.value === "^") {
      ans = check.checkIn(lex, "^", token, termList[1]).checkIn(lex, "2").value;
      token = ans.token;
      termList[1] = ans.term;
      ans = {};
      if (["-", "+"].includes(token.value)) {
        let expr;
        ans = check
          .checkIn(lex, ["-", "+"], token, expr)
          .checkIn(lex, "number")
          .checkIn(lex, "x").value;
        token = ans.token;
        termList.push(ans.term);
        ans = {};
      }

      if (token.value === "*") {
        ans = solve(termList);
      } else {
        console.log(`token:${token.value} broke me :(`);
      }
    } else if (["-", "+"].includes(token.value)) {
      let expr;
      ans = check
        .checkIn(lex, ["-", "+"], token, expr)
        .checkIn(lex, "number")
        .checkIn(lex, "x")
        .checkIn(lex, "^")
        .checkIn(lex, "2");
      expr = ans.term;
      token = ans.token;
      ans = {};
      if (token.value === "*") {
        ans = solve(termList);
      } else {
        console.log(`token:${token.value} broke me :(`);
      }
    } else {
      console.log(`token:${token.value} broke me :(`);
    }

    console.log("exit CEorCVE");
    return ans;
  }

  function ECorECVorEV(token, termList) {
    console.log("enter ECorECVorEV");
    logger("ECorECVorEV", token, termList);
    let ans;
    let check = new checker();

    if (token.value === "*") {
      ans = solve(termList);
    } else if (["-", "+"].includes(token.value)) {
      let expr;
      ans = check
        .checkIn(lex, ["-", "+"], token, expr)
        .checkIn(lex, "number")
        .checkIn(lex, "x").value;
      expr = ans.term;
      token = ans.token;
      ans = {};
      if (token.value === "*") {
        ans = solve(termList);
      } else {
        console.log(`token:${token.value} broke me :(`);
      }
    } else if (token.value === "x") {
      ans = check.checkIn(lex, "x", token, termList[1]).value;
      token = ans.token;
      termList[1] = ans.term;
      ans = {};
      if (["-", "+"].includes(token.value)) {
        let expr;
        ans = check.checkIn(lex, ["-", "+"], token, expr).checkIn(lex, "number")
          .value;
        token = ans.token;
        termList.push(ans.term);
        ans = {};
      }

      if (token.value === "*") {
        ans = solve(termList);
      } else {
        console.log(`token:${token.value} broke me :(`);
      }
    } else {
      console.log(`token:${token.value} broke me :(`);
    }

    console.log("exit ECorECVorEV");
    return ans;
  }

  function VCEorVE(token, termList) {
    console.log("enter VCEorVE");
    logger("VCEorVE", token, termList);
    let ans;
    let check = new checker();

    if (["-", "+"].includes(token.value)) {
      let expr;
      ans = check
        .checkIn(lex, ["-", "+"], token, expr)
        .checkIn(lex, "number")
        .checkIn(lex, "x")
        .checkIn(lex, "^")
        .checkIn(lex, "2").value;
      expr = ans.term;
      token = ans.token;
      ans = {};
      if (token.value === "*") {
        ans = solve(termList);
      } else {
        console.log(`token:${token.value} broke me :(`);
      }
    } else if (token.value === "x") {
      ans = check
        .checkIn(lex, "x", token, termList[1])
        .checkIn(lex, "^")
        .checkIn(lex, "2").value;
      token = ans.token;
      termList[1] = ans.term;
      ans = {};
      if (["-", "+"].includes(token.value)) {
        let expr;
        ans = check.checkIn(lex, ["-", "+"], token, expr).checkIn(lex, "number")
          .value;
        token = ans.token;
        termList.push(ans.term);
        ans = {};
      }

      if (token.value === "*") {
        ans = solve(termList);
      } else {
        console.log(`token:${token.value} broke me :(`);
      }
    } else {
    }

    console.log("exit VCEorVE");
    return ans;
  }

  function solve(termList) {
    logger("solver", {}, termList);
    let prepedStatment = "";
    let statement = termList.join("").split("");
    console.log(statement);
    statement.forEach((str) => {
      if (str === "x") {
        prepedStatment += "*";
      }
      prepedStatment += str;
    });
    console.log(prepedStatment);
    let term = algebra.parse(prepedStatment);
    console.log("this is term");
    console.log(term);
    console.log(term.toString());
    let quad = new algebra.Equation(term, 0);
    console.log("this is quad");
    console.log(quad);
    console.log(quad.toString());
    let answers = quad.solveFor("x");
    console.log("x = " + answers.toString());
    return answers.toString();
  }
}
