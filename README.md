# MxsDoc

MxsDoc是基于Web的文件管理系统，支持权限管理和历史版本管理，支持在线预览和编辑，支持压缩文件在线解压预览，支持在线分享、支持重复文件的秒传和大文件的断点续传，支持跨仓库和跨服务器文件推送，支持分布式远程存储，支持文件名和文件内容搜索，支持Markdown格式的文件备注。

主要应用场景：文件管理系统、日志管理系统、网页版SVN仓库、网页版GIT仓库、电子书、软件接口管理系统、远程桌面管理、自动备份软件。

### [立即体验](http://dw.gofreeteam.com) [user: guest/guest]

全平台支持:Linux，Windows，Mac.
![输入图片说明](https://images.gitee.com/uploads/images/2020/0614/223719_03bd18e1_1558129.png "docsys_首页1.png")

开源协议: 采用GPL 2.0协议;
![输入图片说明](https://images.gitee.com/uploads/images/2020/0613/105551_20a8ac4f_1558129.png "docsys_首页2.png")

仓库列表
![输入图片说明](https://images.gitee.com/uploads/images/2020/0613/105615_5aa90a26_1558129.png "docsys_仓库列表1.png")

仓库主页
![输入图片说明](https://images.gitee.com/uploads/images/2020/0613/105650_d4a010aa_1558129.png "docsys_仓库主页1.png")

历史版本
![输入图片说明](https://images.gitee.com/uploads/images/2020/0613/105708_0888bd30_1558129.png "docsys_仓库主页3.png")

在线编辑
![输入图片说明](https://images.gitee.com/uploads/images/2020/0613/105732_88ed0a73_1558129.png "docsys_仓库主页2.png")

文件分享
![输入图片说明](https://images.gitee.com/uploads/images/2020/0613/105757_67ca6763_1558129.png "docsys_仓库主页4.png")

全文搜索
![输入图片说明](https://images.gitee.com/uploads/images/2020/0613/105917_2ee5c143_1558129.png "docsys_仓库列表2.png")

后台管理
![输入图片说明](https://images.gitee.com/uploads/images/2020/0613/105813_e858feb3_1558129.png "docsys_管理后台1.png")

# 系统安装与升级
### 一、系统安装
#### 1、下载[一键安装包](https://github.com/RainyGao-GitHub/DocSys/releases)

#### 2、安装
（1）解压系统安装包至本地目录

（2）运行start脚本启动系统

 **注意：** 本地目录不得包含空格和中文

#### 3、访问
本机访问：http://localhost:8100/DocSystem

远程访问：将localhost改为IP地址即可

### 二、系统升级
#### 1、下载[DocSystem.war](https://github.com/RainyGao-GitHub/DocSys/releases)

#### 2、升级
（1）将DocSystem.war拷贝至tomcat/webapps目录

（2）运行restart脚本重启系统


# 限制与价格
### 限制
| 功能限制       |   社区版      | 个人版         | 专业版        | 企业版         |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| 价格          | 免费           | 免费          | [购买](http://dw.gofreeteam.com/DocSystem/web/sales/select.html) | [购买](http://dw.gofreeteam.com/DocSystem/web/sales/select.html) |
| 文件管理功能   | +             |     +         |       +       |     +         |
| 用户管理功能   | +             |     +         |       +       |     +         |
| 历史版本功能   | +             |     +         |       +       |     +         |
| 文件备注功能   | +             |     +         |       +       |     +         |
| 全文搜索功能   | +             |     +         |       +       |     +         |
| 文件分享功能   | +             |     +         |       +       |     +         |
| 在线解压功能   | +             |     +         |       +       |     +         |
| 文本文件预览   | +             |     +         |       +       |     +         |
| 文本文件编辑   | +             |     +         |       +       |     +         |
| 文件推送功能   | +             |     +         |       +       |     +         |
| 异地推送功能   | +             |     +         |       +       |     +         |
| Office预览     | -             |     +         |       +       |     +         |
| Office编辑     | -             |     +         |       +       |     +         |
| 日志管理功能   | -             |     -         |       +       |     +         |
| LDAP单点登录   | -             |     -         |       -       |     +         |
| 用户限制       | 无            |     3人       |    购买    |    购买   |
| 售后服务       | 无            |     无         |       无       |     一年      |

### 商业版价格
#### 专业版价格
|有效期/用户数量 |   20人           |     50人      |    100人      |     200人     |    500人      |    不限       |
| ------------- | --------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| 长期          |        500元     |    800元      |    1200元     |     1800元    |    3200元     |   5000元      |

#### 企业版价格
|有效期/用户数量 |   20人           |     50人      |    100人      |     200人     |    500人      |    不限       |
| ------------- | --------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| 长期          |        7500元     |    9500元      |    12500元     |     18500元    |    26500元     |   35000元      |

# 技术咨询与购买 
## 购买与咨询 请加群 : 953982034


# 常见问题
### 一、二次开发如何集成商业版功能
#### 1、下载对应的商业版本[DocSystem.war](https://github.com/RainyGao-GitHub/DocSys/releases)
#### 2、集成商业版功能
解压DocSystem.war到本地，并分别复制 **DocSystem\web\static\office-editor** 和 **DocSystem\WEB-INF\classes\com\DocSystem\websocket** 到源码的 **WebRoot\web\static** 和 **WebRoot\WEB-INF\classes\com\DocSystem** 目录
### 二、Linux系统war包直接部署Office无法预览和编辑
#### 1、手动创建DocSystem目录
解压 **DocSystem.war** 到 **tomcat\webapps\DocSystem** 目录
#### 2、手动安装动态库
复制 **DocSystem\web\static\office-editor\libs\Linux** 目录下的所有动态库到 **/usr/lib64** 目录
#### 3、重启MxsDoc
### 三、Windows系统Office无法预览和编辑
#### 1、检查系统缺少的动态库并修复
双击运行 **DocSystem\web\static\office-editor\bin\documentserver-generate-allfonts.bat** ，根据报错提示确定需要修复的动态库
### 四、Centos系统Excel在线编辑退出后，修改内容丢失
#### 1、安装字体库
**yum -y install fontconfig**
#### 2、添加中文字体
将 **C:/Windows/Fonts** 字体文件复制到 ** /usr/shared/fonts** 目录
#### 3、生成 **fonts.scale** 文件
**yum -y install ttmkfdir** 目录
#### 4、刷新字体缓存
**fc-cache**
#### 5、重启MxsDoc
 