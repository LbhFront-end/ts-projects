# client side

## 目录文件说明

### tslint.json

`defaultServerity` : 提醒级别， `error` 报错， `warning` 警告， `off` 则关闭

`extends` : 可指定继承指定的预设配置规则

`jsRules` : 用来配置对 `.js` 和 `.jsx` 文件的校验规则，配置规则和下面的 `rules` 一样

`rules` : TSLint 规则

`rulesDirectory` : 指定规则配置文件，这里指定相对路径

## 八个在 JS 中见过的数据类型

布尔类型、数值类型、字符串、数组、null、undefined、object以及ES6中新增的 symbol

在 TypeScript 中它们对应的类型关键字, 对应关系为：
布尔类型: `boolean` 

数值类型: `number` 

字符串类型: `string` 

数组: `Array<type>` 或 `type[]` 

对象: `object` 

Symbol类型: `symbol` 

null和undefined: `null` 和 `undefined` , 它们本身即是类型

## TS 中补充的六个类型

元组: 表示已知元素数量和类型的数组，通过 `let tuple: [string, number, boolean]` 的方式定义，各个位置上的元素类型都要对应，元素个数也要一致

枚举: TS 在 ES 原有类型基础上面加入枚举类型，定义一组角色，每一个角色用一个数字代表，就可以使用枚举类型

Any: 当不清楚值是什么类型的时候可以用到 any, 在定义数组的时候使用 any 来指定数组中的元素类型为任意类型

void: void 和 any 相反，any 是表示任意类型，而 void 是表示没有任意类型，定义函数，函数没有返回值会用到。void类型的变量只能复制为 undefined 和 null，其他类型不能赋值给 void 类型的变量

never: never 类型指那些永不存在的值的类型。除它自身外任何类型都不能赋值给 never 类型

unknown: unknown 和 any 很像，但是 unknown 相对于 any 是安全的

扩展类型: 交叉类型，使用 `&` 符号定义，被该符号链接的多个类型构成一个交叉类型；联合类型，要求联合类型中任意一种类型即可，使用 `|` 符号

## Symbol

symbol 是 ES6新增的一种数据类型，它和 `number` , `string` , `boolean` , `undefined` , `null` 是同类型， `object` 是引用类型。它用来表示独一无二的值，通过 Symbol函数生成

### 作为属性名

在ES6中，对象的属性支持表达式，可以使用一个变量作为属性名，symbol值可以作为属性名，因为这个值是独一无二的，当它作为属性名的时候，不会跟其他任何属性重复

### 属性名的遍历

`Object.getOwnPropertySymbols` 方法获取对象的所有属性名，还可以使用ES6提供的 Reflect 对象的静态方法 Reflect.ownKeys, 他可以返回所有类型的属性名，所以 Symbol类型也会返回

### 在 TS 中使用

指定一个值的类型为 symbol 类型

``` ts
  let sym:symbol = Symbol();
```

## 枚举

### 数字枚举

数字枚举在定义值的时候，可以使用计算值和常量

### 反向映射

定义一个枚举值的时候，可以通过 `Enum[key]` 或者 `Enum.key` 的形式获取对应的值，反向映射只支持数字枚举，字符串枚举是不支持的

### 字符串枚举

字符串枚举值要求每个字段的值都必须是字符串字面量，或者是该枚举值另一个字符串枚举成员

字符串枚举不能使用场景或者计算量

### 异构枚举

异构枚举就是枚举值中类型既有数字类型又有字符串类型

### 枚举成员类型和联合类型

如果枚举值中所有成员的值都是字面量类型的值，那么这个枚举类型的每个成员和枚举值本身可以作为类型来使用，可以把符合条件的枚举值的成员作为类型来使用。当枚举值符合条件的时候，这个枚举值就可以看做是一个包含所有成员的联合类型

### 运行时的枚举

枚举在编译成 js 之后实际是一个对象

## 使用类型断言

类型断言有点像是一种类型转换，他把某个值强行指定为特定类型。tslint 推荐使用as关键字，而且在 JSX 中只能使用as这种写法

``` ts
  const getStrLength = (target: string | number): number => {
  if ((<string>target).length) { // 这种形式在JSX代码中不可以使用，而且也是TSLint不建议的写法
    return (target as string).length; // 这种形式是没有任何问题的写法，所以建议大家始终使用这种形式
  }
  return target.toString().length;
};
```

## 使用接口定义几乎任意结构

