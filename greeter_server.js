var path = require("path");
var grpc = require('grpc');
var protoLoader = require("@grpc/proto-loader");

// var PROTO_PATH = __dirname + '/protos/Helloworld.proto';
var PROTO_PATH = path.resolve(__dirname,'protos/Helloworld.proto');//根据proto文件实际所在位置设置路径

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;     //输出传递到gRPC库的方法中



// 服务器的启动方法
/*
1、通过 proto文件的 Greeter 服务描述符创建一个 Server 构造函数。
2、实现服务的方法。
3、通过调用 Server 的构造函数以及方法实现去创建一个服务器的实例。
4、用实例的 bind() 方法指定地址以及我们期望客户端请求监听的端口。
5、调用实例的 start() 方法启动一个RPC服务器。
*/

function sayHello(call,callback) {       // sayHello的实现，调用call.request为protobuf文件的请求体，将返回体通过callback函数回传至客户端
    try {
        let data = "hello " +call.request.name + " and city is " + call.request.city;

        callback(null,{ message: data });
    }catch(err) {
        console.log("Error");
    }
}

function printUniversity(call,callback) {
    try {
        let cug = "University is" + call.request.university;
        callback(null,{ message: cug });
    }catch(err) {
        console.log("Error");
    }
}

function main() {
    var server = new grpc.Server();     //服务器具有一个由Greeter.service描述符对象生成的Server构造函数。
    server.addService(hello_proto.Greeter.service,{    //这一步实现与proto文件中的服务方法一一映射,并在本文件中一一实现对应的方法
        sayHello:sayHello,
        printUniversity:printUniversity    
    });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main();
