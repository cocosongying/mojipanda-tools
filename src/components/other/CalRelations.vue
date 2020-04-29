<template>
  <div id="tool" class="container" style="width:80%">
    <br />
    <v-alert
      type="info"
      message="说明"
      description="多条结果表示称呼的结果有多个, 算法使用开源项目 https://github.com/mumuy/relationship "
    ></v-alert>
    <br />
    <v-card title="亲戚关系计算器">
      <v-tabs active-tab-key="default" @change="tabOnChange">
        <v-tab-pane tab-key="default" tab="计算称呼">
          <v-radio v-model="reverse" label="0">我称呼对方</v-radio>
          <v-radio v-model="reverse" label="1">对方称呼我</v-radio>
          <br />
          <br />
          <v-radio v-model="sex" label="0">我是个女的</v-radio>
          <v-radio v-model="sex" label="1">我是个男的</v-radio>
          <br />
          <br />
          <v-input v-model="content"></v-input>
          <br />
          <br />
          <v-button-group>
            <v-button @click="data.push('爸爸')">父</v-button>
            <v-button @click="data.push('妈妈')">母</v-button>
          </v-button-group>
          <v-button-group>
            <v-button @click="data.push('老公')">夫</v-button>
            <v-button @click="data.push('老婆')">妻</v-button>
          </v-button-group>
          <v-button-group>
            <v-button @click="data.push('儿子')">子</v-button>
            <v-button @click="data.push('女儿')">女</v-button>
          </v-button-group>
          <v-button-group>
            <v-button @click="data.push('哥哥')">兄</v-button>
            <v-button @click="data.push('弟弟')">弟</v-button>
          </v-button-group>
          <v-button-group>
            <v-button @click="data.push('姐姐')">姐</v-button>
            <v-button @click="data.push('妹妹')">妹</v-button>
          </v-button-group>
          <v-button-group>
            <v-button type="error" @click="data.pop()">
              <i class="fa fa-long-arrow-alt-left"></i>
            </v-button>
            <v-button type="error" @click="data=[]">
              <i class="fa fa-trash"></i>
            </v-button>
          </v-button-group>
        </v-tab-pane>
        <v-tab-pane tab-key="chain" tab="计算关系">
          <v-radio v-model="sex" label="0">我是个女的</v-radio>
          <v-radio v-model="sex" label="1">我是个男的</v-radio>
          <br />
          <br />
          <v-input v-model="chain"></v-input>
        </v-tab-pane>
      </v-tabs>
    </v-card>
    <br />
    <v-card title="计算结果">
      <span>{{ result }}</span>
    </v-card>
    <Footer />
  </div>
</template>

<script>
import relationship from "relationship.js";
import Footer from "@/components/base/Footer.vue";
export default {
  data() {
    return {
      data: [],
      sex: "0",
      type: "default",
      reverse: "0",
      chain: ""
    };
  },
  components: {
    Footer
  },
  methods: {
    tabOnChange(tabKey) {
      this.type = tabKey;
    }
  },
  computed: {
    content: {
      set(val) {
        if (!val) {
          this.data = [];
          return false;
        }
        this.data = val.split("的");
      },
      get() {
        return this.data.join("的");
      }
    },
    result() {
      let text = this.type === "default" ? this.content : this.chain;
      if (!text) {
        return " ";
      }
      const options = {
        text: text,
        sex: parseInt(this.sex),
        type: this.type,
        reverse: parseInt(this.reverse)
      };
      const res = relationship(options);
      if (res.length) {
        return res.join("\n");
      } else {
        return "Sorry，我没有计算出来哦～";
      }
    }
  }
};
</script>