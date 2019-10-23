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

  const user = new UserInfo("laibh");
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
  const info1 = new Info("laibh");
  const info2 = new Info("laibh", 18);
  const info3 = new Info("laibh", 18, "man");

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
  user.fullName = "laibh Li";
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
  const man = new Man("laibh");
  man.printName(); // 'laibh'
  const p = new People("laibh"); // error 无法创建抽象类的实例
```

### 实例类型

当我们定义一个类，并创建实例后，这个实例的类型就是创建它的类

``` ts

class People {
  constructor(public name: string) {}
}
let p: People = new People("laibh");

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
    public name = "laibh";
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
  let strNull: string | null = "laibh";
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
    return getLength("laibh");
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
  type Name = "laibh";
  const name1: Name = "test"; // error 不能将类型“"test"”分配给类型“"laibh"”
  const name2: Name = "laibh";
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

## this的类型

JS 中，this 可以用来获取对全局对象、类实例对象、构建函数实例等的引用，在TS 中，this 也是一种类型

计算器 Counter 的例子：

``` javascript
  class Counter {
      constructor(public count: number = 0) {}
      add(value: number) { // 定义一个相加操作的方法
          this.count += value;
          return this;
      }
      subtract(value: number) { // 定义一个相减操作的方法
          this.count -= value;
          return this;
      }
  }
  let counter = new Counter(10);
  console.log(counter.count); // 10
  counter.add(5).subtract(2);
  console.log(counter.count); // 13
```

给 Counter 类定义几个方法，每个方法都返回 this，这个 this 即指向实例，这样我们就可以通过链式调用的形式来使用这些方法。要通过类继承的形式丰富这个 Counter 类，添加一些方法，依然返回 this，然后采用链式调用的形式调用，在过去版本的 TypeScript 中是有问题的，继承的逻辑：

``` ts
  class PowCounter extends Counter {
    constructor(public count: number = 0) {
      super(count);
    }
    pow(value: number) { // 定义一个幂运算操作的方法
      this.count = this.count ** value;
      return this;
    }
  }
  let powcounter = new PowCounter(2);
  powCounter
    .pow(3)
    .subtract(3)
    .add(1);
  console.log(powCounter.count); // 6
```

我们使用 PowCounter 创建了实例 powcounter，它的类型自然是 PowCounter，在该实例上调用继承来的 subtract 和 add 方法。如果是在过去，就会报错，因为创建实例 powcounter 的类 PowCounter 没有定义这两个方法，所以会报没有这两个方法的错误。但是在 1.7 版本中增加了 this 类型，TypeScript 会对方法返回的 this 进行判断，就不会报错了。

对于对象来说。对象的属性值可以是一个函数，那么这个函数被也称为方法，在方法中访问 this ，默认情况下是对这个对象的引用，this 类型也就是这个对象的字面量类型

``` ts
  let info = {
    name: "laibh",
    getName(this: { age: number }) {
      this; // 这里的this的类型是{ age: number }
    }
  };
```

`tsconfig.json` 里将 `noImplicitThis` 设为 true，这时候有两种不同的情况

 (1) 对象字面量具有 `ThisType<T>` 指定的类型，此时 this 的类型为 T，来看例子：

``` ts
  type ObjectDescriptor<D, M> = {
    data?: D;
    // ThisType是一个内置的接口，用来在对象字面量中键入this，这里指定this的类型为D & M  
    methods?: M & ThisType<D & M>;
  };

  function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
    const data: object = desc.data || {};
    const methods: object = desc.methods || {};
    // 这里通过...操作符，将data和methods里的所有属性、方法都放到了同一个对象里返回，这个对象的类型自然就      是D & M，因为他同时包含D和M两个类型的字段  
    return { ...data, ...methods } as D & M;
  }

  let obj1 = makeObject({
    data: { x: 0, y: 0 }, // 这里data的类型就是我们上面定义ObjectDescriptor<D, M>类型中的D
    // 这里methods的类型就是我们上面定义ObjectDescriptor<D, M>类型中的M
    methods: {
      moveBy(dx: number, dy: number) {
        this.x += dx; // 所以这里的this是我们通过ThisType<D & M>指定的，this的类型就是D & M
        this.y += dy;
      },
    },
  });

  obj.x = 10;
  obj.y = 20;
  obj.moveBy(5, 5);

```

(2) 不包含 `ThisType<T>` 指定的上下文类型，那么此时 this 具有上下文类型，也就是普通的情况。

## 索引类型：获取索引类型和索引值类型

### 索引类型查询操作符

`keyof` 操作符，连接一个类型，会返回一个由这个类型的所有属性名组成的联合类型。

``` ts
  interface Info {
    name: string;
    age: number;
  }
  let infoProp: keyof Info;
  infoProp = "name";
  infoProp = "age";
  infoProp = "no"; // error 不能将类型“"no"”分配给类型“"name" | "age"”
```

通过和泛型结合使用，TS 就可以检查使用了动态属性名

``` ts
  function getValue<T, K extends keyof T>(obj: T, names: K[]): T[K][] { // 这里使用泛型，并且约束泛型变量K的类型是"keyof T"，也就是类型T的所有字段名组成的联合类型
    return names.map(n => obj[n]); // 指定getValue的返回值类型为T[K][]，即类型为T的值的属性值组成的数组
  }
  const info = {
    name: "laibh",
    age: 18
  };
  let values: string[] = getValue(info, ["name"]);
  values = getValue(info, ["age"]); // error 不能将类型“number[]”分配给类型“string[]”
```

### 索引访问操作符

索引访问操作符也就是 `[]` ，和访问对象的某个属性值是一样的语法，在 TS 中可以用来访问某个属性的类型。

``` ts
  type NameType = Info["name"];
  let name: NameType = 123; // error 不能将类型“123”分配给类型“string”

  function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
  }

  interface Obj<T> {
    [key: number]: T;
  }
  const key: keyof Obj<number>; // keys的类型为number  
```

也可以使用访问操作符，获取索引签名类型。

``` ts
  interface Obj<T> {
    [key: string]: T;
  }
  const obj: Obj<number> = {
    age: 18
  };
  let value: Obj<number>["age"]; // value的类型是number，也就是name的属性值18的类型
```

通过索引访问操作符和索引类型查询操作符可以选出类型不为 `never` & `undefined` & `null` 的类型

``` ts
  interface Type {
    a: never;
    b: never;
    c: string;
    d: number;
    e: undefined;
    f: null;
    g: object;
  }
  type test = Type[keyof Type];
  // test的类型是string | number | object
```

## 使用映射类型得到新的类型

### 映射类型

TS 提供了借助旧类型创建一个新类型的方式，也就是映射类型，可以以相同的形式去转换旧类型中的每个属性。

我们已有一个接口实现了一个有且只有一个 age 属性的对象，但是我们如果想要创建一个只读版本的同款对象，我们可能需要再重新定义一个接口，然后让 age 属性 readonly。如果接口这么简单，确实可以这么做。但是如果属性变多了，而且这个结构以后变化了，那可以用映射类型

``` ts
  interface Info {
    age: number;
  }

  type ReadonlyType<T> = { readonly [P in keyof T]: T[P] };
  type ReadonlyInfo = ReadonlyType<Info>;
  let info: ReadonlyInfo = {
    age: 18,
  };
  info.age = 28; // error Cannot assign to 'age' because it is a constant or a read-only property
```

上述的过程有点像定义了一个函数，函数会遍历传入对象的每个属性并做处理。同理也可以创建一个每个属性都是可选属性的接口

``` ts
  interface Info {
    age: number;
  }

  type ReadonlyType<T> = {
    readonly [P in keyof T]?T[P]
  };

  type ReadonlyInfo = ReadonlyType<Info>;
  let info: ReadonlyInfo = {};
```

这里用到了一个新的操作符 `in` ，TS 内部使用了 `for...in` ，定义映射类型，这里涉及到三个部分：类型变量，也就是上例的 P, 就像是 `for...in` 循环中定义的变量，用来在每次遍历中绑定当前遍历到的属性名。属性名联合，也就是 `keyof T` , 它返回对象 T 的属性名联合，属性的结果类型也就是 `T[P]` .

