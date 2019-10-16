let a: number = 123;

const h1 = document.createElement("h1");
h1.innerHTML = "Hello,I am Lison";
document.body.appendChild(h1);

let tuple: [string, number, boolean];
tuple = ["a", 2, false];

interface Tuple extends Array<number | string> {
  0: string;
  1: number;
}

enum Roles {
  SUPER_ADMIN,
  ADMIN,
  USER,
}

let value: any;
value = 123;
value = "abc";
value = false;

const consoleText = (text: string): void => {
  text = "1";
};

const errorFunc = (message: string): never => {
  throw new Error(message);
};

const merge = <T, U>(arg1: T, arg2: U): T & U => {
  let res = {} as T & U;
  res = Object.assign(arg1, arg2);
  return res;
};

const key1: unique symbol = Symbol();
let key2: symbol = Symbol();
const obj = {
  [key1]: "value1",
  [key2]: "value2",
};

const getStrLength = (target: string | number): number => {
  if ((target as string).length) {
    return (target as string).length;
  }
  return target.toString().length;
};

interface Vegetables {
  type: string;
}

const getVegetable = ({ type }: Vegetables) => {
  return `A ${type}`;
};

const option = { type: "tomato", size: 12 };

getVegetable(option);

interface Counter {
  (): void;
  count: number;
}

const getCounter = (): Counter => {
  const c = () => {
    c.count += 1;
  };
  c.count = 0;
  return c;
};