使用 `interface` 来定义接口，在定义接口时候，不要理解是在定义一个对象，而要理解为 `{}` 括号包裹的是一个代码块，里面是一条条声明语句，只不过声明的不是变量的值而是类型

### 可选属性

有时不是所有定义在 `interface` 中的属性都是必须的，可选属性可以解决这个问题

``` ts
  interface Info{
    firstName:string;
    lastName?:string;
  }
```

### 多余属性检查

定义的变量比接口少了一些或者多了一些属性是不允许的

### 绕开多余属性检查

使用类型断言

``` ts
  interface Vegetables {
    color?: string;
    type: string;
  }

  const getVegetable = ({ color, type }: Vegetables) => {
    return `A ${color ? color + " " : ""}${type}` ;
  };

  getVegetable({
    price: 1.2,
    size: 12,
    type: "tomato",
  } as Vegetables);
```

添加索引签名

``` ts
  interface Vegetables {
    color?: string;
    type: string;
    [prop: string]: any;
  }

  const getVegetable = ({ color, type }: Vegetables) => {
    return `A ${color ? color + " " : ""}${type}` ;
  };

  getVegetable({
    price: 1.2,
    size: 12,
    type: "tomato",
  });
```

利用类型兼容性

``` ts
  interface Vegetables {
    type: string;
  }

  const getVegetable = ({ type }: Vegetables) => {
    return `A ${type}` ;
  };

  const option = { type: "tomato", size: 12 };

  getVegetable(option);
```

### 只读属性

使用 `const` 定义一个对象，然后修改对象里面的属性是不会报错的，要保证对象属性值不可修改，需要使用 `readonly` 

``` ts
  interface Role {
    readonly 0: string;
    readonly 1: string;
  }
```

### 函数类型

接口可以描述普通对象，还可以描述函数类型，实际定义函数的时候，名字是无需和接口中参数一样的，只需要位置对应即可

## 接口的高阶用法

### 索引类型

使用接口描述索引的类型和通过索引得到的值的类型

``` ts
  interface RoleDic {
    [id: number]: string;
  }

  const role1: RoleDic = {
    0: "super_admin", // error 不能将类型"{ s: string; a: string; }"分配给类型"RoleDic"。
    1: "admin",
  };

  const role2: RoleDic = {
    a: "super_admin",
    b: "admin",
  };

  const role3: RoleDic = ["super_admin", "admin"];
```

也可以给索引设置 `readonly` ，从而防止索引返回值被修改

``` ts
  interface RoleDic {
    readonly [id: number]: string;
  }
  const role: RoleDic = {
    0: "super_admin"
  };
  role[0] = "admin"; // error 类型"RoleDic"中的索引签名仅允许读取
```

### 继承接口

接口可以继承，和类一样，提高了接口的可复用性。一个接口可以被多个接口继承，同样，一个接口也可以继承多个接口，多个接口用逗号隔开

``` ts

  interface Vegetables {
    color: string;
  }
  interface Tomato extends Vegetables {
    radius: number;
  }
  interface Carrot extends Vegetables {
    length: number;
  }

  // 或者
  interface Carrot extends Tomato, Vegetables {
    length: number;
  }
```

### 混合类型接口

JS的类型是灵活的，在JS中，函数是对象类型，对象可以有属性，所以有时我们一个对象即是函数，也包含一些属性

比如要实现一个计数器函数，可以使用闭包

``` ts

  const getCounter = (): Counter => {
    const c = () => {
      c.count += 1;
    };
    c.count = 0;
    return c;
  };

```

`getCounter` 函数返回类型为 `Counter` ，它是一个函数，无返回值。即返回值为 void，它还包含一个属性 `count` , 属性返回值类型是 `number` ; 

## 为函数和函数参数定义类型

### 函数 类型

我们可以给函数定义类型，这个定义包括参数和返回值的类型定义。如果省略参数类型的话，TS会默认这个参数是 `any` 类型

``` ts
  function add(arg1:number,arg2:number):number{
    return x + y
  }
```

我们需要为函数赋给的变量定义完善的函数类型，即包括参数类型和返回类型。函数如果使用了函数体之外定义的变量，这个变量的类型是不体现在函数类型定义的

使用接口可以清晰地定义函数类型

``` ts
  interface Add{
    (x:number,y:number):number
  }

  let add:Add = (arg1:number,arg2:number):number => arg1 + arg2
```

可以使用类型别名来定义函数类型，使用类型别名定义函数类型更直观易读

### 参数

