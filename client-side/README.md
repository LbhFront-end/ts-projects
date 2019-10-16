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

