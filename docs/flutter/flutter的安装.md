# flutter的安装

要安装并运行flutter,你的开发环境必须满足以下最低要求:

* 操作系统:Windows 7 SP1 或更高版本（64 位），基于 x86-64
* 磁盘空间:1.64GB（不包括用于IDE/工具的磁盘空间）
* 工具:flutter会取决于如下环境中可用的工具
  * [windows-powershell 5.0](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-windows-powershell)或者更新版本的（当然这都是window 10系统环境下预先安装好的）
  * [windows下的git](https://git-scm.com/download/win),以及可以从windows命令提示符选项中使用git

如果windows下的git已经被安装了，确保你的powershell或者命令提示符能够执行git命令。

## 获取flutter SDK

1. 下载以下安装包以获取 Flutter SDK 的最新稳定版本:

<a href="https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_2.2.2-stable.zip" download="flutter_windows_2.2.2-stable.zip">flutter_windows_2.2.2-stable.zip</a>

对于其他发布渠道和旧版本，请参阅[SDK 发布](https://flutter.dev/docs/development/tools/sdk/releases)页面。

2. 解压 zip 文件并将包含的 Flutter 放置在 Flutter SDK 所需的安装位置(例如:```C:\Users\<your-user-name>\Documents```)

> 警告:不要将 Flutter 安装在像 C:\Program Files\ 这样需要提升权限的目录中

如果你不想安装固定版本的安装包，你可以跳过步骤 1 和 2。 相反，从 GitHub 上的 Flutter 仓库获取源代码，并根据需要更改分支或标签。 例如：

```shell
C:\src>git clone https://github.com/flutter/flutter.git -b stable
```

你现在已准备好在 Flutter 控制台中运行 Flutter 命令。

## 更改你的路径(path)

如果您希望在常规 Windows 控制台中运行 Flutter 命令，请执行以下步骤将 Flutter 添加到 PATH 环境变量：

* 从你的开始搜索栏，输入`env`并且选择`编辑环境变量`
* 在用户变量之下检查是否有一个入口叫做`PATH`
    * 如果入口存在，将`flutter\bin`的全局路径添加到其中，使用`;`分隔符分割一些存在的值
    * 如果入口不存在，创建一个新的用户变量叫做`Path`，同样的将`flutter\bin`添加到其中

操作如下图所示:

* 第一步：打开环境变量配置

<div class="image-container">
    <img src="./docs/flutter/images/install/1.png" alt="图片2-1" title="图2-1" >
    <span class="image-title">图 2-1</span>
</div>

<div class="image-container">
    <img src="./docs/flutter/images/install/2.png" alt="图片2-2" title="图2-2" >
    <span class="image-title">图 2-2</span>
</div>

* 第二步:查看用户变量是否含有path入口

<div class="image-container">
    <img src="./docs/flutter/images/install/3.png" alt="图片2-3" title="图2-3" >
    <span class="image-title">图 2-3</span>
</div>

* 第三步:将flutter SDK安装的目录下的bin文件所在的全路径复制并添加到path变量中

<div class="image-container">
    <img src="./docs/flutter/images/install/4.png" alt="图片2-4" title="图2-4" >
    <span class="image-title">图 2-4</span>
</div>

<div class="image-container">
    <img src="./docs/flutter/images/install/5.png" alt="图片2-5" title="图2-5" >
    <span class="image-title">图 2-5</span>
</div>

完成以上操作之后，你必须关闭并重新打开任何已经存在的windows控制台然后让这个改动生效。

从 Flutter 的 1.19.0 开发版开始，Flutter SDK 在 flutter 命令旁边包含 dart 命令，以便您可以更轻松地运行 Dart 命令行程序。 下载 Flutter SDK 也会下载兼容版本的 Dart，但如果您单独下载了 Dart SDK，请确保您的路径中首先安装了 Flutter 版本的 dart，因为这两个版本可能不兼容。 下面的命令告诉你 flutter 和 dart 命令是否来自同一个 bin 目录，以及是否兼容。

```shell
C:\> where flutter dart
C:\path-to-flutter-sdk\bin\flutter
C:\path-to-flutter-sdk\bin\flutter.bat
C:\path-to-dart-sdk\bin\dart.exe    :: this should go after `C:\path-to-flutter-sdk\bin\` commands
C:\path-to-flutter-sdk\bin\dart
C:\path-to-flutter-sdk\bin\dart.bat
```

如上所示，来自 Flutter SDK 的命令 dart 并不是最先出现的。 在来自 ```shell C:\path-to-dart-sdk\bin\``` 的命令之前更新您的路径以使用来自 ```shell C:\path-to-flutter-sdk\bin\``` 的命令（在本例中）。 重新启动 shell 以使更改生效后，再次运行 where 命令应该会显示来自同一目录的 flutter 和 dart 命令现在它们排在第一位。

```shell
C:\> where flutter dart
C:\dev\src\flutter\bin\flutter
C:\dev\src\flutter\bin\flutter.bat
C:\dev\src\flutter\bin\dart
C:\dev\src\flutter\bin\dart.bat
C:\dev\src\dart-sdk\bin\dart.exe
```

但是，如果您使用的是 PowerShell，其中 where 是 Where-Object 命令的别名，因此您需要使用 where.exe 来代替。

```shell
PS C:\>  where.exe flutter dart
```

如下图所示:

<div class="image-container">
    <img src="./docs/flutter/images/install/6.png" alt="图片2-6" title="图2-6" >
    <span class="image-title">图 2-6</span>
</div>

要了解有关 dart 命令的更多信息，请从命令行运行```shell dart -h```，或查看[dart 工具](https://dart.dev/tools/dart-vm)页面。

## 运行flutter doctor

从路径中包含 Flutter 目录的控制台窗口（见上文），运行以下命令以查看是否存在完成设置所需的任何平台依赖项：

```shell
C:\src\flutter>flutter doctor
```

此命令会检查您的环境并显示 Flutter 安装状态报告。仔细检查您可能需要安装的其他软件或要执行的其他任务的输出（以粗体显示）。例如:

```shell
[-] Android toolchain - develop for Android devices
    • Android SDK at D:\Android\sdk
    ✗ Android SDK is missing command line tools; download from https://goo.gl/XxQghQ
    • Try re-installing or updating your Android SDK,
      visit https://flutter.dev/setup/#android-setup for detailed instructions.
```

如下图所示:

<div class="image-container">
    <img src="./docs/flutter/images/install/7.png" alt="图片2-7" title="图2-7" >
    <span class="image-title">图 2-7</span>
</div>

以下部分描述了如何执行这些任务并完成设置过程。 一旦你安装了任何缺失的依赖项，你可以再次运行 flutter doctor 命令来验证你是否正确设置了所有内容。

> 笔记: 如果 flutter doctor 返回 Android Studio 的 Flutter 插件或 Dart 插件未安装，请继续<button class="link-btn" type="button" data-to="设置编辑器">设置编辑器</button>下一章以解决此问题。