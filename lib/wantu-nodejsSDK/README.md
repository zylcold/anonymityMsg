# Nodejs SDK 

# 1、开通服务 

开通服务，创建空间用于文件存储，参考 [接入指引](http://baichuan.taobao.com/portal/doc?articleId=316)

# 2、SDK下载 

通过 [控制台](http://wantu.taobao.com/mediabase/space/index.htm) 进入 SDK 下载页面，下载 Nodejs SDK （含测试Demo）

![](http://imagedemo.image.alimmdn.com/doc/Nodejs%20SDK/sdk.JPG?t)

# 3、运行测试 Demo


测试Demo位于SDK压缩包的test目录下，在test.js填入开发者自己的AK、SK和namespace 后，运行（mocha test.js）即可。

    var wantu = new WANTU('*AK*','*SK*');  //填入ak，sk
    var namespace = "***";   //填写空间名

**如何获取 AK 和 SK?**
进入[控制台](http://wantu.taobao.com/mediabase/space/index.htm) 操作路径为：我的百川 -> 百川秘钥，如图示：

![](http://imagedemo.image.alimmdn.com/doc/Nodejs%20SDK/key.jpg?t)

# 4、初始化(Init)

var wantu = new WANTU(AK,SK);  
 
入参：

* AK：秘钥，获取方式如上图所示
* SK：秘钥，获取方式如上图所示

# 5、API

* [delFile](#delFile)
* [existFile](#existFile) 
* [getFile](#getFile)
* [listFiles](#listFiles)
* [createDir](#createDir)
* [delDir](#delDir)
* [existDir](#existDir)
* [listDirs](#listDirs)
* [addPts](#addPts)
* [getPts](#getPts)
* [singleUpload](#singleUpload)
* [multiUpload](#multiUpload)
* [multiUploadInit](#multiUploadInit)
* [multiUploadBlock](#multiUploadBlock)
* [multiUploadComplete](#multiUploadComplete)
* [cancelMultiUpload](#cancelMultiUpload)

## 5.1 API 调用方法

    wantu.delFile(..., function(err, res){});

其中回调函数的入参：

* err 错误信息
 
* res
    {
      statusCode：请求返回的状态码， 200为成功 ;
      headers：请求返回头信息 ;
      data：请求返回数据 ;
    }


### <a name="delFile"></a>delFile(namespace, dir, file, callback)

删除文件

入参：

* namespace 必填，命名空间
* dir 必填，文件所在文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
* file 必填，文件名称
* callback 必填，回调

### <a name="existFile"></a>existFile(namespace, dir, file, callback)

文件是否存在

入参：

* namespace 必填，命名空间
* dir 必填，文件所在文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
* file 必填，文件名称
* callback 必填，回调

### <a name="getFile"></a>getFile(namespace, dir, file, callback)

获取文件meta

入参：

* namespace 必填，命名空间
* dir 必填，文件所在文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
* file 必填，文件名称
* callback 必填，回调

### <a name="listFiles"></a>listFiles(namespace, dir, currentPage, pageSize, callback)

获取文件列表

入参：

* namespace 必填，命名空间
* dir 必填，文件所在文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
* currentPage 必填，当前页码，从1开始
* pageSize 必填，当前页内文件个数，最大100
* callback 必填，回调

请求返回数据：

    {
        totalCount: 总数
        totalPage: 页数
        result: [
            {
                namespace: “名称空间”
                name: “文件名”
                path: “文件全路径”
                dir: “文件全路径”
                createStamp: “创建时间”
                modifyStamp “最后修改时间”
                md5: “文件md5信息”
                mineType: “文件元类型”
                size: “文件大小”
                url: “文件访问url”
            },
            …
        ]
    }

### <a name="createDir"></a>createDir(namespace, dir, callback)

创建文件夹

入参：

* namespace 必填，命名空间
* dir 必填，文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
* callback 必填，回调

### <a name="delDir"></a>delDir(namespace, dir, callback)

删除文件夹

入参：

* namespace 必填，命名空间
* dir 必填，文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
* callback 必填，回调

### <a name="existDir"></a>existDir(namespace, dir, callback)

文件夹是否存在

入参：

* namespace 必填，命名空间
* dir 必填，文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
* callback 必填，回调

### <a name="listDirs"></a>listDirs(namespace, dir, currentPage, pageSize, callback)

获取子文件夹列表

入参：

* namespace 必填，命名空间
* dir 必填，文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
* currentPage 必填，当前页码，从1开始
* pageSize 必填，当前页内文件个数，最大100
* callback 必填，回调

请求返回数据：

    {
        totalCount: 总数
        totalPage: 页数
        result: [
            {
                namespace: “名称空间”
                name: “目录名”
                path: “目录全路径”
                createStamp: “创建时间”
                modifyStamp “最后修改时间”
            },
            …
        ]
    }

### <a name="addPts"></a>addPts(namespace, dir, file, fops, notifyURL, force, callback)

新建持久化任务

入参：

* namespace 必填，命名空间
* dir 必填，文件所在文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
* file 必填，文件名称
* fops 必填，持久化操作参数,
* notifyURL 必填，处理结果通知接收URL
* force 必填，0为不覆盖转换，1为强制覆盖转换
* callback 必填，回调

请求返回数据：

    {persistentId: "任务Id"}

### <a name="getPts"></a>getPts(persistentId, callback)

持久化任务查询

入参：

* persistentId 必填，任务id
* callback 必填，回调


### <a name="singleUpload"></a>singleUpload(uploadPolicy, filePath, dir, meta, _var, callback)

普通上传

入参：

* uploadPolicy 必填，上传策略，json格式，具体参见[API说明文档](http://baichuan.taobao.com/portal/doc?articleId=318#ss0)
* filepath 必填，本地文件路径
* dir 必填，上传到文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
* meta 必填，用户自定义的文件meta信息，没有为""
* _var 必填，魔法变量，没有为""
* callback 必填，回调

### <a name="multiUpload"></a>multiUpload(uploadPolicy, filePath, dir, meta, _var, chunkSize, callback)

分片上传（完整过程，自动完成分片上传初始化，上传分片块以及完成上传，每次请求返回都会回调callback）

入参：

* uploadPolicy 必填，上传策略，json格式，具体参见[API说明文档](http://baichuan.taobao.com/portal/doc?articleId=318#ss0)
* filepath 必填，本地文件路径
* dir 必填，上传到文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
* meta 必填，用户自定义的文件meta信息，没有为""
* _var 必填，魔法变量，没有为""
* chunkSize 必填，分片大小，默认是4MB
* callback 必填，回调


### <a name="multiUploadInit"></a>multiUploadInit(uploadPolicy, filePath, dir, meta, _var, curChunkSize, callback)

初始化分片上传（将上传第一个分片块）

入参：

* uploadPolicy 必填，上传策略，json格式，具体参见[API说明文档](http://baichuan.taobao.com/portal/doc?articleId=318#ss0)
* filepath 必填，本地文件路径
* dir 必填，上传到文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
* meta 必填，用户自定义的文件meta信息，没有为""
* _var 必填，魔法变量，没有为""
* curChunkSize 必填，当前分片大小
* callback 必填，回调


### <a name="multiUploadBlock"></a>multiUploadBlock(uploadPolicy, filePath, id, uploadId, partNumber, chunkStart, curChunkSize, callback)

上传分片

入参：

* uploadPolicy 必填，上传策略，json格式，具体参见[API说明文档](http://baichuan.taobao.com/portal/doc?articleId=318#ss0)
* filepath 必填，本地文件路径
* id 必填，上传唯一id，由初始化分片上传返回
* uploadId 必填，分片上传Id，由初始化分片上传返回
* partNumber 必填，当前分片编号，分片编号从1开始（注意初始化请求已经上传了第一块）
* chunkStart 必填， 当前分片开始位置
* curChunkSize 必填，当前分片大小
* callback 必填，回调


### <a name="multiUploadComplete"></a>multiUploadComplete(uploadPolicy, filePath, id, uploadId, eTags, callback)

完成上传分片

入参：

* uploadPolicy 必填，上传策略，json格式，具体参见[API说明文档](http://baichuan.taobao.com/portal/doc?articleId=318#ss0)
* filepath 必填，本地文件路径
* id 必填，上传唯一id，由初始化分片上传返回
* uploadId 必填，分片上传Id，由初始化分片上传返回
* eTags 必填，每个分片上传后返回的eTag组成的数组
* callback 必填，回调


### <a name="cancelMultiUpload"></a>cancelMultiUpload(uploadPolicy, filePath, id, uploadId, callback)

取消上传分片

入参：

* uploadPolicy 必填，上传策略，json格式，具体参见[API说明文档](http://baichuan.taobao.com/portal/doc?articleId=318#ss0)
* filepath 必填，本地文件路径
* id 必填，上传唯一id，由初始化分片上传返回
* uploadId 必填，分片上传Id，由初始化分片上传返回
* callback 必填，回调





