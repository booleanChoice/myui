# 基于[IView](https://www.iviewui.com/)的Vue组件开发项目分析

<br>

## iView介绍

iView 是一套基于 Vue.js 的开源 UI 组件库，主要服务于 PC 界面的中后台产品，github地址为：[https://github.com/iview/iview](https://github.com/iview/iview)

<br>

## 基于IView的 UI 组件开发项目分析

这里按照IView的形式创建一个[artery6](https://github.com/l751114500/artery6)项目模板，项目结构如下：

	|-- assets								// 静态资源文件
	|-- build								// 项目构建相关代码
	|   |-- build-style.js					// gulp打包css配置代码
	|   |-- locale.js						// 国际化语言文件的entry代码
	|   |-- webpack.base.config.js			// 基础配置代码
	|   |-- webpack.dev.config.js			// 本地预览example的配置代码
	|   |-- webpack.dist.dev.config.js		// 开发环境打包配置
	|   |-- webpack.dist.locale.config.js	// 国际化语言文件打包配置
	|   |-- webpack.dist.prod.config.js		// 生产环境打包配置
	|-- examples							// 本地预览样例文件夹
	|   |-- routers							// 样例组件目录
	|   |	|-- button.vue					// 样例组件
	|   |-- app.vue							// 本地预览入口组件,里面有样例组件的路由链接和路由展示
	|   |-- index.html						// 本地预览入口页面
	|   |-- main.js							// 本地预览入口js,内含路由配置和Vue的实例化
	|-- src									// 源码目录
	|   |-- components						// 编写组件目录
	|   |	|-- button						// button组件目录
	|   |	|	|-- button.vue				// button组件实现
	|   |	|	|-- index.js				// button组件索引,用于导出
	|   |-- locale							// 国际化配置文件目录
	|   |-- mixins							// 混入文件目录,内含一些公共的混入js
	|   |-- styles							// 样式文件目录
	|   |	|-- animation					// 动画
	|   |	|-- common						// 全局样式
	|   |	|-- components					// 组件样式
	|   |	|	|-- button.less				// button组件样式
	|   |	|-- mixins						// 混入样式
	|   |-- utils							// 工具脚本目录
	|   |-- index.js						// 组件索引文件,用于导出
	|-- .babelrc			 				// ES6语法编译配置
	|-- .editorconfig						// 定义代码格式
	|-- .eslintignore						// eslint忽略文件配置
	|-- .eslintrc.json						// eslint配置
	|-- .gitignore							// git忽略文件配置
	|-- README.md							// 项目说明
	|-- package.json						// 项目基本信息


### 我们从_package.json_文件开始分析项目:

	{
	  "name": "artery",
	  "version": "1.0.0",
	  "title": "Artery6",
	  "description": "An artery6 UI components Library with Vue.js",
	  "author": "Artery",
	  "license": "MIT",
	  "files": [
	    "dist",
	    "src"
	  ],
	  "scripts": {
	    "dev": "webpack-dev-server --content-base test/ --open --inline --hot --compress --history-api-fallback --port 8081 --config build/webpack.dev.config.js",
	    "dist:style": "gulp --gulpfile build/build-style.js",
	    "dist:dev": "webpack --config build/webpack.dist.dev.config.js",
	    "dist:prod": "webpack --config build/webpack.dist.prod.config.js",
	    "dist:locale": "webpack --config build/webpack.dist.locale.config.js",
	    "dist": "npm run dist:style && npm run dist:dev && npm run dist:prod && npm run dist:locale",
	    "lint": "eslint --fix --ext .js,.vue src",
	    "unit": "cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run",
	    "test": "npm run lint && npm run unit",
	  },
	  "dependencies": {
			...
	  },
	  "peerDependencies": {
			...
	  },
	  "devDependencies": {
			...
	  },
	  "engines": {
	    "node": ">= 6.0.0",
	    "npm": ">= 3.0.0"
	  }
	}

<br>

### 深入研究一下_script_字段：

#### 1. 本地预览examples: `npm run dev`
 
> "dev": "webpack-dev-server --content-base test/ --open --inline --hot --compress --history-api-fallback --port 8081 --config build/webpack.dev.config.js"

该条script通过`webpack-dev-server`命令执行 _webpack.dev.config.js_，意在本地预览examples，webpack-dev-server是一个轻量级的服务器，修改文件源码后，自动刷新页面将修改同步到页面上，配置文件的入口为：
	
    // 入口
    entry: {
        main: './examples/main',
        vendors: ['vue', 'vue-router']
    }

#### 2. 打包样式文件: `npm run dist:style`

> "dist:style": "gulp --gulpfile build/build-style.js"

build/build-style.js文件中通过gulp编译了/src/styles中的less文件并打包了字体文件

#### 3. 打包开发环境文件: `npm run dist:dev`

> "dist:dev": "webpack --config build/webpack.dist.dev.config.js"

webpack通过 _webpack.dist.dev.config.js_ 的配置把组件打包为artery.js，入口为：

    entry: {
        main: './src/index.js'
    }

通过/src/index.js这个索引导出了控件，输出为：

    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'artery.js',
        library: 'artery',
        libraryTarget: 'umd',
        umdNamedDefine: true
    }

在/dist下会生成打包好的artery.js
#### 4. 打包生产环境文件: `npm run dist:prod`

> "dist:prod": "webpack --config build/webpack.dist.prod.config.js

_webpack.dist.prod.config.js_ 和 _webpack.dist.dev.config.js_ 的配置相似，它同时还通过webpack的插件UglifyJsPlugin把js压缩成了生产环境所需的artery.min.js，入口和输出配置为：

	entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'artery.min.js',
        library: 'artery',
        libraryTarget: 'umd',
        umdNamedDefine: true
    }