可选参数: TS 会在我们编写代码的时候就检查出调用函数时参数中存在的一些错误。接口形式定义的函数类型必选参数和可选参数的位置前后是无所谓的。但是函数参数可选参数必须放在必选参数后面，这和在 JS 中定义函数是一致的

默认参数

剩余参数

### 函数重载

函数重载是指定义几个函数名相同，但参数个数或者类型不同的函数，在调用时传入不同的参数，编译器会自动调用适合的函数

JS 作为一个动态语言是没有函数重载的，只能我们自己在函数体内判断参数的个数、类型来指定不同的处理逻辑

在 TS 中有函数重载的概念，但并不是定义几个同名实体函数，然后根据不同的参数个数或者类型来自动调用相对应的函数

``` ts
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
```

TS的函数重载是在类型系统层面的，是为了更好地进行类型推断。TS的函数重载通过一个函数指定了多个函数类型定义，从而对函数调用的返回值进行检查

## 使用泛型拯救 any

泛型(Generics) 是指定义函数、接口或者类的时候，不预先指定具体的类型，而是在使用的时候再指定类型的一种特性。

`<T>` 符号定义了一个泛型变量， `T` 在这次函数定义中代表了某一种类型，它可以是基础类型，也可以是联合类型等高级类型

定义了泛型变量之后，可以在函数中任何需要指定类型的地方使用 `T` 都代表这一种类型

``` ts
  const getArray = <T>(value: T, times: number = 5): T[] => {
    return new Array(times).fill(value);
  };
```

### 泛型变量

当我们使用泛型的时候，必须在处理类型涉及到泛型的数据的时候，把这个数据当做任意类型来处理，这意味着不是所有类型都能做的操作不能做，不是所有类型都能调用方法不能调用

### 泛型函数类型

可以定义泛型函数类型，也可以使用接口的形式来定义泛型函数类型，还可以把接口中泛型变量提升到接口最外层，这样接口中所有属性和方法都能使用这个泛型变量了

``` ts
  // 使用类型别名
  type GetArray = <T>(value: T, times: number) => T[];

  const getArray: GetArray = <T>(value: T, times: number = 5): T[] => {
    return new Array(times).fill(value);
  };
  
  // 接口形式
  interface GetArray{
    <T>(arg:T,times:number):T[]
  }
  const getArray: GetArray = <T>(value: T, times: number = 5): T[] => {
    return new Array(times).fill(value);
  };  
```

### 使用泛型约束限制泛型变量

泛型约束，当我们使用泛型时，就意味着这个类型是任意类型，但是大多数情况下，我们的逻辑是对特定类型处理的

在泛型约束中使用类型参数

``` ts
  interface ValueWithLength {
    length: number;
  }

  const getLength = <T extends ValueWithLength>(param: T): number => {
    return param.length;
  };

  const getProp = <T, K extends keyof T>(object: T, propName: K) => {
    return object[propName];
  };
  const obj1 = { a: "aa", b: "bb" };
  getProp(obj1, "c"); // 类型“"c"”的参数不能赋给类型“"a" | "b"”的参数  
```

## TS中的类

TS 中的类与ES 中的类并无差异，可以参考ES标准类

``` ts

  class Point {
    private x: number;
    private y: number;
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    public getPosition = () => `(${this.x},${this.y})` ;
  }

  const point = new Point(1, 2);

  // 使用继承来复用一些特性
  class Parent {
    public name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
  class Child extends Parent {
    constructor(name: string) {
      super(name);
    }
  }
```

### 修饰符

`public` : 默认的，表示公共的，用来指定在创建实例后可以通过实例访问的，也就是类定义的外部可以访问的属性和方法

`private` : 表示私有的，它修饰的属性在类的定义外面是没法访问的

``` ts
  class Parent {
    private age: number;
    constructor(age: number) {
      this.age = age;
    }
  }

  const p = new Parent(18);
  p.age; // error 属性“age”为私有属性，只能在类“Parent”中访问
  Parent.age; // error 类型“typeof ParentA”上不存在属性“age”

  class Child extends Parent {
    constructor(age: number) {
      super(age);
      console.log(super.age); // 通过 "super" 关键字只能访问基类的公共方法和受保护方法
    }
  }
```

`protected` : 是受保护修饰符，修饰的成员在继承该类的子类中可以访问

``` ts
  class Parent {
    protected age: number;
    constructor(age: number) {
      this.age = age;
    }
    protected getAge = () => this.age;
  }

  const p = new Parent(18);
  p.age; // error 属性“age”为私有属性，只能在类“ParentA”中访问
  Parent.age; // error 类型“typeof ParentA”上不存在属性“age”

  class Child extends Parent {
    constructor(age: number) {
      super(age);
      console.log(super.age);
      console.log(super.getAge());
    }
  }

  new Child(18);
```

