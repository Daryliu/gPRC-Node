# gPRC-Node
gRPC在node上的测试

gRPC的理念：
定义一个服务，指定其能够被远程调用的方法（包含参数和返回类型）。在服务端实现这个接口，并运行一个 GRPC 服务器来处理客户端调用。在客户端就能拥有一个像服务端一样的方法。
---

<h2><font color = "blue">实现步骤:</font></h2>
1、编写proto文件，定义服务
2、编译proto文件，生成代码
3、编写服务端代码
    1、server.js代码
    2、编译
4、编写客户端代码
    1、client.js代码
5、测试

代理配置并运行localhost:5005测试
grpcwebproxy --allow_all_origins --backend_addr=localhost:50051 --run_tls_server=false --server_http_debug_port=5005