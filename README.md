# forms authentication

## 项目操作步骤

- 下载 express morgan jade，编写 app.js views/error.jade routes/index.js
- 下载 gulp gulp-rename gulp-plumber gulp-livereload gulp-jade gulp-less gulp-minify-css gulp-jshint jshint gulp-uglify，编写 gulpfile.js
- 编写 views/index.jade public/stylesheets/index.less

    - 固定宽度设计（1170px， 借助 `box-sizing: border-box`）
    
        - 编写 `header` 部分，在 `div` 中设置 h2 的外边距时，产生了与父 div 外边距合并的问题，进而导致 `navigation` 与 `header` 部分产生了空隙，通过为父 div 设置了上下的 padding 将问题解决
        - 编写 `navigation` 部分，这部分的亮点就是通过设置 `margin: -2px` ，将 `.active` 的样式生成的边与父 div 的边和并。
        - 编写 `content` 部分，先通过 `::after` 伪元素进行消除浮动，进而以 `main 780px` `aside 390px` 的固定宽度将两个元素进行左浮动，产生两列的效果，同时通过设置了左右 `15px` 的 padding 将两个列分隔开来
        - 编写 `footer` 部分，通过 `ul` 与 `contact` 平分 1170px 的宽度进行左浮动进而产生两列效果，同时通过设置 padding 15px 与上面的 `content` 部分形成对照，这里还要记得消除浮动。在 `contact` 部分有一个亮点，就是通过设置 `::after` 伪元素的背景并进行 `absolute` 绝对定位之后，由于只能在 `relative` 的父元素的 border 之内进行移动，通过设置 `bottom: -1px` 进而达到了和父元素的 border 和并的效果。

## 学习总结

- `div#header` 与 `div#navigation` 之间的空隙问题
    
    - 解决方法: google -> div 空隙问题
    - 解决网址: <https://segmentfault.com/q/1010000000095101>
    - 问题产生原因: 由于第二个 h2 标签的外边距与父 div 发生 `外边距重叠` ，这个时候的我就想了，为什么第一个 h2 没有造成上面的外边距呢？原来是因为父 div 上面设置了 padding。
    - 解决方案：
    
        1. 去掉第二个 h2 margin，并通过在 `文件开头` 添加如下代码进行全部默认的清楚。
        
                * {
                    padding: 0;
                    margin: 0;
                    border: 0;
                }

        2. 给父 div 设置 padding-bottom

## 待优化

- 响应式布局
- em 替代 px
- the basic leading