`protected` 还可以用来修饰 `constructor` ，修饰之后这个类就不能用来创建实例，只能被子类继承。

### readonly修饰符

在类里可以使用 `readonly` 关键字将属性设置为只读。设置为只读的属性，实例只能读取这个属性值，但不能修改

``` ts
  class UserInfo {
    readonly name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  const user = new UserInfo("Lison");
  user.name = "haha";
```

### 参数属性

参数属性简单来说就是在 `constructor` 构造函数的参数前面加上访问限定符，也就是上述 `public` 、 `private` 、 `protected` 、 `readonly` 中的任意一个

``` ts
  class A {
    constructor(name: string) { }
  }

  const aa = new A("aaa");
  aa.name; // error 类型“A”上不存在属性“name”

  class B {
    constructor(public name: string){}
  }

  const b = new B("bbb");
  b.name; // "bbb"
```

### 静态属性

和 ES6类一样，在 TS 中一样使用 `static` 关键字 来指定属性或者方法是静态的，实例将不会添加这个静态属性，也不会继承这个静态方法。可以使用修饰符和 `static` 关键字来指定一个属性或方法

``` ts
  class Parent {
    public static age: number = 18;
    public static getAge() {
      return Parent.age;
    }
    constructor() {

    }
  }

  const p = new Parent();
  p.age; // Property 'age' is a static member of type 'Parent'
  Parent.age; // 18

  // 使用了 private 修饰符和之前的道理一样
  class Parent {
    private static age: number = 18;
    public static getAge() {
      return Parent.age;
    }
    constructor() {

    }
  }

  const p = new Parent();
  p.age; // Property 'age' is a static member of type 'Parent'
  Parent.age; // 属性“age”为私有属性，只能在类“Parent”中访问。  

```

### 可选类属性

用 `?` 符号来标记

``` ts

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

```

### 存取器

在设置属性值的时候调用函数，和在访问属性值的时候调用的函数，用法和写法和 ES6 的没有区别

``` ts
  class UserInfo {
    private _fullName: string;
    constructor() { }
    get fullName() {
      return this._fullName;
    }
    set fullName(value) {
      console.log( `setter:${value}` );
      this._fullName = value;
    }
  }
  const user = new UserInfo();
  user.fullName = "Lison Li";
  user.fullName;
```

### 抽象类

抽象类一般用来被其他类继承，而不直接用它创建实例，抽象类和类内部定义抽象方法，使用 `abstract` 关键字。在抽象类里定义的抽象方法，在子类中是不会继承的，所以在子类中必须实现该方法的定义。abstract关键字不仅可以标记类和类里面的方法，还可以标记类中定义的属性和存取器

``` ts
  abstract class People {
    constructor(public name: string) { }
    abstract printName(): void;
  }

  class Man extends People {
    constructor(name: string) {
      super(name);
      this.name = name;
    }
    printName() {
      console.log(this.name);
    }
  }

  const m = new Man(); // error 应有 1 个参数，但获得 0 个
  const man = new Man("lison");
  man.printName(); // 'lison'
  const p = new People("lison"); // error 无法创建抽象类的实例
```

### 实例类型

当我们定义一个类，并创建实例后，这个实例的类型就是创建它的类

``` ts

class People {
  constructor(public name: string) {}
}
let p: People = new People("lison");

```

### 类类型接口

使用接口可以强制一个类的定义必须包含某些内容，接口检测的是使用该接口定义的类创建的实例。 `implements` 关键字来指定一个类要继承的接口，如果是接口与接口、类和类直接的继承使用 `extends` ，如果是类继承接口，则用 `implements` 

``` ts
  interface FoodInterface {
    type: string;
  }

  class FoodClass implements FoodInterface {
    public type: string;
    constructor(type: string) {
      this.type = type;
    }
  }
  // 或者
  class FoodClass implements FoodInterface {
    constructor(public type: string) {
      this.type = type;
    }
  }
```

### 接口继承类

接口可以继承一个类，当接口继承了该类之后，会继承类的成员，但是不包含其实现，也就是只继承成员以及成员类型。接口还会继承类的 `private` 和 `protected` 修饰的成员，当接口继承的这个类中包含这两个修饰符修饰的成员时，这个接口只可以被这个类其他的子类实现

