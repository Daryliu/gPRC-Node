var path = require("path");
var grpc = require('grpc');
var protoLoader = require("@grpc/proto-loader");

// var PROTO_PATH = __dirname + '/protos/Helloworld.proto';
var PROTO_PATH = path.resolve(__dirname,'protos/Helloworld.proto');

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

//输出传递到gRPC库的方法中
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
    console.log("client start...");

    // 调用 Greeter 的存根构造函数，指定服务器地址和端口
    var client = new hello_proto.Greeter(
        "localhost:50051", grpc.credentials.createInsecure()
    );

    // 调用存根上的方法，传入请求和回调函数
    client.sayHello({ name: "ldy", city: "武汉" }, function (err, response) {
        console.log("Greeting: ", response.message);
    });

    client.printUniversity({ university: "中国地质大学" }, function (err, response) {
        console.log("University: ", response.text);
    });
}

main();