TS 内置了上述两种映射类型，无需定义就可以使用，它们分别是 `Readonly` 和 `Partial` , 还有两个内置类型是 `Pick` 和 `Record` 

它们的实现分别是：

``` ts
  // 用来返回一个对象中指定字段的值组成的对象
  type Pick<T, K extends keyof T> = { [P in K]: T[P] }

  // 将一个对象中的每一个属性转换为其他值
  type Record<K extends keyof any, T> = { [P in K]: T }

  // 示例
  function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const res = {} as Pick<T, K>;
    keys.forEach(key => res[key] = obj[key]);
    return res;
  }

  const nameAndAddress = pick(info,["name","address"]); // { name: 'lison', address: 'beijing' }

  function mapObject<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U> {
    let res = {} as Record<K, U>;
    for (const key in obj) {
      res[key] = f(obj[key])
    }
    return res;
  }  
  const names = { 0: "hello", 1: "world", 2: "bye" };
  const lengths = mapObject(names, s => s.length); // { 0: 5, 1: 5, 2: 3 }  

```

### 同态

两个相同类型的代数结构之间的结构保持映射。四个内置映射类型中， `Readonly` 、 `Partial` 、 `Pick` 是同态的， `Record` 不是，因为 `Record` 映射出的对象属性值是新的，和输入的值的属性值是不同的。

### 由映射类型进行推断

学习了使用映射类型包装一个类型的属性后，也可以进行逆向操作，也就是拆包，先看看包装操作

``` ts
  type Proxy<T> = { // 这里定义一个映射类型，他将一个属性拆分成get/set方法
    get(): T;
    set(value: T): void;
  };
  type Proxify<T> = { [P in keyof T]: Proxy<T[P]> }; // 这里再定义一个映射类型，将一个对象的所有属性值类型都变为Proxy<T>处理之后的类型
  function proxify<T>(obj: T): Proxify<T> { // 这里定义一个proxify函数，用来将对象中所有属性的属性值改为一个包含get和set方法的对象
    let result = {} as Proxify<T>;
    for (const key in obj) {
      result[key] = {
        get: () => obj[key],
        set: value => (obj[key] = value)
      };
    }
    return result;
  }
  let props = {
    name: "lison",
    age: 18
  };
  let proxyProps = proxify(props);
  console.log(proxyProps.name.get()); // "lison"
  proxyProps.name.set("li");
```

上面的例子定义了一个函数，这个函数可以把传入的对象的每个属性替换为一个包含 get 和 set 的两个方法对象。获取某个值的时候，比如 name，就使用 proxyProps.name.get()方法获取它的值，使用 proxyProps.name.set()方法修改 name 的值。

拆包：

``` ts
  function unproxify<T>(t: Proxify<T>): T { // 这里我们定义一个拆包函数，其实就是利用每个属性的get方法获取到当前属性值，然后将原本是包含get和set方法的对象改为这个属性值
    let result = {} as T;
    for (const k in t) {
      result[k] = t[k].get(); // 这里通过调用属性值这个对象的get方法获取到属性值，然后赋给这个属性，替换掉这个对象
    }
    return result;
  }
  let originalProps = unproxify(proxyProps);
```

### 增加或移除特定修饰符

使用 `+` 或者 `-` 符号作为前缀来指定增加还是删除修饰符。通过映射类型为一个接口的每个属性增加修饰符

增加修饰符

``` ts
  interface Info{
    name:string;
    age:number;
  }

  type ReadonlyInfo<T> = { +readonly [P in keyof T]+?:T[P] }

  let info:ReadonlyInfo<Info> = {
    name:"lison"
  }
  info.name = ""; // Cannot assign to 'name' because it is a read-only property
```

上述例子中， `ReadonlyInfo` 创建的接口类型的属性是可选的，所以我们在定义的时候没有写 age 属性也是可以的。同时每个属性是只读的，所以我们修改 name 的值的时候报错。通过 `+` 前缀增加了 `readonly` 和 `?` 修饰符。当然，增加的时候这个 `+` 前缀是可以省略的

移除修饰符

``` ts
  interface Info {
    name: string;
    age: number;
  }
  type RemoveModifier<T> = { -readonly [P in keyof T]-?: T[p] };
  type InfoType = RemoveModifier<Readonly<Partial<Info>>>;
  let info1: InfoType = {
    // error missing "age"
    name: "lison"
  };
  let info2: InfoType = {
    name: "lison",
    age: 18
  };
  info2.name = ""; // right, can edit
```

定义了去掉修饰符的映射类型 `RemoveModifier` ， `Readonly<Partial<Info>>` 则是返回一个既属性可选又只读的接口类型，所以 `InfoType` 类型则表示属性必含而且非只读

TS 内置了一个映射类型 `Required<T>` , 使用它可以去掉 T 所有属性的 `?` 修饰符

### keyof 和 映射类型的升级

`keyof` 和 映射类型支持用 `number` 或者 `symbol` 命名的属性

``` ts
  const stringIndex = "a";
  const numberIndex = 1;
  const symbolIndex = Symbol();
  type Obj = {
    [stringIndex]: string;
    [numberIndex]: number;
    [symbolIndex]: symbol;
  };
  type keys = keyof Obj;
  let key: keys = 2; // error
  let key: keys = 1; // right
  let key: keys = "b"; // error
  let key: keys = "a"; // right
  let key: keys = Symbol(); // error
  let key: keys = symbolIndex; // right

  type ReadonlyType<T> = {
    readonly [P in T] ?: T[P]
  }

  let obj: ReadonlyType<Obj> = {
    a: "aa",
    1: 11,
    [symbolIndex]: Symbol()
  }

  obj.a = "bb"; // error Cannot assign to 'a' because it is a read-only property
  obj[1] = 22; // error Cannot assign to '1' because it is a read-only property
  obj[symbolIndex] = Symbol(); // error Cannot assign to '[symbolIndex]' because it is a read-only property  
```

### 元组和数组上的映射类型

在元组和数组上的映射会生成新的元组和数组，并不会创建一个新的类型，这个类型上会具有 `push` 、 `pop` 等数组的方法和数组属性

``` ts
  type MapToPromise<T> = {
    [K in keyof T]: Promise<T[K]>
  };

  type Tuple = [number, string, boolean];
  type promiseTuple = MapToPromise<Tuple>;

  let tuple: promiseTuple = [
    new Promise((resolve, reject) => resolve(1)),
    new Promise((resolve, reject) => resolve("a")),
    new Promise((resolve, reject) => resolve(false)),
  ]

```

定义了一个MapToPromise映射类型。它返回一个将传入的类型的所有字段的值转为Promise，且Promise的resolve回调函数的参数类型为这个字段类型。我们定义了一个元组Tuple，元素类型分别为number、string和boolean，使用MapToPromise映射类型将这个元组类型传入，并且返回一个promiseTuple类型。当我们指定变量tuple的类型为promiseTuple后，它的三个元素类型都是一个Promise，且resolve的参数类型依次为number、string和boolean。

## unknown 类型

任何类型的值都可以赋值给 `unknown` 类型

``` ts
let value1: unknown;
value1 = "a";
value1 = 123;
```

如果没有类型断言或基于控制流的类型细化时 `unknown` 不可以赋值给其他类型，此时它只能赋值给 `unknown` 和 `any` 类型

``` ts
let value2: unknown;
let value3: string = value2; // 不能将类型“unknown”分配给类型“string”
value1 = value2;
```

如果没有类型断言或基于控制流的类型细化，则不能在它上面进行任何操作

``` ts
let value4: unknown;
value4 += 1; // 对象的类型为 "unknown"
```

`unknown` 与任何与其他类型组成的交叉类型，最后都等于其他类型

``` ts
type type1 = unknown & string; // type1 => string
type type2 = number & unknown; // type2 => number
type type3 = unknown & unknown; // type3 => unknown
type type4 = unknown & string[]; // type4 => string[]
```

`unknown` 与任何其他类型组成的联合类型都等于 `unknown` 类型，只有 `any` 例外， `unknown` 与 `any` 组成的联合类型等于 `any` 