``` ts
  class A {
    protected name: string;
  }
  interface I extends A {}
  class B implements I {} // error Property 'name' is missing in type 'B' but required in type 'I'
  class C implements I {
    // error 属性“name”受保护，但类型“C”并不是从“A”派生的类
    name: string;
  }
  class D extends A implements I {
    getName() {
      return this.name;
    }
  }
```

### 在泛型中使用类类型

``` ts
  const create = <T>(c: { new(): T }): T => {
    return new c();
  };

  class Info {
    public age: number;
  }

  create(Info).age;
  create(Info).name; // error 类型“Info”上不存在属性“name”
```

## 类型推断

### 多联合类型

当我们定义一个数组或者元组这种包含多个元素的值的时候，多个元素可以有不同的类型，这种 TS 会将多个类型合并起来，组成一个联合类型

### 上下文类型

根据左侧的类型推断右侧的一些类型

## 类型兼容性

TS 在实现类型强检验的同时，还要满足 JS 灵活的特点，所以就有了类型兼容性这个概念。

### 函数兼容性

#### 函数参数个数

函数参数个数如果要兼容的话，需要满足一个要求：如果对函数y进行赋值，那么要求x中的每个参数都应在y中有对应，也就是x的参数个数小于等于y的参数个数

``` ts
 let x = (a:number)=>0;
 let y = (b:number,c:string)=>0;

 y = x; // 将 x 赋值给 y 是可以的，因为如果对函数 y 进行赋值，那么要求 x 中的每个参数都应在 y 中有对应，也就是 x 的参数个数小于等于 y 的参数个数，而至于参数名是否相同是无所谓的。

 x = y; // error Type '(b: number, s: string) => number' is not assignable to type '(a: number) => number'
```

#### 函数参数类型

除了参数个数，参数类型需要对应

#### 剩余参数和可选参数

当要被赋值的函数参数中包含剩余参数时，赋值的函数可以用任意个数参数代替，但是类型需要对应

#### 函数参数双向协变

即参数类型无需绝对相同

``` ts
  let funcA = function(arg:number|string):void{}
  let funcB = function(arg:number):void{}

  funcA = funcB;
  funcB = funcA;
```

funcA 和 funcB 的参数类型并不完全一样，funcA 的参数类型为一个联合类型 number | string，而 funcB 的参数类型为 number | string 中的 number，他们两个函数也是兼容的。

#### 函数返回值类型

#### 函数重载

带有重载的函数，要求被赋值的函数每个重载都能在用来赋值的函数上找到对应的签名

``` ts
  function merge(arg1: number, arg2: number): number;
  function merge(arg1: string, arg2: string): string;
  function merge(arg1: any, arg2: any) {
    return arg1 + arg2;
  }

  function sum(arg1: number, arg2: number): number;
  function sum(arg1: any, arg2: any) {
    return arg1 + arg2;
  }
  let func = merge;
  func = sum;// error 不能将类型“(arg1: number, arg2: number) => number”分配给类型“{ (arg1: number, arg2: number): number; (arg1: string, arg2: string): string; }”
```

### 枚举

数字枚举成员类型与数字类型互相兼容。不同枚举值之间、字符串枚举成员类型和字符串类型是不兼容的

### 类

比较两个类类型的值的兼容性时，只比较实例的成员，类的静态成员和构造函数不进行比较。

类的私有成员和受保护成员会影响兼容性。当检查类的实例的兼容性的时候，如果目标类型包含一个私有成员，那么源类型必须也包含来自同一个类的这个私有成员，这就允许子类赋值给父类

### 泛型

泛型包含类型参数，这个类型参数可能是任意类型，使用时类型参数会被指定为特定的类型，而这个类型只影响了类型参数的部分

## 类型保护

类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域的类型，要定义一个类型保护，我们只需要简单定义一个函数

``` ts
  const valueList = [123, "abc"];
  const getRandomValue = () => {
    const number1: number = Math.random() * 10; // 这里取一个[0, 10)范围内的随机值
    if (number1 < 5) { return valueList[0]; } // 如果随机数小于5则返回valueList里的第一个值，也就是123
    return valueList[1]; // 否则返回"abc"
  };

  const item = getRandomValue();
  if ((item as string).length) {
    console.log((item as string).length);
  } else {
    console.log((item as number).toFixed());
  }

```

### typeof 类型保护

TS 中，如果是基本类型，而不是复杂的类型判断，可以直接使用 `typeof` 来做类型保护, `number` 、 `string` 、 `boolean` 、 `symbol` 

