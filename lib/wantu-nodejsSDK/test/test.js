'use strict';

var WANTU = require('..');
var should = require('should');
var assert = require("assert");

var wantu = new WANTU('*AK*','*SK*');  //填入ak，sk
var namespace = "***";   //填写空间名

var id, uploadId;

describe('REST API', function(){

    describe('multiUploadInit', function(){
        it('shoule return 200', function(done){
            wantu.multiUploadInit({
                namespace : namespace,
                expiration : -1
            },'bigImg.jpg','/','','',2048,function(err,res){
                var result = JSON.parse(res.data);
                id = result.id;
                uploadId = result.uploadId;
                result.should.have.property('id');
                result.should.have.property('uploadId');
                done();
            })
        })
    });

    //测试取消上传
    describe('cancelMultiUpload', function(){
        it('shoule return 200', function(done){
            wantu.cancelMultiUpload({
                namespace : namespace,
                expiration : -1
            }, id, uploadId,function(err,res){
                should(res).have.property('statusCode', '200');
                done();
            })
        })
    });

    describe('singleUpload', function(){
        it('shoule return 200', function(done){
            wantu.singleUpload({
                namespace : namespace,
                expiration : -1
            },'./nodejstest.png','/','','',function(err,res){
                should(res).have.property('statusCode', '200');
                done();
            })
        })
    });

    describe('existFile', function(){
        it('shoule return 200', function(done){
            wantu.existFile(namespace,'/',"nodejstest.png",function(err,res){
                should(res).have.property('statusCode', '200');
                JSON.parse(res.data).should.have.property('exist');
                done();
            })
        })
    });

    describe('getFile', function(){
        it('shoule return 200', function(done){
            wantu.getFile(namespace,'/',"nodejstest.png",function(err,res){
                should(res).have.property('statusCode', '200');
                done();
            })
        })
    });

    describe('delFile', function(){
        it('shoule return 200', function(done){
            wantu.delFile(namespace,'/',"nodejstest.png",function(err,res){
                should(res).have.property('statusCode', '200');
                done();
            })
        })
    });


    describe('listFile', function(){
        it('shoule return obj with result, totalCount and totalPage', function(done){
            wantu.listFiles(namespace,'/',1,10,function(err,res){
                var result = JSON.parse(res.data);
                result.should.have.property('result');
                result.should.have.property('totalCount');
                result.should.have.property('totalPage');
                done();
            })
        })
    });

    describe('createDir', function(){
        it('shoule return 200', function(done){
            wantu.createDir(namespace,'/nodejstest',function(err,res){
                should(res).have.property('statusCode', '200');
                done();
            })
        })
    });

    describe('existDir', function(){
        it('shoule return 200', function(done){
            wantu.existDir(namespace,'/nodejstest',function(err,res){
                should(res).have.property('statusCode', '200');
                done();
            })
        })
    });

    describe('delDir', function(){
        it('shoule return 200', function(done){
            wantu.delDir(namespace,'/nodejstest',function(err,res){
                should(res).have.property('statusCode', '200');
                done();
            })
        })
    });

    describe('listDirs', function(){
        it('shoule return obj with result, totalCount and totalPage', function(done){
            wantu.listDirs(namespace,'/',1,10,function(err,res){
                var result = JSON.parse(res.data);
                result.should.have.property('result');
                result.should.have.property('totalCount');
                result.should.have.property('totalPage');
                done();
            })
        })
    });

    //上传一个mp4文件，为了测试持久化任务
    describe('singleUpload', function(){
        it('shoule return 200', function(done){
            wantu.singleUpload({
                namespace : namespace,
                expiration : -1
            },'22.mp4','/','','',function(err,res){
                should(res).have.property('statusCode', '200');
                done();
            })
        })
    });

    var persistentId;

    describe('addPts', function(){
        it('shoule return resourceId', function(done){
            wantu.addPts(namespace,'/','22.mp4','avEncode/encodePreset/Fvideo-HLS-150K','', 0, function(err,res){
                var result = JSON.parse(res.data);
                result.should.have.property('persistentId');
                persistentId = result.persistentId;
                done();
            })
        })
    });

    describe('getPts', function(){
        it('shoule return resourceId', function(done){
            wantu.getPts(persistentId, function(err,res){
                var result = JSON.parse(res.data);
                result.should.have.property('id',persistentId);
                done();
            })
        })
    });
});

/*// 分片上传（完整过程）没有写mocha测试。可以直接nodejs跑一下
wantu.multiUpload({
    namespace : namespace,
    expiration : -1
},'./bigImg.jpg','/','','','',function(err,res){
    console.log(err);
    console.log(res);
});*/