``` ts
type type5 = string | unknown; // type5 => unknown
type type6 = string | any; // type6 => any
type type7 = number[] | unknown; // type7 => unknown
```

`never` 类型是 `unknown` 的子类型

``` ts
type type8 = never extends unknown ? true : false; // type8 => true
```

`keyof unknown` 等于类型 `never` 

``` ts
type type9 = keyof unknown; // type9 => nwver
```

只能对 `unknown` 进行等或不等操作，不能进行其他操作

``` ts
value1 === value2;
value1 !== value2;
value1 += value2; // error
```

`unknown` 类型的值不能访问其属性，作为函数调用和作为类创建实例

``` ts
let value5: unknown;
value5.age; // error
valu5(); // error
new value5(); // error
```

使用映射类型时如果遍历的是 `unknown` 类型，则不会映射任何属性

``` ts
type Types<T> = {
  [P in keyof T]: number
}

type type10 = Types<any>; // type10 = {[x:string]:number}
type type11 = Types<unknown>; // type10 => {}
```

## 条件类型

条件类型从语法上看像是三元操作符，他从一个条件表达式进行类型检测， 然后在后面两种类型中选择一个

``` ts
// 如果 T 可以赋值给 U 类型，则是 X 类型，否则是 Y 类型
T extends U ? X : Y

type Type<T> = T extends string | number
let index:Type<"a"> // index 类型为 string
let index:Type<false> // index 类型为 number
```

### 分布式条件类型

当待检测的类型是联合类型，则该条件类型被称为分布式条件类型，在实例化时会自动分发成联合类型

``` ts
type TypeName<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends undefined
  ? undefined
  : T extends () => void
  ? () => void
  : object;

type Type1 = TypeName<() => void>; // Type1 的类型是 Function
type Type2 = TypeName<string[]>; // Type2 的类型是 object
type Type3 = TypeName<() => void | string[]>; // Type3 的类型是 object | Function

type Diff<T,U> = T extends U ? never : T;
type Test = Diff<string|number|boolean,undefined|number>; // Test 的类型为 string | boolean
// Diff 条件类型的作用就是从 T 中找出 U 中存在的类型，得到剩下的类型，这个类型内置在 TS 中，叫做 Exclude
```

条件类型和映射类型结合的例子

``` ts
type Type<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}

type Test = Type<Part>; // Test 的类型为 "updatePart"
```

接口 `Part` 有四个字段，其中 `updatePart` 的值是函数，也就是 `Function` 类型。 `Types` 的定义中，涉及到映射类型、条件类型、索引访问类型和索引类型。首先 `[K in keyof T]` 用于遍历 T 的所有属性名，只使用了条件类型， `T[K]` 是当前属性名的属性值， `T[K] extends Funtion ? K : never` 表示如果属性值为 `Function` 类型，则值为属性名字面量类型，否则为 `never` 类型。接下来使用 `keyof T` 获取 `T` 的属性名，最后通过索引访问类型 `[keyof T]` 获取不为 `never` 的类型

### 条件类型的类型推断-infer 

条件类型提供一个 `infer` 关键字来推断类型，如果想要定义一个条件类型，传入的类型是一个数组，则返回它元素的类型，如果是一个普通类型，则直接返回这个类型

``` ts
// 不使用 infer
type Type<T> = T extends any[] ? T[number]:T;
type test = Type<string[]>; // test 的类型是 string
type test2 = Type<string>; // test2 的类型是 string

// 使用 infer
type Type<T> = T extends Array<infer U> ?U : T;
type test = Type<string[]>; // test 的类型是 string
type test2 = Type<string>; // test2 的类型是 string
// infer 可以推断出 U 的类型，并且供后面使用，可以理解为这里定义了一个变量 U 来接受数组元素的类型
```

### TS 预定义条件类型

`Exclude<T,U>` , 从 T 中去掉可以赋值给 U 的类型

``` ts
type Type = Exclude<"a"|"b"|"c","a"|"b"> // Type => "c"
type Type2 = Exclude<string|number|boolean,string | number> // Type2 => boolean
```

`Extract<T,U>` , 选取 T 中可以赋值给 U 的类型

``` ts
type Type = Extract<"a"|"b"|"c","a"|"b"|"f"> // Type => "a"|"b"
type Type2 = Extract<string|number|boolean,string | number> //Type2=>string|number
```

`NonNullable` , 从 T 中去掉 `null` 和 `undefined` 

``` ts
type Type = NonNullable<string|number|undefined|null> // Type => string|number
```

`ReturnType` , 获取函数类型返回值类型

``` ts
type Type = ReturnType<()=>string> // Type => string
type Type2 = ReturnType<(arg:number)=>void> // Type2=> void
```

`InstanceType` , 获取函数类型的实例类型

实现:

``` ts
type InstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : any
```

`InstanceType` 条件类型要求泛型变量 T 类型是创建 `any` 类型的构造函数，而它本省通过判断 `T` 是否是 构造函数类型来确定返回的类型。如果是构造函数，使用 `infer` 可以自动推断出 R 的 类型，即实例类型，否则是 `any` 类型。

使用：

``` ts
class A{
  constructor(){}
}
type T1 = InstanceType<typeof A>; // T1 的类型为 A
type T2 = InstanceType<any>; // T1 的类型为 any
type T3 = InstanceType<never>; // T1 的类型为 never
type T4 = InstanceType<string>; // T1 的类型为 error

```

上面例子中，T1 的定义中， `typeof A` 返回的的是类 A 的类型，也就是 A，这里不能使用 A 因为它是值不是类型，类型 A 是构造函数，所以 T1 是 A 构造函数的实例类型，也就是 A；T2 传入的类型为 `any` ，因为 `any` 是任何类型的子类型，所以它满足 `T extends new (…args: any[]) => infer R` ，这里 `infer` 推断的 R 为 `any` ；传入 `never` 和 `any` 同理。传入 `string` 时因为 `string` 不能不给构造函数类型，所以报错。

## 装饰器

TS 中的装饰器，是一项实验性特性，未来可能会有改变，如果要使用装饰器，需要在 `tsconfig.json` 的编译器中开启 `experimentalDecorators` ，将它设为 true

### 定义

装饰器是一种新的声明，能够用于类声明、方法、访问符、属性和参数上。使用 `@` 符合加一个名字来定义，如 `@decorat` ，这的 `decorat` 必须是一个函数或者求值后是一个函数，这个 `decorat` 不是写死的，是自己定义的，这个函数在运行的时候被调用，被装饰的声明作为参数会自动传入。要注意装饰器要紧挨要装饰的内容的前面，而且所装饰器不能用在声明文件（ `d.ts` ）中，和任何外部上下文中。比如下面的这个函数，就可以作为装饰器使用

``` ts
function setProp(target){ 
  //...
}
@setProp;

```

先定义一个函数，然后这个函数有一个参数，就是要装饰的目标，装饰的作用不同，这个 `target` 代表的东西也不同。定义了这个函数之后，它就可以作为装饰器，使用 `@` 函数名的形式，写在装饰的内容前面

### 装饰器工厂

装饰器工厂也是一个函数，它的返回值是一个函数，返回的函数作为装饰器的调用函数。如果使用装饰器工厂，那么在使用的时候就要加上函数调用。

``` ts
function setProp(){ 
  return function(target){
    // ...
  }
}
@setProp();

```

### 装饰器组合

装饰器可以组合，也就是对一个目标，引用多个装饰器

``` ts
// 可以同一行
@setName @ setAge target
// 可以换行
@setName
@setAge
target
```

装饰器的执行顺序，从上到下依次执行，但是只是返回函数但不调用函数，
装饰器函数从下到上依次执行，也就是执行工厂函数返回的函数

``` ts
function setName(){
  console.log("get setName")
  return function (target){
    console.log("setName)
  }
}

function setAge(){
  console.log("get setAge")
  return function (target){
    console.log("setAge)
  }
}

@setName()
@setAge()

class Test(){}
// 打印出来的内容有
/**
 "get setName"
 "setName"
 "get setAge"
 "setAge"
*/
```

可以看到，多个装饰器，会先执行装饰器工厂函数获取所有装饰器，然后再从后往前执行装饰器的逻辑

### 装饰器求值