### instanceof 类型保护

`instanceof` 操作符是 JS 中原生的操作符，用来帕努单一个实例是否是某个构造函数创建的，或者是不是使用 ES6 语法的某个类创建的。TS 中，使用 `instanceof` 操作符统同样具有类型保护效果

``` ts
  class CreateByClass1 {
    public age = 18;
    constructor() { }
  }

  class CreateByClass2 {
    public name = "lison";
    constructor() { }
  }

  function getRandomItem() {
    return Math.random() < 0.5 ? new CreateByClass1() : new CreateByClass2();
  }

  const item = getRandomItem();
  if (item instanceof CreateByClass1) {
    console.log(item.age);
  } else {
    console.log(item.name);
  }
```

## 使用显式复制断言给TS一个一定会赋值的承诺

### null和undefined

#### 严格模式下的 null 和 undefined 赋值给其他类型值

`tsconfig.json` 将 `strictNullChecks` 设为true后，就不能再将 `undefined` 和 `null` 赋值给除他们自身和 `void` 之外的任意类型值了

有时候我们确实需要给一个其他类型的值设置初始值为空，然后再进行赋值，这时我们可以使用联合类型来实现 `null` 和 `undefined` 复制给其他类型

``` ts
  let strNull: string | null = "lison";
```

#### 可选参数和可选属性

TS 对可选属性和对可选参数的处理一样，可选属性的类型也会被自动加上 `undefined` 

``` ts
  const sum = (x: number, y?: number) => {
    return x + (y || 0);
  };
  sum(1, 2); // 3
  sum(1); // 1
  sum(1, undefined); // 1
  sum(1, null); // error Argument of type 'null' is not assignable to parameter of type 'number | undefined'
```

### 显式赋值断言

但开启 `strictNullChecks` 时，有些情况下编译器是无法在我们声明一些变量前知道一个值是否为 `null` 的，所以我们需要使用类型断言手动指明该值不为 `null` 

``` ts
  function getSplicedStr(num: number | null): string {
    function getLength(prefix: string) {
      return prefix + num!.toFixed().toString();
    }
    num = num || 0.1;
    return getLength("lison");
  }
```

上面的例子因为有嵌套函数，而编译器无法去除嵌套函数的 null（除非是立即调用的函数表达式），所以我们需要使用显式赋值断言，写法就是在不为 null 的值后面加个!

## 类型别名和字面量类型-单调的类型

### 类型别名

类型别名就是给一种类型起个别的名字。之后只要使用这个类型的地方都可以用这个名字作为类型代替。这种只是起了一个名字，并不是创建了一个新类型

使用 `type` 关键字定义类型别名

``` ts
  type TypeString = string;
  let str: TypeString;
  str = "string";
```

类型别名也可以使用泛型

``` ts
  type PositionType<T> = { x: T, y: T };
  const positional: PositionType<number> = {
    x: 1,
    y: -1,
  };
  const positional2: PositionType<string> = {
    x: "1",
    y: "-1",
  };
```

使用类型别名时可以在属性中引用自己

### 字面量类型

#### 数字字面量类型

和字符串字面量类型差不多，都是指定类型为具体的值

#### 字符串字面量类型

字符串字面量类型其实都是字符串常量，与字符串类型不同的是他是具体的值

``` ts
  type Name = "Lison";
  const name1: Name = "test"; // error 不能将类型“"test"”分配给类型“"Lison"”
  const name2: Name = "Lison";
```

可以使用联合类型来使用多个字符串

``` ts
  type Direction = "north" | "east" | "south" | "west";
  function getDirectionFirstLetter(direction: Direction) {
    return direction.substr(0, 1);
  }
```

## 使用可辨识联合保证每个 case 都被处理

### 使用 strictNullChecks

我们可以使用单例类型、联合类型、类型保护和类型别名这几种类型进行合并，来创建一个叫做可辨识联合的高级类型，也可以称为标签联合或者代数数据类型

可辨识联合有两个要素：具有普通的单例类型属性；一个类型别名，包含了那些类型的联合

### 使用 never 类型

当函数返回一个错误或者不可能有返回值的时候，返回值类型为 `never` 。所以我们可以给 switch 添加一个 default 流程，当前面的 case 不符合的时候，会执行 `default` 后的逻辑。

采用这种方式，需要定义一个额外的 `assertNever` 函数，但是这种方式不仅能够在编译阶段提示我们遗漏了判断条件，而且在运行时也会报错

``` ts
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
```
