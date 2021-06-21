<template>
  <div id="edit">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="edit-form">
      <el-form-item label="今日心情" prop="mood">
        <el-rate
          class="edit-rate"
          v-model="form.mood"
          :icon-classes="iconClasses"
          void-icon-class="icon-rate-face-off"
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate>
      </el-form-item>
      <el-form-item label="日记标题" style="display: inline-block" prop="title">
        <el-input v-model="form.title" maxlength="50" show-word-limit style="width: 720px"></el-input>
      </el-form-item>
      <el-form-item label="日记属性" style="text-align: left">
        <el-col :span="11">
          <el-select v-model="form.diaryBook" placeholder="请选择日记本">
            <el-option 
              v-for="book in diaryBooks" 
              :key="book.name" 
              :label="book.name"
              :value="book.name">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="11">
          <el-select v-model="form.viewLimit" placeholder="请选择查看权限">
            <el-option label="仅自己可见" value="1"></el-option>
            <el-option label="开放" value="2"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="日记内容" style="height: 600px" prop="content">
        <!-- <editor></editor> -->
        <div class="editor-box">
          <quill-editor 
            class="editor"
            ref="myTextEditor"
            v-model="form.content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            @change="onEditorChange($event)">
          </quill-editor>
        </div>
        <el-upload
          class="upload-demo"
          action="/api/upload"
          :show-file-list="false"
          :http-request="upload"
        >
          <el-button >点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item style="margin-top:30px">
        <el-button type="primary" @click="formCheck" v-if="!this.isEdit">添加日记</el-button>
        <el-button type="primary" @click="editDiary" v-if="this.isEdit">修改日记</el-button>
        <el-button @click="showPreview = true" plain class="preView-btn">预览</el-button>
        <el-button @click="this.$router.push('/')">取消</el-button>
      </el-form-item>
    </el-form>

    <!-- 日记预览 -->
    <el-dialog
      title="日记预览"
      :visible.sync="showPreview"
      width="50"
      center>
      <!-- <span>需要注意的是内容是默认不居中的</span> -->
      <div class="preview" v-html="content"></div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="showPreview = false">取 消</el-button> -->
        <el-button type="primary" @click="showPreview = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 敏感词提示 -->
    <el-dialog
      title="提示"
      :visible.sync="showBadWordTip"
      width="30%"
      center>
      <span>您的日记中含有违规词汇，已使用 * 代替，是否继续提交？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDiary">确 定</el-button>
        <el-button @click="showBadWordTip = false">去修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {dateFormat} from '../untils/untils.js'
import { addDiary, editDiary, getDiaryBooks,delPicture } from '@/api/api.js'
import axios from 'axios'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { getBadWord } from '@/untils/badword.js'
import { addQuillTitle } from '@/untils/quill-title.js'
// 富文本编辑器工具栏
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["link", "image"] // 链接、图片、视频
]

// 获取编辑器中要移除的图片名称数组
const getRemovImgId = (ids, html) => {
  let dom = document.createElement('DIV')
  dom.innerHTML = html
  const imgDom = dom.getElementsByTagName('img')
  // const url = window.location.host
  let arr = []
  if(imgDom != []) {
    console.log('no empty')
    for(let i = 0; i < ids.length; i++){
      var flag = false
      var src = 'http://localhost:8080/api/diaryUpload/' + ids[i]
      for(let j = 0; j < imgDom.length; j++){
        console.log(src)
        console.log(imgDom[j].src)
        if(src == imgDom[j].src) flag = true
      }
      console.log(flag)
      if(!flag) {
        arr.push(ids[i])
      }
    }
  }
  else arr = ids
  return arr
}