类的定义中不同声明上的装饰器将按以下的规定顺序引用：

参数装饰器，方法装饰器，访问装饰器或者属性装饰器应用到每个实例成员

参数装饰器，方法装饰器，访问装饰器或者属性装饰器应用到每个静态成员

参数装饰器应用到构造函数

类装饰器应用到类

#### 类装饰器

类装饰器在类声明之前声明，要记得装饰器要紧挨着想要修改的内容，类装饰器应用于类的声明，类装饰器表达式会在运行时当做函数被调用，它由有一一个参数，也就是装饰的这个类

``` ts

let sign = null;
function setName(name: string) {
  return (target: new (...args: any[]) => any): void => {
    sign = target;
    console.log(target.name)
  };
}

@setName("laibh.top") // Info
class Info {
  constructor() { }
}

sign === Info; // true
sign === Info.prototype.constructor; // true
```

可以看到，我们在装饰器里打印出类的 name 属性值，也就是类的名字，我们没有使用 Info 创建实例，控制台也打印了"Info"，因为装饰器作用与装饰的目标声明时。而且我们将装饰器里获取的参数 target 赋值给 sign，最后判断 sign 和定义的类 Info 是不是相等，如果相等说明它们是同一个对象，结果是 true。而且类 Info 的原型对象的 constructor 属性指向的其实就是 Info 本身。

通过修饰器，可以修改类的原型对象和构造函数

``` ts
function addName(constructor: new () => any) {
  constructor.prototype.name = "laibh.top";
}
@addName
class A { }
const x = new A();
x.name; // 类型“number”上不存在属性“name”
```

通过 addName 修饰符可以在类 A 的原型对象上添加一个 name 属性，这样使用 A 创建的实例，应该可以继承这个 name 属性，访问实例对象的 name 属性应该返回"lison"，但是这里报错，是因为我们定义的类 A 并没有定义属性 name，所以我们可以定义一个同名接口，通过声明合并解决这个问题：

``` ts
@addName
class A {}
interface A {
  name: string;
}
const a = new A();
console.log(a.name); // "laibh.top"
```

如果装饰器返回一个值，那么会使用这个返回的值替换被修饰的类的声明，所以我们可以使用此特性修改来的实现。要注意的是，需要自己处理原有的原型链。可以通过装饰器，来覆盖类里的一些操作。

``` ts
function classDecorator<T extends new (...args: any[]) => {}>(target: T) {
  return class extends target {
    public newProperty = "new property";
    public hello = "override";
  };
}

@classDecorator
class Greeter {
  public property = "property";
  public hello: string;
  constructor(m: string) {
    this.hello = m;
  }
};

console.log(new Greeter("world"));
/*
{
  hello:"override"
  newProperty:"new property"
  property:"property"
}
*/
```

我们定义一个装饰器，它返回一个类，这个类继承要修饰的类，所以最后创建的实例不仅包含原 Greeter 类中定义的实例属性，还包含装饰器中定义的实例属性。我们在装饰器中给实例添加的属性，设置的属性值会覆盖被修饰的类里定义的实例属性，所以我们创建实例的时候虽然传入了字符串，但是 `hello` 还是装饰器里面设置的 `override` 。

``` ts
function classDecorator(target: any) {
  return class{
    public newProperty = "new property";
    public hello = "override";
  };
}

@classDecorator
class Greeter {
  public property = "property";
  public hello: string;
  constructor(m: string) {
    this.hello = m;
  }
};

console.log(new Greeter("world"));
/*
{
  hello:"override"
  newProperty:"new property"
}
*/
```

上面的例子中去掉了类的继承，最后打印出来实例只包含装饰器中返回的类的定义的实例属性，被装饰的类的定义被替换了。如果我们的类装饰器有返回值，但返回的不是一个构造函数（类），那就报错了

#### 方法装饰器

方法装饰器用来处理方法，它可以处理方法的属性描述符，可以处理方法定义。方法装饰器在运行时也是被当做函数调用，含有3个参数：

装饰静态成员时是类的构造函数，装饰实例成员时是类的原型对象；成员的名字；成员属性描述符。

JS 中的属性描述符。对象可以设置属性，如果属性值是函数，那么这个函数称为方法，每一个属性和方法在定义的时候，都伴随着三个属性描述符 `configurable` 、 `writable` 和 `enumerable` ，分别用来描述每个属性的可配置性、可写性、可枚举性。这三个描述符使用 `Object.defineProperty` 来设置。

``` javascript
  const obj = {};
  Object.defineProperty(obj, "name", {
      value: "laibh.top",
      writable: false,
      configurable: true,
      enumerable: true
  })
  obj; // {name:"laibh.top"}
  obj.name = "laibh";
  obj; // {name:"laibh.top"}
  for (let key in obj) {
      console.log(key) // "name"
  }

  Object.defineProperty(obj, "name", {
      enumerable: false
  })
  for (let key in obj) {
      console.log(key) // 什么都没有打印
  }

  Object.defineProperty(obj, "name", {
      writable: true
  })
  obj.name = "laibh"
  obj; // {name:"laibh"}

  Object.defineProperty(obj, "name", {
      configurable: false
  })

  Object.defineProperty(obj, "name", {
      writable: false
  })
  // error Cannot redefine property: name
```

通过这个例子，我们分别体验了这三个属性修饰符，还要一个字段是 `value` ，用来设置属性的值。首先当我们设置 `writable` 为 false, 通过给 `obj.name` 赋值没法修改它起初定义的属性值。

普通的属性在 for in 等迭代器中可以遍历到，设置 `enumerable` 为 `false` ，即是不可枚举的，就遍历不到了。

设置 `configurable` 为 `false` 后就无法通过 `Object.defineProperty` 修改该属性的三个描述符的值了，这是个不可逆的设置。

``` ts
function enumerable(bool: boolean) {
  return (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) => {
    console.log(target); // {getAge:f,constructor:f}
    descriptor.enumerable = bool;
  };
}

class Infx {
  constructor(public age: number) { }
  @enumerable(false)
  public getAge() {
    return this.age;
  }
}

const infx = new Infx(18);
infx; // {age:18}

for (const propertyName in infx) {
  console.log(propertyName); // age
}
```

上面的例子中通过我们定义了一个方法装饰器工厂，装饰器工厂返回一个装饰器；因为这个装饰器修饰在下面使用的时候修饰的是实例（或者实例继承的）的方法，所以装饰器的第一个参数是类的原型对象；第二个参数是这个方法名；第三个参数是这个属性的属性描述符的对象，可以直接通过设置这个对象上包含的属性描述符的值，来控制这个属性的行为。我们这里定义的这个方法装饰器，通过传入装饰器工厂的一个布尔值，来设置这个装饰器修饰方法的可枚举性。如果去掉 `@enumerable(false)` ，那么最后 `for in` 循环打印的结果，会既有 `age` 又有 `getAge` 

如果方法装饰器返回一个值，那么会用这个值作为方法的属性描述符对象

``` ts
  function enumerable(bool: boolean): any {
    return (
      target: any,
      propertyName: string,
      descriptor: PropertyDescriptor,
    ) => {
      return {
        value() {
          return "not age";
        },
        enumerable: bool,
      };
    };
  }

  class Info {
    constructor(public age: number) {}
    @enumerable(false)
    public getAge() {
      return this.age;
    }
  }

  const info = new Info();
  info.getAge(); // "not age"
```

在方法装饰器中返回一个对象，对象中包含 `value` 来修改方法， `enumerable` 用来设置可枚举性。我们可以看到最后打印出来的结果是 `info.getAge()` 为 `not age` 。说明我们成功使用 `function(){return "not age}` 替换了被装饰的方法 `getAge()` 

#### 访问器装饰器

访问器指的是 `set` 和 `get` 方法，一个是设置属性值触发的，一个是获取属性值触发的。TS 不允许同时装饰一个成员的 `get` 和 `set` 访问器，只需要这个成员 `set/get` 访问器中定义在前面的一个即可。

访问器装饰器也有三个参数，和方法装饰器一样。

