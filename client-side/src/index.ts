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

const merge1 = <T, U>(arg1: T, arg2: U): T & U => {
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

interface FoodInterface {
  type: string;
}
// tslint:disable-next-line: max-classes-per-file
class CreateByClass1 {
  public age = 18;
  constructor() { }
}

// tslint:disable-next-line: max-classes-per-file
class CreateByClass2 {
  public name = "lison";
  constructor() { }
}

function getRandomItem() {
  return Math.random() < 0.5 ? new CreateByClass1() : new CreateByClass2();
}

const item = getRandomItem();

type Direction = "north" | "east" | "south" | "west";
function getDirectionFirstLetter(direction: Direction) {
  return direction.substr(0, 1);
}

function assertNever(value: never): never {
  throw new Error("Unexpected object：" + value);
}

interface Square {
  kind: "square"; // 具有辨识性
  size: number;
}

interface Rectangle {
  kind: "rectangle"; // 具有辨识性
  height: number;
  width: number;
}

interface Circle {
  kind: "circle"; // 具有辨识性
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function getArea(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
    default:
      return assertNever(s);
  }
}

// tslint:disable-next-line: max-classes-per-file
class Counter {
  constructor(public count: number = 0) { }
  public add(value1: number) {
    this.count += value1;
    return this;
  }
  public subtract(value2: number) {
    this.count -= value2;
    return this;
  }
}

let counter = new Counter(10);

// let info = {
//   name: "Lison",
//   getName(this: { age: number }) {
//     this;
//   }
// }

type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>;
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  const data: object = desc.data || {};
  const methods: object = desc.methods || {};

  return { ...data, ...methods } as D & M;
}

let obj1 = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx;
      this.y += dy;
    },
  },
});

interface Go {
  name: string;
  age: number;
  address: string;
}

const go: Go = {
  address: "foshan",
  age: 18,
  name: "laibh",
}