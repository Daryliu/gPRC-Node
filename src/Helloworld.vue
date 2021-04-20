<template>
  <div class="home">{{ message }}
      <!-- <div class="text">{{ text }}</div> -->
  </div>
  
</template>

<script>
import * as GreeterGRPC from "@/protos/Helloworld_grpc_web_pb.js";

export default {
  name: "Home",
  data() {
    return {
      message: ""
      // text: "",
    };
  },
  methods: {
    // 获取消息（使用async await）
    async getMessage() {
      let client = new GreeterGRPC.GreeterPromiseClient("http://localhost:5005"); // 建议http连接

      let helloRequest = new GreeterGRPC.HelloRequest();
      helloRequest.setName("ldy");
      helloRequest.setCity("武汉");
      // let metadata = { token: "111111" }; //设置请求头
      let sayHelloResponse = await client.sayHello(helloRequest, {});
      let result = sayHelloResponse.toObject();

      this.message = result.message;
    }
    // async getText() {
    //   let client = new GreeterGRPC.GreeterPromiseClient(
    //     "http://localhost:5005"
    //   ); // 建议http连接
    //   let uRequest = new GreeterGRPC.printUniversityRequest();
    //   uRequest.setUniversity("中国地质大学");
    //   let printUniversityResponse = await client.printUniversity(uRequest, {});
    //   let result = printUniversityResponse.toObject();

    //   this.text = result.text;
    // },
  },
  mounted() {
    this.getMessage();
    // this.getText();
  },
};
</script>