``` ts
function enumerable(bool: boolean) {
  return function(
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = bool;
  };
}
class Info {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  @enumerable(false)
  get name() {
    return this._name;
  }
  @enumerable(false) // error 不能向多个同名的 get/set 访问器应用修饰器
  set name(name) {
    this._name = name;
  }
}
```

经过 `enumerable` 访问器装饰器的处理后， `name` 属性变成了不可枚举的属性。同样的，如果访问装饰器有返回值，这个值会被作为属性的属性描述符。

#### 属性装饰器

属性装饰器声明在属性声明之前，它有两个参数，和方法装饰器齐纳两个参数是一样的。属性装饰器没有办法操作属性的属性描述符，只能用来判断某各类中是否声明了某个名字的属性

``` ts
function printPropertyName(target: any, propertyName: string) {
  console.log(propertyName);
}

class Info {
  @printPropertyName
  public name: string | undefined;
  @printPropertyName
  public age: number | undefined;
}
```

#### 参数装饰器

参数装饰器有三个参数，前两个和方法装饰一样

装饰静态成员时是类的构造函数，装饰实例成员的时候是类的原型对象；成员的名字；参数在函数参数列表中索引。参数装饰器的返回值会被忽略

``` ts
function required(target: any, propertyName: string, index: number) {
  console.log( `修饰的是 ${propertyName}的第${index + 1}个参数` );
}

class Info {
  public name: string = "laibh.top";
  public age: number = 18;
  public getInfo(prefix: string, @required infoType: string): any {
    return prefix + " " + this[infoType];
  }
}

interface Info {
  [key: string]: string | number | Function;
}

const info = new Info();

info.getInfo("hihi", "age"); // 修饰的是 getInfo 的第二个参数
```

## 使用模块封装代码

在 TS1.5 之前有内部模块和外部模块的概念，从1.5版本开始，内部模块称为命名空间，外部模块称为模块。TS 的模块系统是遵循 ES6 标准的。

TS 的模块除了遵循 ES6 标准的模块语法外，还有一些特定语法，用于类型系统兼容多个模块格式。

### export 

TS 中，使用 `export` 导出声明，而且能够导出的不仅有变量、函数、类，还包括 TS 特有的类型别名和接口

``` ts
// funcInterface.ts
export interface Func{
  (arg:number):string
}
export class C{
  constructor(){}
}
class B{}
export { B }
export { B as ClassB }
```

可以使用 `export` 导出一个声明，也可以先声明一个类或者其他内容，然后使用 `export{}` 的形式导出，也可以使用 `as` 来为导出的接口换个名字再导出一次。也可以像 ES6 模块那样重新导出一个模块，也就是 `export` 一个引入内容，也可以重新导出部分内容，也可以重命名重新导出

``` ts
// main.ts
export * from "./moduleB";

// main.ts
export {name} from "./moduleB";

// main.ts
export {name as nameProp} from "./moduleB";
```

### import

导出的模块的引入，

``` ts
// main.ts
import {name} from "./moduleB";
import * as info from "./moduleB";
import {name as nameProp} from "./moduleB";
```

直接模块名或者文件路径，进行有副作用的导入

``` ts
import "./set-title.ts"
```

### export default

默认导出

``` ts
// moduleB.ts

export default "laibh.top"

// main.ts

import name from "./moduleB.ts"
name; // "laibh.top"
```

### export = 和 import = require()

TS 可以将代码编译为 `CommonJS` 、 `AMD` 或其他模块系统代码，同时会生成对应的声明文件。我们知道 `CommonJS` 、 `AMD` 这两种模块系统语法是不兼容的，所以 TS 为了兼容这两种语法，使得我们编译后的声明文件同时支持这两种模块系统，增加了 `export =` 和 `import xx = require()` 这两个语句

当我们想要导出一个模块时，可以使用 `export =` 来导出：

``` ts
// moduleC.ts
class C{}
export = C;
```

然后使用这个形式导出的模块，必须使用 `import xx = require()` 来引入

``` ts
// main.ts
import ClassC = require("./moduleC");
const c = new ClassC();
```

## 使用命名空间封装代码

命名空间在 1.5 之前的版本中，是叫做“内部模块”。在 1.5 版本之前，ES6 模块还没正式成为标准，所以 TS 对于模块的实现，是将模块分为“内部模块”和“外部模块”两种。内部模块使用module来定义，而外部模块使用export来指定哪个内容对外部可见。

1.5 版本开始，使用“命名空间”代替“内部模块”说法，并且使用 namespace 代替原有的 module关键字，而“外部 模块”则改为“模块”。

命名空间的作用和使用场景和模块是有区别的，当我们在程序内部用于防止全局污染，想把相关的内容都放在一起的时候，使用命名空间。当我们封装了一个工具或者库，要适用于模块系统中引入使用时，适合使用模块。

### 定义与使用

命名空间的定义实际相当于定义了一个大的对象，里面可以定义变量、接口、类、方法等等，但是如果不使用 `export` 关键字指定此内容要对外可见的话，外部是没法访问到的。把所有涉及到的内容验证都放在一起，文件名叫做 `validation.ts` 

``` ts
namespace Validation {
  const isLetterReg = /^[A-Za-z]+$/;
  export const isNumberReg = /^[0-9]+$/;
  export const checkLetter = (text: any) => {
    return isLetterReg.test(text)
  }
}

```

我们创建了一个命名空间叫做 Validation，它里面定义了三个内容，两个正则表达式，但是区别在于 isLetterReg 没有使用 export 修饰，而 isNumberReg 使用了 export 修饰。最后一个函数，也是用了 export 修饰。

命名空间在引入的时候，如果是使用 tsc 命令行编译文件，比如是在 `index.ts` 文件使用这个命名空间，先直接像下面这样写

``` ts
/// <reference path="validation.ts"/>
let isLetter = Validation.checkLetter("sdfsd");
const reg = Validation.isNumberReg;
console.log(isLetter);
console.log(reg);
```

命名空间如果不是使用 webpack 等工具编译，而是使用 tsc 编译，那只需要在使用外部命名空间的地方使用 `///` 三斜线开头来引用, 然后在 path 属性指定相对于当前文件，这个命名空间文件的路径。然后编译时，需要指定一个参数 outFile，这个参数来指定输出的文件名：

``` shell
tsc --outFile src/index.js src/index.ts
```

使用 outFile 只支持amd和system两种模块标准，所以需要在tsconfig.json里，设置 module 编译选项。

``` javascript
var Validation;
(function(Validation) {
    var isLetterReg = /^[A-Za-z]+$/;
    Validation.isNumberReg = /^[0-9]+$/;
    Validation.checkLetter = function(text) {
        return isLetterReg.test(text);
    };
})(Validation || (Validation = {}));
/// <reference path="namespace.ts"/>
var isLetter = Validation.checkLetter("sdfsd");
var reg = Validation.isNumberReg;
console.log(isLetter);
console.log(reg);
```

可以看到，编译后的 JS 文件将命名空间定义的文件 Validation.ts 文件的内容和 index.ts 的内容合并到了最后输出的文件。

如果我们要在 webpack 等工具中开发项目，并时时运行，如果只通过 `/// <reference path=“Validation.ts”/>` 来引入命名空间，你会发现运行起来之后，浏览器控制台会报 Validation is not defined 的错误。所以如果是要在项目中时时使用，需要使用 export 将命名空间导出，其实就是作为模块导出，然后在 index.ts 中引入，先来看 Validation.ts 文件：

``` ts
export namespace Validation {
  const isLetterReg = /^[A-Za-z]+$/;
  export const isNumberReg = /^[0-9]+$/;
  export const checkLetter = (text: any) => {
    return isLetterReg.test(text);
  };
}
// 然后在 index.ts 文件中引入并使用：

import { Validation } from "./Validation.ts";
let isLetter = Validation.checkLetter("sdfsd");
const reg = Validation.isNumberReg;
console.log(isLetter); // true
console.log(reg); // /^[0-9]+$/

```

命名空间本来就是防止变量污染，但是模块也能起到这个作用，而且使用模块还可以自己定义引入之后的名字。所以，并不建议导出一个命名空间，这种情况你应该是用模块。

### 拆分为多个文件

