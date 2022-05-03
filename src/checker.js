export default class checker {
  constructor() {
    this._value = {};
  }

  get value() {
    let tempValue = this._value;
    let value = "";
    let done = false;
    let token = { value, done };
    let term = "";
    this._value = { term, token };
    return tempValue;
  }

  checkIn(lex, checkItem, token = this._value.token, term = this._value.term) {
    switch (checkItem) {
      case "number":
        if (!isNaN(token.value)) {
          while (!isNaN(token.value)) {
            term += token.value;
            token = lex.next();
          }
          this._value = { term, token };
          return this;
        } else {
          console.error(`token:${token.value} broke me :(`);
        }
        break;
      default:
        if (
          token.value === checkItem ||
          (Array.isArray(checkItem) && checkItem.includes(token.value))
        ) {
          term += token.value;
          token = lex.next();
          this._value = { term, token };
          return this;
        } else {
          console.error(`token:${token.value} broke me :(`);
        }
    }
  }
}
