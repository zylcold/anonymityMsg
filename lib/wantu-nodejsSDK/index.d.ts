
export as namespace WANTU;

declare interface wantuCallback {
    (error: Error, response: {statusCode:number, headers: object, data: object}): void
}

declare class WANTU {
    constructor(AK:string, SK:string, TYPE?:string)
    /**
     * 删除文件
     * @param namespace 必填，命名空间
     * @param dir 必填，文件所在文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
     * @param file 必填，文件名称
     * @param callback 必填，回调
     */
    delFile:(namespace: string, dir:string, file:string, callback:wantuCallback)=>void;
    /**
     * 文件是否存在
     * @param namespace 必填，命名空间
     * @param dir 必填，文件所在文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
     * @param file 必填，文件名称
     * @param callback 必填，回调
     */
    existFile:(namespace: string, dir:string, file:string, callback:wantuCallback)=>void;
    /**
     * 获取文件meta
     * @param namespace 必填，命名空间
     * @param dir 必填，文件所在文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
     * @param file 必填，文件名称
     * @param callback 必填，回调
     */
    getFile:(namespace: string, dir:string, file:string, callback:wantuCallback)=>void;
    /**
     * 获取文件列表
     * @param namespace 必填，命名空间
     * @param dir 必填，文件所在文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
     * @param currentPage 必填，当前页码，从1开始
     * @param pageSize 必填，当前页内文件个数，最大100
     * @param callback 必填，回调
     */
    listFiles:(namespace: string, dir:string, file:string, callback:wantuCallback)=>void;
    /**
     * 创建文件夹
     * @param namespace 必填，命名空间
     * @param dir 必填，文件所在文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
     * @param callback 必填，回调
     */
    createDir:(namespace: string, dir:string, callback:wantuCallback)=>void;
    /**
     * 删除文件夹
     * @param namespace 必填，命名空间
     * @param dir 必填，文件所在文件夹路径；以'/'开头，不能以'/'结尾；根目录为'/'
     * @param callback 必填，回调
     */
    delDir:(namespace: string, dir:string, callback:wantuCallback)=>void;
}
export = WANTU;