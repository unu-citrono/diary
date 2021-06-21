# diary
A diary website based on Node.js
一个基于Node.js的日记网站，使用Node.js + MongoDB + Vue.js + ElementUI进行开发。
主要锻炼自己的实践能力

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

![Snipaste_2021-06-21_09-32-09](https://user-images.githubusercontent.com/47491277/122695670-b7b38680-d273-11eb-8799-7f1d6585b2b5.gif)
![image](https://user-images.githubusercontent.com/47491277/122695762-f6e1d780-d273-11eb-980b-4d67a30c1858.png)

主要功能：
1. 日记管理
   富文本编辑器vue-quill-editor 编辑日记。
   使用富文本编辑器与Element上传组件共同完成编辑器中文件上传。
   编辑与删除使用弹出框与确认框优化用户体验。
2. 日记本管理。
   表格组件进行管理，一个弹出框增删改查全都有！
   ![image](https://user-images.githubusercontent.com/47491277/122695796-08c37a80-d274-11eb-9c20-403f5e6d6c4a.png)

3. 任务清单管理
   ![image](https://user-images.githubusercontent.com/47491277/122695834-25f84900-d274-11eb-8ed6-a622cfaeff03.png)

4. 用户管理
   主要为登录与个人资料修改，登录使用token认证，密码加密，资料修改上传头像与写日记文件上传逻辑相同。
   ![image](https://user-images.githubusercontent.com/47491277/122695895-49bb8f00-d274-11eb-850f-edbfc86d2168.png)

5. 日记小组件
   在日历列表上显示本月写过日记的天数，点击查看当天日记，感觉这个组件做成待办事项或者备忘录也不错，有待研究。
   ![image](https://user-images.githubusercontent.com/47491277/122695861-34466500-d274-11eb-8b0e-681475bc14cf.png)
   
6. 统计功能
   尝试了使用ECharts进行统计
   ![image](https://user-images.githubusercontent.com/47491277/122695978-7ff90e80-d274-11eb-80d0-6ff7a9aa164e.png)

   

