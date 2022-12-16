# Windows 的 ipv4 和 ipv6 优先级

<mark>ipv6优先级更高会导致能用localhost打开的本地接口不能用127.0.0.1打开</mark>

Windows10/11开启 IPv6 后默认 IPv6 访问优先（以访问 IPv4/IPv6 双栈站点为例， 操作系统会优先访问 IPv6），如果期望 IPv4访问优先，可以通过 netsh 命令调整。

首先查看网络前缀访问优先级
我们先看下Windows10/11 中各个访问 IPv4/IPv6的优先级，可以看到 IPv6(::/0)比 IPv4(::ffff:0:0/96) 的优先级高，会被优先访问。

第一列优先循序越大优先级越高，会优先访问

```sh
C:\Windows\system32>netsh interface ipv6 show prefixpolicies
查询活动状态...
 
优先顺序    标签   前缀
----------  -----  --------------------------------
        50      0  ::1/128   
        40      1  ::/0
        35      4  ::ffff:0:0/96
        30      2  2002::/16
         5      5  2001::/32
         3     13  fc00::/7
         1     11  fec0::/10
         1     12  3ffe::/16
         1      3  ::/96
```

调整网络前缀优先级，让 IPv4 访问优先
从前面我们知道 IPv6(::/0)比 IPv4(::ffff:0:0/96) 的优先级高，我们通过 netsh interface ipv6 命令调整优先级。

Win + R 进入运行对话框，输入 cmd，选择 以管理员身份运行，执行调整命令，可以看到 IPv4(::ffff:0:0/96) 优先级最高。

```sh
C:\Windows\system32>netsh interface ipv6 set  prefixpolicy ::ffff:0:0/96 100 4
确定。
 
C:\Windows\system32>netsh interface ipv6 show prefixpolicies
查询活动状态...
 
优先顺序    标签   前缀
----------  -----  --------------------------------
       100      4  ::ffff:0:0/96
        50      0  ::1/128
        40      1  ::/0
        30      2  2002::/16
         5      5  2001::/32
         3     13  fc00::/7
         1     11  fec0::/10
         1     12  3ffe::/16
         1      3  ::/96
```

执行 ping 、curl 命令验证，确实默认 IPv4 访问优先。

重启电脑后，发现还是 IPv6 访问优先。

```sh
Microsoft Windows [版本 10.0.19044.1766]
(c) Microsoft Corporation。保留所有权利。
 
C:\Windows\system32>ping ipw.cn
 
正在 Ping ipw.cn [2402:4e00:40:40::2:3b6] 具有 32 字节的数据:
来自 2402:4e00:40:40::2:3b6 的回复: 时间=10ms
来自 2402:4e00:40:40::2:3b6 的回复: 时间=14ms
来自 2402:4e00:40:40::2:3b6 的回复: 时间=9ms
 
2402:4e00:40:40::2:3b6 的 Ping 统计信息:
    数据包: 已发送 = 3，已接收 = 3，丢失 = 0 (0% 丢失)，
往返行程的估计时间(以毫秒为单位):
    最短 = 9ms，最长 = 14ms，平均 = 11ms
```

查看网络前缀访问优先级，发现只剩下 IPv4 的，可能是因为这个原因导致没生效，加回 IPv6 的网络前缀，IPv4 访问优先，达到目的。

```sh
C:\Windows\system32>netsh interface ipv6 show prefixpolicies
查询活动状态...
 
优先顺序    标签   前缀
----------  -----  --------------------------------
       100      4  ::ffff:0:0/96
 
C:\Windows\system32>netsh interface ipv6 add  prefixpolicy ::/0 40 1
确定。
 
 
C:\Windows\system32>netsh interface ipv6 show prefixpolicies
查询活动状态...
 
优先顺序    标签   前缀
----------  -----  --------------------------------
       100      4  ::ffff:0:0/96
        40      1  ::/0
 
```

如何重新设置 IPv6访问优先
两种方式，直接重置

### 重置 IPv6 策略

```sh
C:\Windows\system32>netsh interface ipv6 reset
```

重新启动计算机来完成此操作。