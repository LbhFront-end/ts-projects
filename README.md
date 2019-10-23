# TS-projects

## 目录文件说明

### setting.json

`tslint.configFile` 用来说明指定 `tslint.json` 文件的路径，注意这里是相对根目录

`tslint.autoFixOnSave` 设置为 true 则每次保存的时候编辑器会自动根据我们的 tslint 配置对不符合规范的代码进行自动修改

`tslint.formatOnSave` 设为 true 则编辑器会对格式在保存的时候进行整理

### tsconfig

``` json
{
  "compileOnSave":true, // true,编辑项目中文件保存的时候，编辑器会根据配置重新生成文件
  "files":[], // 配置一个数组列表，里面包含指定文件的相对或绝对路径。编辑器在编译的时候只会编译包含在 files 中列出的文件，必须是指定文件
  "include":[], // 指定要编译的路径列表，和 files 区别在于，这里可以是文件夹，也可以是文件
  "exclude":[], // 要排除的、不编译的文件，可以指定一个列表，和 include规则一样，可文件可文件夹，可相对/绝对路径，通配符
  "extends":[], // 指定一个其他的 tsconfig.json 文件路径，继承这个配置文件里的配置，继承来的文件会覆盖当前文件定义的配置
  "compilerOptions":{} // 用来设置编译选项
}
```

#### compilerOptions

基本配置

`target` : 用于指定编译之后的版本，默认 ES3

`module` : 指定使用的模块标准，默认 ES6, 否则是 commonjs

`lib` : 指定要包含在编译中的库文件。如果 target 为 ES5，默认包含的库有DOM、ES5和ScriptHost；如果 target 是 ES6，默认引入的库有DOM、ES6、DOM. Iterable和ScriptHost。

`allowJS` : 指定是否允许编译JS

`checkJS` : 指定是否检查和报告JS文件中错误

`declaration` : 指定是否在编译的时候生成".d.ts"声明文件。编译每个ts之后会生成 js 和 一个声明文件。但是 `declaration` 和 `allowJs` 不能同设为true

`sourceMap` : 指定编译时是否生成 `.map` 文件

`outFile` : 用于指定将输出文件合并为一个文件，它的值为一个文件路径名，只有 `module` 设置为 `amd` 或者 `system` 模块时才支持这个配置

`outDir` : 用来指定输出文件夹，值为一个文件夹路径字符串，输出的文件都放置在这个文件夹

`rootDir` : 指定编译文件的根目录，编译器会在根目录查找入口文件，

`removeComments` : 指定是否将编译后的文件中的注释删掉，默认为false

`noEmit` : 不生成编译文件

`importHelpers` : 是否引入 tslib 里的辅助工具函数，默认 Wie

`isolateModules` : 是否将每个文件作为单独的模块，不可以和 declaration同时设定，默认为 true

`noEmit` : 不生成编译文件

严格检查相关，开启这些检查如果有错会报错

`noImplicitAny` : 没有设置明确类型，编辑器会默认为 `any` ，如果设为true, 则没有设置明确类型会报错

`alwaysStrict` : 始终以严格模式检查每个模块，并且在编译后的 JS 文件中加入 "use strict"字符串，用来告诉浏览器该 JS 为严格模式

`strictNullChecks` : `null` 和 `undefined` 值不能赋值给非这两种类型的值，别的类型的值也不能赋给它们，除了 `any` 类型，还有个例子就是 `undefined` 可以赋值给 `void` 类型

`strictFunctionTypes` : 指定是否使用函数参数双向协变检查

`strictPropertyInitiallization` : 设为true后会检查非 `undefined` 属性是否已经在构造函数里初始化，要开启这项需要用 `strictNullChecks` 

`strictBindCallApply` : 对 `bind` 、 `call` 、 `apply` 绑定方法参数的检测是严格检测的。

`strict` : 用于指定是否启用所有类型检查

额外的检查，开启了这些检查如果有错不会报错

`noUnusedLocals` : 用于检查是否有定义了但是没有使用的变量

`noUnusedParameters` : 用于检查是否在有函数体中没有使用的参数

`noImplicitReturns` : 用于检查函数是否有返回值

`noFallthroughCaseInSwitch` : 用于检查 switch是否有 case 没有使用 break 跳出 switch.

模块解析相关

`moduleResolution` : 用于选择模块解析策略，有 "node" 和 "classic"两种类型

`baseUrl` : 用于解析非相对模块名称的基本目录

`paths` : 用于设置模块名到基于 baseUrl 的路径映射，比如这样配置：

``` json
{
  "compilerOptions": {
    "baseUrl": ".", // 如果使用paths，必须设置baseUrl
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"] // 此处映射是相对于"baseUrl"
    }
  }
}
// 还有当我们要为没有声明文件的第三方模块写声明文件时，我们可以先如下设置：
{
  "compilerOptions": {
    "baseUrl": ".", // 如果使用paths，必须设置baseUrl
    "paths": {
      "*": ["./node_modules/@types/*", "./typings/*"]
    }
  }
}

```

然后在 tsconfig.json 文件所在的目录里建一个 typings 文件夹，然后为要写声明文件的模块建一个同名文件夹，比如我们要为 make-dir 这个模块写声明文件，那么就在 typings 文件夹下新建一个文件夹，命名为 make-dir，然后在 make-dir 文件夹新建一个 index.d.ts 声明文件来为这个模块补充声明。

`rootDirs` : 可以指定一个路径列表，在构建时编译器会将这个路径列表中的路径内容都放在同一个文件夹中

`typeRoots` : 用于指定声明文件或者文件路径列表，如果指定了这项，则只有在这里列出的声明文件才会被加载

`types` : 指定需要包含的模块，只有这里被列出的模块声明文件才会被加载进来

`allowSyntheticDefaultImports` : 用来指定允许从没有默认导出的模块中默认导入

source map 的一些配置

`sourceRoot` : 用于指定调试器应该找到 TS 文件而不是源文件位置，值会被写入 `.map` 文件

`mapRoot` : 指定调试器找到映射文件而非生成文件的位置

`inlineSourceMap` : 指定是否将map文件的内容和 js文件编译在同一个 js文件内。如果设为 true，则 map 的内容会以 `//# sourceMappingURL=` 然后接 base64 字符串的形式插入在 js 文件底部。

`inlineSources` : 指定是否进一步将 `.ts` 文件内容也包含在输出文件中

`experimentalDecorators` : 用于指定是否启用实验性的装饰器特性

`emitDecoratorMetadata` : 用于指定是否为装饰器提供元数据支持。可以通过 `Reflect` 提供的静态方法获取到元数据

