<template>
  <div id="push_index" v-loading="loading">
    <el-form :model="pushInfo" :rules="rules" ref="platform" label-width="100px">
      <el-form-item label="选择平台:" prop="platform">
        <el-select style="width:300px" v-model="pushInfo.platform" filterable>
          <el-option
            v-for="(item) in platformList"
            :key="item.id"
            :label="item.corpName"
            :value="item.corpId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提醒标题:" prop="remind">
        <el-input v-model="pushInfo.remind" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="提醒类型:" prop="type">
        <el-input v-model="pushInfo.type" maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="提醒内容:" prop="remindContent">
        <el-input
          v-model="pushInfo.remindContent"
          style="width:300px"
          type="textarea"
          maxlength="100"
          :autosize="{ minRows: 3, maxRows: 6}"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="上传图片:">
        <div>
          <input type="button" @click="onUploadClick" id="btn" value="选择文件" />
          <span id="text">{{fileName}}</span>
          <input
            ref="fileToUpload"
            type="file"
            accept=".png, .jpg;"
            id="fileinp"
            @change="fileSelected()"
          />
        </div>
        <!-- <input type="file" ref="fileToUpload" id="fileToUpload" @change="fileSelected()" /> -->
      </el-form-item>
      <el-form-item>
        <el-button style="width:200px" type="goon" @click="push">确&nbsp;&nbsp;定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pushInfo: {
        platform: "",
        remind: "",
        type: "",
        remindContent: "",
      },

      rules: {
        platform: [{ required: true, message: "请选择平台", trigger: "blur" }],
        remind: [{ required: true, message: "请输入提醒", trigger: "blur" }],
        type: [{ required: true, message: "请输入提醒类型", trigger: "blur" }],
        remindContent: [
          { required: true, message: "请输入内容", trigger: "blur" },
        ],
      },
      platformList: [],
      file: "",
      fileName: "",
      loading: false,
    };
  },
  mounted() {
    this.getPlatformList();
  },
  methods: {
    //获取平台列表
    getPlatformList() {
      this.$api.getPlatform().then((res) => {
        this.platformList = res.data.data;
        console.log("platres", res);
      });
    },
    onUploadClick() {
      this.$refs.fileToUpload.click();
    },
    fileSelected() {
      //   let file = document.getElementById('fileToUpload').files[0];
      let file = this.$refs.fileToUpload.files[0];
      console.log(file);
      if (file) {
        let type = file.name.substr(file.name.lastIndexOf(".")).toLowerCase();
        if (type !== ".png" && type !== ".jpg") {
          alert("需要 png jpg 格式");
          return false;
        }
        if (file.size > 1024 * 1024 * 3) {
          alert("图片不能大于3Mb");
        } else {
          let name = file.name;
          if (file.name.length > 6) {
            name = file.name.substr(0, 6) + "...";
          }
          this.fileName = name;
          this.file = file;
        }
      }
    },
    push() {
      if (this.pushInfo.platform == "" || this.pushInfo.platform == undefined) {
        alert("请先选择平台");
        return false;
      }
      if (this.file == "" || this.file == undefined) {
        alert("请先选择文件");
        return false;
      }
      let fd = new FormData();
      fd.append("warnContent", this.pushInfo.remindContent);
      fd.append("corpId", this.pushInfo.platform);
      fd.append("subTilteName", this.pushInfo.remind);
      fd.append("warnTypeValue", this.pushInfo.type);
      fd.append("file", this.file);
      // return

      //   let param = {
      //     warnContent: this.remindContent,
      //     corpId: this.platform,
      //     subTilteName: this.remind,
      //     warnTypeValue: this.type,
      //     file: this.file,
      //   };
      this.loading = true;
      this.$api
        .push(fd)
        .then((res) => {
          const { data } = res;
          if (data.code == 200) {
            this.$message({
              message: "推送成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "推送失败",
              type: "error",
            });
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.$message({
            message: "网络错误",
            type: "error",
          });
        });
    },
  },
};
</script>

<style scoped>
#push_index {
  box-shadow: 0 0 9px 3px #999;
  width: 450px;
  padding: 60px;
  margin: 0 auto;
}
.el-input {
  width: 300px;
}
#fileinp {
  display: none;
}
#btn {
  cursor: pointer;
  padding: 5px 10px;
  background: #fff;
  color: #eea931;
  border: solid 1px #eea931;
  border-radius: 5px;
  height: 31px;
  width: 81px;
}
</style>