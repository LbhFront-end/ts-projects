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

const consoleText = (): void => {
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

function handleData(x: string): string[];
function handleData(x: number): string;
function handleData(x: any): any {
  if (typeof x === "string") {
    return x.split("");
  }
  return x.toString().split("").join("_");
}
handleData("abc").join("_");
handleData(123);

type GetArray = <T>(value: T, times: number) => T[];

const getArray: GetArray = <T>(value: T, times: number = 5): T[] => {
  return new Array(times).fill(value);
};

interface ValueWithLength {
  length: number;
}

const getLength = <T extends ValueWithLength>(param: T): number => {
  return param.length;
};

class Point {
  private x: number;
  private y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public getPosition = () => `(${this.x},${this.y})`;
}

const point = new Point(1, 2);

// tslint:disable-next-line: max-classes-per-file
class Info {
  private name: string;
  private age?: number;
  constructor(name: string, age?: number, public sex?: string) {
    this.name = name;
    this.age = age;
  }
}
const info1 = new Info("lison");
const info2 = new Info("lison", 18);
const info3 = new Info("lison", 18, "man");