将同一个命名空间拆成多个文件分开维护，尽管分成了多个文件，但它们仍然是同一个命名空间。下面我们将 Validation.ts 拆开成 LetterValidation.ts 和 NumberValidation.ts：

``` ts
// LetterValidation.ts
namespace Validation {
  export const isLetterReg = /^[A-Za-z]+$/;
  export const checkLetter = (text: any) => {
    return isLetterReg.test(text);
  };
}

// NumberValidation.ts
namespace Validation {
  export const isNumberReg = /^[0-9]+$/;
  export const checkNumber = (text: any) => {
    return isNumberReg.test(text);
  };
}

// index.ts
/// <reference path="./LetterValidation.js"/>
/// <reference path="./NumberValidation.js"/>
let isLetter = Validation.checkLetter("sdfsd");
const reg = Validation.isNumberReg;
console.log(isLetter); // true

```

使用命令行来编译一下：

``` shell
tsc --outFile src/index.js src/index.ts
```

输出的 index.js

``` javascript
var Validation;
(function(Validation) {
    Validation.isLetterReg = /^[A-Za-z]+$/;
    Validation.checkLetter = function(text) {
        return Validation.isLetterReg.test(text);
    };
})(Validation || (Validation = {}));
var Validation;
(function(Validation) {
    Validation.isNumberReg = /^[0-9]+$/;
    Validation.checkNumber = function(text) {
        return Validation.isNumberReg.test(text);
    };
})(Validation || (Validation = {}));
/// <reference path="./LetterValidation.ts"/>
/// <reference path="./NumberValidation.ts"/>
var isLetter = Validation.checkLetter("sdfsd");
var reg = Validation.isNumberReg;
console.log(isLetter); // true
```

可以看到，我们使用 reference 引入的两个命名空间都被编译在了一个文件，而且是按照引入的顺序编译的。我们先引入的是 LetterValidation，所以编译后的 js 文件中，LetterValidation 的内容在前面。而且看代码可以看出，两个验证器最后都合并到了一起，所以 Validation 对象有两个正则表达式，两个方法。

### 别名

使用 `import` 给常用的对象起一个别名。但是要注意，别名和类型别名不是一回事， `import` 也只是为了创建别名不是引入模块。

``` ts
namespace Shapes{
  export namespace Polygons{
    export class Triangle{}
    export class Squaire{}
  }
}
import polygons = Shapes.Polygons; // 使用 import 关键字给 Shapes.Polygons 取一个别名 polygons
let sq = new polygons.Square();
```

## 声明合并

声明合并是指TS 编辑器会将名字相同的多个声明合并为一个声明，合并后的声明同时拥有多个声明的特性。JS 中，使用 `var` 关键字定义变量时，定义相同名字的变量，后面的会覆盖前面的值。使用 `let` 定义变量和使用 `const` 定义常量时，不允许名字重复。TS 中，接口、命名空间是可以多次声明的，TS 会将多个同名声明合并为一个。

``` ts
interface Info{
  name:string
}
interface Info{
  age:number
}
let info:Info
info = {
  name:"laibh.top" // error 类型“{ name: string; }”中缺少属性“age”
}
info = {
  name:"laibh.top",
  age:18
}
```

可以看到 info 的定义要求同时包含 age 和 name，声明合并了

TS 的所有声明概括起来，会创建三个实体之一：命名空间、类型和值

命名空间的创建实际是创建一个对象，对象的属性是在命名空间里 `export` 导出的内容

类型的声明是创建一个类型并赋给一个名字

值的声明就是创建一个在 JS 中可以使用的值

| 声明类型            | 创建了命名空间 | 创建了类型 | 创建了值 |
| ------------------- | -------------- | ---------- | -------- |
| Namespace           | √              |            | √        |
| Class               |                | √          | √        |
| Enum                |                | √          | √        |
| interface           |                | √          |          |
| Type Alias 类型别名 |                | √          |          |
| Function            |                |            | √        |
| Variable            |                |            | √        |

命名空间创建了命名空间这种实体，Class/Enum 中 Class 即是实际的值也作为类使用，Enum 编译为 JS 后也是实际值。在一定条件下，Enum 的成员对象可以作为类型使用；Interface 和类型别名是纯粹的类型，而 Function 和 Variable 只是创建了 JS 中可用的值，不能作为类型使用，Variable 是变量，不是常量，常量是可以作为类型使用的。

### 合并接口

多个同名合并接口，定义的非函数的成员命名应该是不重复的，如果重复了，类型应该是相同的，否则会报错

对于函数成员，每个同名含函数成员都会被当做这个函数的重载，且合并后的接口具有更高的优先级。

``` ts
interface Res{
  getRes(input:string):number
}
interface Res{
  getRes(input:number):string
}
const res:Res = {
  getRes:(input:any):any=>{
    if(typeof input === "string") return input.length
    else return String(input)
  }
}
res.getRes("123").length // error 类型“number”上不存在属性“length”
```

### 合并命名空间

同名命名空间最后会将多个命名空间导出的内容进行合并

``` ts
namespace Validation{
  export const checkNumber = ()=>{}
}
namespace Validation{
  export const checkString = ()=>{}
}

// 相当于 

namespace Validation{
  export const checkNumber = ()=>{}
  export const checkString = ()=>{}
}
```

在命名空间里，有时我们并不是把所有内容都对外部可见，对于没有导出的内容，在其它同名命名空间内是无法访问的：

``` ts
namespace Validation {
    const numberReg = /^[0-9]+$/
    export const stringReg = /^[A-Za-z]+$/
    export const checkString = () => {}
}
namespace Validation {
    export const checkNumber = (value: any) => {
        return numberReg.test(value) // error 找不到名称“numberReg”
    }
}
// 上面定义的两个命名空间，numberReg没有使用export导出，所以在第二个同名命名空间内是无法使用的，如果给 const numberReg 前面加上 export，就可以在第二个命名空间使用了。
```

### 不同类型合并

命名空间分别和类、函数、枚举都可以合并

#### 命名空间和类

要求同名的类和命名空间在定义的时候，类必须命名在命名空间前面，最后合并之后的效果，一个包含一些以命名空间导出内容为静态属性的类

``` ts
class Validation {
    checkType() { }
}
namespace Validation {
    export const numberReg = /^[0-9]+$/
    export const stringReg = /^[A-Za-z]+$/
    export const checkString = () => { }
}
namespace Validation {
    export const checkNumber = (value: any) => {
        return numberReg.test(value)
    }
}
console.log(Validation.prototype) // { checkType: fun () {} }
console.log(Validation.prototype.constructor) 
/**
{
    checkNumber: ...
    checkString: ...
    numberReg: ...
    stringReg: ...
}
*
```

#### 命名空间和函数

JS 中，函数也是对象，可以给函数设置属性。TS 中可以通过声明合并实现。函数的定义要在同名命名空间前面

``` ts
function countUp(){
  countUp.count++
}
namespace countUp{
  export let count = 0;
}
countUp()
countUp()
countUp.count // 2;
```

#### 命名空间和枚举

通过命名空间和枚举的合并，为枚举类型扩展内容，没有顺序要求

``` ts
enum Colors{
  red,
  green,
  blue
}
namespace Colors{
  export const yellow = 3;
}

Colors;
/*
{
    0: "red",
    1: "green",
    2: "blue",
    red: 0,
    green: 1,
    blue: 2,
    yellow: 3 
}
*/
```

通过打印结果你可以发现，虽然我们使用命名空间增加了枚举的成员，但是最后输出的值只有key到index的映射，没有index到key的映射。

## 混入、兼顾值和类型的合并操作

混入即把两个对象或者类的内容，混合起来，从而实现一些功能的复用。JS 中实现简单的混入

``` javascript
class A {
    constructor() {}
    funcA() {
        console.log("here");
    }
}
class B {
    constructor() {}
    funcB() {}
}
const mixin = (target, from) => {
    Object.getOwnPropertyName(from).forEach(key => {
        target[key] = from[key]; //
    })
}
mixin(B.prototype, A.prototype);
const b = new B();
b.funcA(); // here
```

`Object.getOwnPropertyNames` 方法获取一个对象自身的属性，这里的自身是除去继承的属性，获取到属性后将属性赋值给目标对象