#### 5. 打包国际化文件: `npm run dist:locale`

> "dist:locale": "webpack --config build/webpack.dist.locale.config.js"

webpack.dist.locale.config.js里面是一些打包国际化js文件的配置，他的入口由_build/locale.js_文件指定，locale.js遍历了src/locale/lang中的文件名，指定了打包的入口

#### 6. 整体打包: `npm run dist`

> "dist": "npm run dist:style && npm run dist:dev && npm run dist:prod && npm run dist:locale"

依次执行 __2 3 4 5__ 脚本

#### 7. 校验语法: `npm run lint`

> "lint": "eslint --fix --ext .js,.vue src"

通过eslint校验一遍项目的语法

#### 8. 单元测试: `npm run unit`

> "unit": "cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run

通过karma执行_karma.conf.js_执行单元测试，搭配webpack.test.config.js使用

#### 9. 测试代码: `npm run test`

> "test": "npm run lint && npm run unit"

依次执行 __7 8__ 脚本

<br>

### ___webpack.base.config.js___介绍
该文件为webpack的基础配置文件，其中 _webpack.dev.config、 webpack.dist.dev.config、 webpack.dist.prod.config_ 都通过webpack-merge的形式引用该文件，里面配置一些公用的loader还有resolve字段，resolve字段中需要用绝对路径：

	/**
	 * 公共配置
	 */
	var path = require('path');
	function resolve (dir) {
	    return path.join(__dirname, '..', dir)
	}
	
	module.exports = {
	    // 加载器
	    module: {
	        // https://doc.webpack-china.org/guides/migrating/#module-loaders-module-rules
	        rules: [
	            {
	                // https://vue-loader.vuejs.org/en/configurations/extract-css.html
	                test: /\.vue$/,
	                loader: 'vue-loader',
	                options: {
	                    loaders: {
	                        css: 'vue-style-loader!css-loader',
	                        less: 'vue-style-loader!css-loader!less-loader'
	                    },
	                    postLoaders: {
	                        html: 'babel-loader'
	                    }
	                }
	            },
	            {
	                test: /\.js$/,
	                loader: 'babel-loader', exclude: /node_modules/
	            },
	            {
	                test: /\.css$/,
	                use: [
	                    'style-loader',
	                    'css-loader',
	                    'autoprefixer-loader'
	                ]
	            },
	            {
	                test: /\.less$/,
	                use: [
	                    'style-loader',
	                    'css-loader',
	                    'less-loader'
	                ]
	            },
	            {
	                test: /\.scss$/,
	                use: [
	                    'style-loader',
	                    'css-loader',
	                    'sass-loader?sourceMap'
	                ]
	            },
	            { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=8192'},
	            { test: /\.(html|tpl)$/, loader: 'html-loader' }
	        ]
	    },
	    resolve: {
	        extensions: ['.js', '.vue'],
	        alias: {
	            'vue': 'vue/dist/vue.esm.js',
	            '@': resolve('src')
	        }
	    }
	};

