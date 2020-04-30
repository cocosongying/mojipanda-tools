<template>
  <div id="tool" class="container" style="width:80%">
    <br />
    <br />
    <v-breadcrumb>
      <v-breadcrumb-item>
        <a href="/">磨叽熊猫</a>
      </v-breadcrumb-item>
      <v-breadcrumb-item>
        <a href="/tools">工具</a>
      </v-breadcrumb-item>
      <v-breadcrumb-item>头像戴口罩</v-breadcrumb-item>
    </v-breadcrumb>
    <br />
    <v-alert type="info" message="说明" description="请先选择图片，再选择口罩样式，在预览区域调整口罩位置、角度、缩放大小等，最后点击下载按钮即可"></v-alert>
    <br />
    <v-card title="头像戴口罩">
      <span>选择图片</span>
      <br />
      <br />
      <input type="file" ref="fileUp" @change="getFile" accept="image/*" style="display: none;" />
      <div class="input-group" @click="choiceImg">
        <v-input
          type="text"
          class="form-control"
          style="background-color:#fff; width: 90%"
          :value="fileName"
          readonly
        ></v-input>
        <span>
          <i class="fa fa-folder-open"></i>
        </span>
      </div>
      <br />
      <span>选择样式</span>
      <br />
      <br />

      <div class="radio" @change="choiceMask">
        <span v-for="(info, index) in masks" :key="index">
          <v-radio v-model="maskStyle" :value="index" style="text-align: center" :label="index">
            <img :src="maskBasic+info.name" width="56px" />
          </v-radio>
        </span>
      </div>
    </v-card>
    <br />
    <v-card title="预览" v-show="fileName!=''">
      <div>
        <canvas id="headCanvas"></canvas>
      </div>
      <div slot="extra">
        <v-button type="primary" @click="downloadImg">下载</v-button>
      </div>
    </v-card>
  </div>
</template>

<script>
import { fabric } from "fabric";
export default {
  data() {
    const canvas = new fabric.Canvas("headCanvas");
    const masks = [
      { name: "00.png" },
      { name: "01.png" },
      { name: "02.png" },
      { name: "03.png" },
      { name: "04.png" },
      { name: "05.png" },
      { name: "06.png" },
      { name: "07.png" }
    ];
    return {
      fileName: "",
      maskBasic: "static/img/mask/",
      maskStyle: 0,
      imgSize: 240,
      masks,
      canvas
    };
  },
  mounted() {
    this.canvas = new fabric.Canvas("headCanvas");
  },
  methods: {
    // 文件选择控件的 click 事件绑定到自定义的文本输入控件
    choiceImg: function() {
      this.$refs.fileUp.dispatchEvent(new MouseEvent("click"));
    },
    // 选择口罩样式
    choiceMask: function() {
      let _this = this;
      // 当前已有打开的图片时
      if (_this.fileName) {
        // 检查 canvas 是否已有元素, 如果已有需要先删除再重新添加新的元素
        let ele = _this.canvas.item(0);
        if (ele) {
          _this.canvas.remove(ele);
        }
        // 加载选择的口罩样式
        fabric.Image.fromURL(
          _this.maskBasic + _this.masks[_this.maskStyle].name,
          function(img) {
            // 设置图片大小
            let scale =
              img.width > img.height
                ? _this.imgSize / img.width
                : _this.imgSize / img.height;
            scale *= 0.5;
            // 设置图片位置居中
            let left = (_this.imgSize - img.width * scale) / 2;
            img.scale(scale).set({ left: left, top: 10 });
            // 添加图片到 canvas
            _this.canvas.add(img).setActiveObject(img);
          }
        );
      }
    },
    // 下载图片
    downloadImg: function() {
      const type = "image/png";
      const url = this.canvas.toDataURL(type, 1.0);
      const link = document.createElement("a");
      const name = "mask" + Date.now() + ".png";
      link.download = name;
      link.href = url;
      link.dataset.downloadurl = [type, link.download, link.href].join(":");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    // 打开图片文件
    getFile: function(event) {
      let _this = this;
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(f) {
        let data = f.target.result;
        fabric.Image.fromURL(data, function(img) {
          // 设置图片大小
          let scale =
            img.width > img.height
              ? _this.imgSize / img.width
              : _this.imgSize / img.height;
          // 将图片设置为 canvas 的背景图片
          _this.canvas.setBackgroundImage(
            img,
            _this.canvas.renderAll.bind(_this.canvas),
            {
              scaleX: scale,
              scaleY: scale
            }
          );
          _this.canvas.setWidth(img.width * scale);
          _this.canvas.setHeight(img.height * scale);
        });
      };
      // 图片加载完成，将选中的口罩样式添加到图片上
      reader.onloadend = function() {
        _this.choiceMask();
      };
      this.fileName = file.name;
    }
  }
};
</script>