这是 JS 简单混入，TS 中除了值还有类型的概念，所以简单地将属性赋值到目标元素是不行的，还要处理类型定义

``` ts
class ClassAa{
  isA:boolean;
  funcA(){};
}
class ClassBb{
  isB:boolean;
  funcB(){};
}
// 定义一个类类型接口AB
// 让类AB继承classAa和ClassBb 的类型，所以使用 implements 关键字，而不是 extends
class AB implements ClassAa,ClassBb{
  constructor(){}
  isA: boolean = false;
  isB: boolean = false;
  funcA:()=>void;
  funcB:()=>void;
}
function mixins(base:any,from:any[]){ // 直接传入类，而非原型对象，base是我们最后要汇总的类，from是个数组。是我们要混入的源类组成的数组
  from.forEach(fromItem=>{
    Object.getOwnPropertyName(fromItem.prototype).forEach(key=>{
      base.prototype[key] = fromItem.prototype[key];
    })
  })
}

mixins(AB,[ClassAa,ClassBb]);
const ab = new AB();
ab;
/*
  isA:false,
  isB:false,
  __proto__:{
    funcA:f()
    funcB:f()
    constructor:f
  }
*/
```

## Promise以及其语法糖 async/await

TS 在1.6 版本支持了 `async` 函数。

简单 ajax例子

``` javascript
ajax.post("/login", {
    data: {
        user_name: "laibh.top",
        password: "xxxx"
    },
}, function(res) {
    const {
        user_id
    } = res.data;
    ajax.post("/user_roles", {
        data: {
            user_id,
        }
    }, function() {
        const {
            role
        } = res.data;
    })
})
```

上面的例子，先调用登录的接口发送用户名，然后服务端进行校验后返回这个用户的一些信息，从中拿到用户id后获取它的角色用于权限控制。这个过程有先后顺序，先登录后获取角色。在过去使用回调函数，当然一些库也支持链式调用，ES6的Promise

``` javascript
const loginReq = ({
    username,
    password
}) => {
    return new Promise((resolve, reject) => {
        ajax.post("/login", {
                user_name: "laibh.top",
                password: "xxxx",
            },
            res => {
                resolve(res);
            },
            error => {
                reject(error);
            })
    })
}

const getRoleReq = ({
    userId,
}) => {
    return new Promise((resolve, reject) => {
        ajax.post("/login", {
                userId
            },
            res => {
                resolve(res);
            },
            error => {
                reject(error);
            })
    })
}
loginReq("/user_roles", {
    username: "laibh.top",
    password: "xxxx"
}).then(res => {
    getRoleReq({
        userid: res.data.userid
    }).then(res => {
        console.log(res.data.role)
    })
})
```

ES7 中增加了 async 和 await 的规范，其实是 Promise的语法糖。

``` ts
interface Res{
  data:{
    [key:string]:any,
  }
}

namespace axios{
  export function post(url:string,config:object):Promise<Res>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        let res:Res = [data:{}];
        if(url === "login") res.data.userid = 111;
        else res.data.role = "admin"
        resolve(res)
      },1000)
    })
  }
}

interface Info{
  username:string;
  password:string;
}

async function loginReq({username,password}:Info){
  try{
    const res = await axios.post("/login",{
      data:{
        username,
        password
      }
    })
    return res
  }.catch(error){
    throw new Error(error);
  }
}

async function getRoleReq(userid:number){
  try{
    const res = await axios.post("/user_roles",{
      data:{
        userid
      }
    })
    return res
  }.catch(error){
    throw new Error(error);
  }
}

loginReq({username:"laibh.top",password:"1234"}).then(res=>{
  const { data:{
    userid
  } } = res;
  getRoleReq(userid).then(res=>{
    const {
      data:{
        role
      }
    }
    console.log(role)
  })
})
```

## 书写声明文件

有两种常见的模块标准，不同的模块在实现方式上是不同的。为已有的第三方JS库编写声明文件以便在 TS 中更好地使用类型系统。首先要知道我们使用的JS库被编译成了什么类型

### 全局库

不需要我们引入变量，只需要将库引入即可使用的库叫做全局库。例如 `Jquery` 。UMD 模块既可以作为模块使用，又可以作为全局库使用的模块，在判断一个库的时候，如果它可以像全局使用，首先要明确它是不是UMD模块，如果不是，就可能是一个单纯的全局库。

通过查看库的源码可以判断它的类型，一个全局库，通常会包含下面内容的一个或者多个：

1. 顶级 `var` 语句或者 `function` 声明
2. 一个或多个赋值给 `window.someName` 的赋值语句
3. 判断 `document` 或 `window` 是否存在的判断逻辑

因为顶级 `var` 或者 `function` 是直接在全局环境声明变量或者函数，不使用立即执行函数包裹会影响到全局，所以有这种一般是全局库；当出现 `window` 设置某个属性名 `someName` ，然后给这个属性赋值的语句的时候，是在给全局对象 `window` 赋值。引入这个库然后通过 `window.someName` 即可在全局任何地方访问到这个属性值；如果出现 `if` 语句或三元操作符这种判断 `document` 或者 `window` 是否存在的语句，也有可能是要给这两个全局对象添加内容，所以也有可能是全局库

但是由于把一个全局库转变为 UMD 库也较为容易，所以现在全局库较少。

全局库的代码：

``` javascript
// handle-title.js
function setTitle(title) {
    document && (document.title = title)
}

function getTitle() {
    return (document && document.title) || "";
}
let documentTitle = getTitle();
```

上述这个库，声明了一个 `setTitle` 函数，接受一个参数，在函数内判断 `document` 是否存在，执行后面的逻辑。将 `title` 赋值给 `document.title` 。从而实现修改显示在浏览器标签的文字；一个 `getTitle` 函数，用于获取此时的 `title` 值，如果没有 `document` 对象，则返回空字符串；一个全局变量 `documentTitle` 来初始化记录此时的 `title` 

为这个 `handle-title.js` 全局库编写一个声明文件 `handle-title.d.ts` ，官方为每一种库类型提供了响应的声明文件模块，全局库的模块是 `global.d.ts` ，首先看一下模块中的内容

``` ts
// 如果库有一个全局暴露函数，可以传入不同类型的参数，返回不同的值，所以可以为它定义函数重载
declare function myLib(a:string):string;
declare function myLib(a:number):number;

// 如果想让这个库作为一个类型，可以定义一个接口
declare interface myLib{
  name:string;
  length:number;
  extras?:string[];
}
// 如果这个库有一些需要在全局暴露的属性，可以定义这个空间，将值、接口和类型别名等定义在这里
// 这样，在下面命名空间中没有列出的内容，通过 myLib.xxx 访问时在编译阶段会报错，但是运行时是可以访问的，只要这个 JS库定义了

declare namespace myLib{
  let timeout:number; // 通过myLib.timeout 访问，也可以修改，myLib.timeout=123
  const version:string;// 通过myLib.version 访问，但不能修改，因为 const 声明的
  class Cat{
    constructor(n:number);
    readonly age:number;
    purr():void;
  }
  interface CatSettings{
    weight:number;
    name:string;
    tailLength?:number;
  }  
  type VetID = string |number;
  function checkCat(c:Cat,s?:VetID);
}
```

`handle-title.js` 可以直接在 `index.html` 文件里引入，如果不定义声明文件，我们直接在 `index.ts` 里面使用，会报错：

``` javascript
getTitle(); // error 找不到名称 "getTitle"
documentTitle; // error 找不到名称 "documentTitle"
```

为 `handle-title.js` 库编写一个声明文件：

``` ts
// handle-title.ts
declare function setTitle(title:number|string):void;
declare function getTitle():string;

declare let documentTitle:string;
```

在 `tsconfig.json` ，通过设置 `include` 让编译器自动引入 `./src/` 文件夹下所有的声明文件

``` json
{
  "include":[
    "./src/**/*.ts",
    "./src/**/*.d.ts",
  ]
}
```

这样在 `src/types` 文件夹下里面的所有声明文件就会起作用了， `index.ts` 使用 `getTitle` 和 `documenTitle` 就没有问题了

### 模块化库