export default {
  props: ['diary'],
  components: {
  },
  data() {
    return {
      // diaryBooks: this.$route.params.diaryBooks,
      diaryBooks: [],
      showBadWordTip: false,
      dialogImageUrl: '',
      isEdit: false,
      dialogVisible: false,
      disabled: false,
      pictureIds: [],
      emptyForm: {
        title: '',
        content: null,
        mood: null,
        diaryBook: '默认笔记本',
        viewLimit: '1'
      },
      form: {
        title: '',
        content: null,
        mood: null,
        diaryBook: '默认笔记本',
        viewLimit: '1'
      },
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'], // 等同于 { 2: 'icon-rate-face-1', 4: { value: 'icon-rate-face-2', excluded: true }, 5: 'icon-rate-face-3' }
      rules: {
          title: [
            { required: true, message: '请输入日记标题', trigger: 'blur' }
          ],
          mood: [
            { required: true, message: '请选择心情指数', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入日记内容', trigger: 'blur' }
          ]
      },
      content: null,
      showPreview: false,
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              'image': function (value) {
                if (value) {
                  document.querySelector('.el-upload .el-button').click()
                } else {
                  this.quill.format('image', false);
                }
              }
            }
          } //工具菜单栏配置
        },
        placeholder: '请在这里撰写日记内容', //提示
        readyOnly: false, //是否只读
        theme: 'snow', //主题 snow/bubble
        syntax: true, //语法检测
      }
    };
  },
  mounted() {
    addQuillTitle()
    getDiaryBooks().then(res => {
        this.diaryBooks = res.data.result.diaryBooks
      })
      .catch(function (error) {
        console.log(error)
      })
      if(this.diary){
        this.form = this.$route.params.diary
        this.isEdit = true
      }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file)
    },
    beforeUpload(file){
        const isLt = file.size/1024/1024
        const isJPG = file.type=='image/jepg'
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (isLt > 4) {
          this.$message.error('上传头像图片大小不能超过 4MB!')
        }
        return isLt&&usJPG;//以此让组件判断是否发起请求
     },
    onSuccess(res) {
      console.log(res)
    },
    formCheck() {
      let removeIds = getRemovImgId(this.pictureIds, this.form.content)
      // console.log(this.pictureIds)
      // console.log(removeIds)
      if(removeIds.length != 0) {
        console.log('执行delpicture')
        delPicture({ids: removeIds}).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
      this.$refs['form'].validate((valid => {
        if(valid){
          let isHaveBad = false
          // 获取敏感词汇
          let badWord = getBadWord()
          for(var i = 0; i < badWord.length; i++) {
            var r = new RegExp(badWord[i], "ig")
            // 利用标志位判断是否含有敏感词汇
            if(r.test(this.form.content)) {
              isHaveBad = true
              this.form.content = this.form.content.replace(r, '*')
            }
            if(r.test(this.form.title)) {
              isHaveBad = true
              this.form.title = this.form.title.replace(r, '*')
            }
          }
          if(isHaveBad) {
            this.showBadWordTip = true
          } else {
            this.submitDiary()
          }
        }
      }))
    },
    // 提交日记到数据库
    submitDiary() {
      var that = this
      var params = {
        'title': that.form.title,
        'content': that.form.content,
        'mood': that.form.mood,
        'diaryBook': that.form.diaryBook,
        'viewLimit': that.form.viewLimit,
        'userId': localStorage.getItem('userId'),
        'createTime': dateFormat('YYYY/mm/dd HH:MM', new Date())
      }
      addDiary(params).then(res => {
        that.$message({
          message: '创建成功',
          type: 'success'
        })
        this.$router.push('/home')
      })
    },
    // 修改日记
    editDiary() {
      editDiary(this.form).then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$router.push('/home')
      }).catch(err => {
        console.log(err)
      })
    },
    // 富文本
    // 失去焦点
    onEditorBlur(editor) {},
    // 获得焦点
    onEditorFocus(editor) {},
    // 开始
    onEditorReady(editor) {},
    // 值发生变化
    onEditorChange(editor) {
      this.content = editor.html
      // console.log(editor.html)
      // console.log(editor.text)
    },
    // element组件上传成功后返回图片地址在富文本编辑器中显示
    upload(f){
      let quill = this.$refs.myTextEditor.quill
      let length = quill.getSelection().index

      let formData = new FormData()
      formData.append('file', f.file)

      axios.post('/api/diary/upload', formData, {
        headers:{
          "content-type": 'multipart/form-data',
          'Authorization': localStorage.getItem('Authorization') || ''
        }
      }).then(res => {
        console.log(res)
        this.pictureIds.push(res.data.result.name)
        // 插入图片
        let path = '/api/diaryUpload/' + res.data.result.name
        quill.insertEmbed(length, 'image', path)
        // 调整光标到最后
        quill.setSelection(length + 1)
      })
    }
  }
}
</script>

<style lang="less">
#edit {
  width: 900px;
  margin: 0 auto;
  padding: 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
#edit .el-upload {
    display: none;
}
#edit .preview {
  width: 100%;
  overflow: auto;
}
.edit-form {
  width: 800px;
  margin: 0 auto;
}
.edit-form .el-select {
  width: 300px;
}
.editor {
  height: 500px;
}
.edit-rate {
  margin-top: 10px;
  text-align: left;
}
</style>
