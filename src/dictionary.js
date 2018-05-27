//Note parser argument is not require it just depend
// on the action you want to do
//for example content depend on message so message needs _parser
//args is also optional it represent the value of the input

// This is the basic structure
//always return a string
const dictionary = {
  string(value) {
    return `"${value}"`;
  },
  number(value) {
    return value ? +value : "";
  },
  equalOperator(_parser) {
    const a = _parser[0] && _parser[0].join(" ").trim();
    const b = _parser[1] && _parser[1].join(" ").trim();

    return `${a} === ${b}`;
  },
  ifStatement(_parser) {
    //first container is for the condition
    const condition = _parser[0] && _parser[0].join(" ").trim();
    //second container is for the "then" (action)
    const action = _parser[1] && _parser[1].join(" ").trim();

    return `if(${condition}){${action}}`;
  },
  onMsg(_parser) {
    return `client.on("message", message => {${_parser[0]}})`;
  },
  sendMsg(value) {
    return `message.channel.send(${value});`;
  },
  msgChildren(value) {
    return `message.${value}`;
  },
  consoleStatement(_meth, _val) {
    return `console.${_meth}(${_val})`;
  },
};

export default dictionary;