模块化库依赖模块解析器的库。判断一个库是模块化库，在模块库中一般会看到下面的情况之一：

1. 无条件使用 `require` 或者 `defined` 
2. 像 `import * as from 'b'` 或者 `export c` 这样的声明
3. 赋值给 `exports.someName` 或者 `module.exports` 

因为模块化库依赖模块解析器环境，在使用这种库的时候，就已经引入模块解析器的 `require` 或 `define` 等方法了，所以模块化库会直接调用这些方法来加载代码；库中包含 `import * as a from 'b'` ，这种就是 CommonJS 模块的导出语句了。极少会在模块化库中看到对 `window` 或者 `global` 的赋值，但也有一些库需要操作 `window` ；

针对模块，官方有三个模板声明文件，分别是 `module.d.ts` 、 `module-class.d.ts` 、 `module-function.d.ts` 

如果这个模块引入后，可以直接当做函数调用，那么可以参考 `module-function.ts` 

如果模块引入后，可以直接作为类使用 new 关键字创建实例，可以参数 `module-class.d.ts` 文件

如果模块不能被调用也不能被当做类，参考 `module.d.ts` 

### UMD 库

UMD 库将全局库和模块库的功能进行了结合，会先帕努单环境中有没有模块加载器的一些特定的方法。如果有说明是模块加载器环境，UMD 库就会使用模块的方式导出。如果没有检测到这些方法，则会将内容添加到全局环境。一般在 UMD 库中会看到这样的判断：

``` javascript
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["libName"], factory)
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("libName"))
    } else {
        root.returnExports = factory(root.libName);
    }
})(this, function(b) {
    // ...
})
```

现在很多库 都是 UMD 库，比如 JQ、moment等，可以在 html 中直接通过 `script` 引入，也可以通过模块的形式引入。

## 为不同类型库书写声明文件

### 模块插件或者 UMD 插件

一些模块和插件是支持插件机制的，比如我们常见的 Jq, 它的插件很多。为库书写声明文件的同时，为库的插件定义声明文件，可以参考官方模块 `module-plugin.d.ts` 

### 全局插件

全局插件往往会修改全局中的一些对象，在这些对象上添加或者修改属性方法：

``` javascript
// add-methods-to-string.js
String.prototype.getFirstLetter = function() {
    return this[0];
}
```

这段代码在 String 构造函数的原型对象上添加了一个 `getFirstLetter` 方法，这个返回可以返回字符串的第一个字符。

在 String 构造函数原型对象上添加一个方法，这个方法就会被 String 创建的实例继承，如果使用 `new String("laibh.top")` 创建一个实例 `name` ，那么这个 `name` 将是一个对象类型的值，它的属性是从0开始到 n 的数字，属性值对应字符串的第1个、第n个字符。而 `const name = "laibh.top"` 字面量的形式定义的 name, 其实是个字符串类型的值，字符串就不会继承构造函数的方法了，以为它不是对象，但事实是它可以调用 `getFirstLetter` 方法。因为它在调用方法的时候，会先将这个字符串包装成一个封装对象，在内部即使用 String构造函数，所以它依然可以调用原型对象上的方法。

在 html文件里引入这个 js 文件后创建一个字符串，这个字符串可以调用 `getFirstLetter` 方法

``` html
<script type="text/javascript" src="./add-methods-to-string.js"></script>
<script type="text/javascript">
    var str = "laibh.top";
    console.log(str.getFirstLetter())
</script>
```

在 TS 中使用，就需要为这个创建声明文件，创建一个声明文件 `global-plugin.d.ts` 

``` ts
// global-plugin.d.ts
interface String{
  getFirstLetter():number
}

// index.ts
const str = "laibh.top"
str.getFirstLetter(); //"L"
```

遇到这种情形可以参考官方 `global-plugin.d.ts` 模板来书写声明文件

### 修改全局的模块

一些影响全局的全局模块，这些模块除了导出一些东西，还会直接修改全局的一些对象，使用上面的例子，这次使用引入模块的形式来引入：

``` ts
// add-methods-to-string 模块
String.prototype.getFirstLetter = function(){
  return this[0];
}

// index.js
require("add-methods-to-string");
const name = "laibh.top"
name.getFirstLetter(); // "L"
```

`global-modifying-module.d.ts` 

``` ts
declare global{
  interface String{
    getFirstLetter():number
  }
}
export {};
```

声明文件没有需要导出的东西，这里在末尾加上 `export {}` ，TS编译器把这个声明文件当做一个模块声明。当加了这个声明文件后，就可以在TS 中引入这个模块，再在 TS 中调用字符串的 `getFirstLetter` 方法就不会报错了。这类全局模块，可以参考官方的 `global-modifying-module.d.ts` 模板

### 使用依赖

库会依赖其他库，所以可以在定义库声明文件的时候，声明对其他库的依赖，从而加载其他库的内容。如果是依赖全局库，可以使用 `///<reference types="UMDModuleName"/>` 三斜线来指定加载某个全局库：

``` ts
/// <reference types="globalLib"/>
function func():glbalLib.someName;

// 如果依赖的是模块库，是可以使用 import 语句
import * as moment from "moment";
function func():moment;
// 因为有些库是没有默认 `default` 输出的，在使用 import xx from "xx"语句引入一个库报错时，可以使用 import * as xx from "xx"的形式引入
// 如果是全局依赖某个 UMD 模块，也可以使用 三斜杆的方法来指定对某个 UMD 模块的依赖
// globals.d.ts
/// <reference types="moment" />
function getMoment():moment;

// 如果模块或一个 UMD 库依赖一个 UMD 库，使用 import * as 语句引入模块：
// module.d.ts
import * as moment from "moment";
export default function(m:typeof moment):void;
```

还有一些注意的是，防止命名冲突，在全局声明时，在全局范围定义大量类型，有时候会导致命名冲突，所以建议相关的定义放在命名空间内。

ES6插件的影响，ES6模块标准中，导出的模块不允许修改的，但是在 CommonJS 和其他一些加载器里面是允许的，所以要使用 ES6模块的话要注意

ES6模块调用，在使用一些库的时候，引入的模块可以作为函数直接调用，ES6的模块顶层对象是一个对象，它不能作为函数调用，比如使用 `export` 导出几个内容

``` ts
// moduleB.js
export const age = 10;
export let name = "laibh.top";

//  main.js
import info from "./moduleB.js"
info.name; // "laibh.top"

// index.js
import {name,age} from "./moduleB.js"
name; // "laibh.top"
```

如果想要导出一个直接可以调用的函数，又要使用 ES6模块，则可以使用 `export default` 导出一个函数

### 快捷外部模块声明

使用一个模块不想花时间精力为这个模块写声明，TS 在2.0版本支持快捷外部声明。比如使用 `moment` 模块，就可以在 `typings` 创建一个 `momemt` 文件夹，并在这个文件夹创建一个 `index.d.ts` 文件，内容：

``` ts
// index.d.ts
declare module "moment";
```

就可以正常使用 `moment` 模块了

官方提供了各种类型的书写声明文件
[global-modifying-module.d.ts](https://www.tslang.cn/docs/handbook/declaration-files/templates/global-modifying-module-d-ts.html)：适合修改全局的模块。
[global-plugin.d.ts](https://www.tslang.cn/docs/handbook/declaration-files/templates/global-plugin-d-ts.html)：适合全局插件。
[global.d.ts](https://www.tslang.cn/docs/handbook/declaration-files/templates/global-d-ts.html)：适合全局库。
[module-class.d.ts](https://www.tslang.cn/docs/handbook/declaration-files/templates/module-class-d-ts.html)：适合引入后可以直接当做类使用new关键字创建实例的模块。
[module-function.d.ts](https://www.tslang.cn/docs/handbook/declaration-files/templates/module-function-d-ts.html)：适合引入后可以直接当做函数的模块，
[module-plugin.d.ts](https://www.tslang.cn/docs/handbook/declaration-files/templates/module-plugin-d-ts.html)：适合模块插件或UMD插件。
[module.d.ts](https://www.tslang.cn/docs/handbook/declaration-files/templates/module-d-ts.html)：适合引入后既不能当做类直接使用，也不能直接当做函数调用的模块。


