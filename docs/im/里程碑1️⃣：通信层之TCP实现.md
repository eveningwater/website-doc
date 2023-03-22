# 里程碑1️⃣：通信层之TCP实现

<div class="image-container">
    <img src="./docs/im/images/72.png" alt="图片13-1" title="图片13-1" >
    <span class="image-title">图 13-1 </span>
</div>

## 里程碑

到这里，我们终于抵达了第一个里程碑。已经打了一个版本[Tag v1.1](https://github.com/klintcheng/kim/releases/tag/v1.1)：

<div class="image-container">
    <img src="./docs/im/images/73.png" alt="图片13-2" title="图片13-2" >
    <span class="image-title">图 13-2 </span>
</div>

在介绍tcp的实现逻辑之前，我们总结一下，帮助读者加深对通信层的理解。

## 通信层总结

首先，通信层的作用与意义很大！

1. 通过通信层的逻辑内聚，极大的简化了业务层的逻辑。这就像如今我们开发web服务，不用关心底层Http实现逻辑一样。
2. 它是对技术知识沉淀的一个结果，只有对两种协议及通信相关的知识非常熟练，才能完成对它的抽象。
3. 它是整个系统的地基，就像万丈高楼平地起，地基不稳，上层就是个笑话。

其次，通过对通信层的封装，之后的优化将对上层业务透明，高内聚与低耦合带来的系统层次非常分明，而且逻辑也更清晰。

### 通信层框架

<div class="image-container">
    <img src="./docs/im/images/74.png" alt="图片13-3" title="图片13-3" >
    <span class="image-title">图 13-3 </span>
</div>

1. 通信层核心逻辑：Client.Connect() 与 Server.Start()。
2. 业务层使用的主要方法：Client.Read()、Client.Send() 和 Server.Push()。
3. 交给业务层来处理差异问题的核心回调方法：DialAndHandshake()、Accept()、Receive() 和 Disconnect()。
4. 解决了协议格式差异问题的kim.Conn中两个核心方法：ReadFrame和WriteFrame。

## 通信层TCP实现

最后，我们把tcp协议的逻辑全部实现，主要是如下三个文件的实现。

<div class="image-container">
    <img src="./docs/im/images/75.png" alt="图片13-4" title="图片13-4" >
    <span class="image-title">图 13-4 </span>
</div>

### kim.Conn实现

首先我们定义一个Frame的实现，在协议只我们只定义了两个属性，因此tcp中的Frame就是如下的样子。

```golang
// Frame tcp Frame
type Frame struct {
	OpCode  kim.OpCode
	Payload []byte
}
```

然后实现kim.Conn接口中的ReadFrame与WriteFrame方法。

```golang
// Conn Conn
type TcpConn struct {
	net.Conn
}

// NewConn NewConn
func NewConn(conn net.Conn) *TcpConn {
	return &TcpConn{
		Conn: conn,
	}
}

// ReadFrame ReadFrame
func (c *TcpConn) ReadFrame() (kim.Frame, error) {
	opcode, err := endian.ReadUint8(c.Conn)
	if err != nil {
		return nil, err
	}
	payload, err := endian.ReadBytes(c.Conn)
	if err != nil {
		return nil, err
	}
	return &Frame{
		OpCode:  kim.OpCode(opcode),
		Payload: payload,
	}, nil
}

// WriteFrame WriteFrame
func (c *TcpConn) WriteFrame(code kim.OpCode, payload []byte) error {
	return WriteFrame(c.Conn, code, payload)
}

// Flush Flush
func (c *TcpConn) Flush() error {
	return nil
}

// WriteFrame write a frame to w
func WriteFrame(w io.Writer, code kim.OpCode, payload []byte) error {
	if err := endian.WriteUint8(w, uint8(code)); err != nil {
		return err
	}
	if err := endian.WriteBytes(w, payload); err != nil {
		return err
	}
	return nil
}
```

> endian.ReadBytes与endian.WriteBytes方法在内部会自动处理payload长度。

### kim.Server实现

与websocket逻辑类似，Server端的主要逻辑在Start方法：

```golang
package tcp

import (
	"context"
	"errors"
	"fmt"
	"net"
	"sync"
	"time"

	"github.com/klintcheng/kim"
	"github.com/klintcheng/kim/logger"
	"github.com/klintcheng/kim/naming"

	"github.com/segmentio/ksuid"
)

// Server is a tcp implement of kim.Server
type Server struct {
	listen string
	naming.ServiceRegistration
	kim.ChannelMap
	kim.Acceptor
	kim.MessageListener
	kim.StateListener
	once    sync.Once
	options ServerOptions
}

// Start server
func (s *Server) Start() error {
	log := logger.WithFields(logger.Fields{
		"module": "tcp.server",
		"listen": s.listen,
		"id":     s.ServiceID(),
	})

	if s.StateListener == nil {
		return fmt.Errorf("StateListener is nil")
	}
	if s.Acceptor == nil {
		s.Acceptor = new(defaultAcceptor)
	}
        // step 1
	lst, err := net.Listen("tcp", s.listen)
	if err != nil {
		return err
	}
	log.Info("started")
	for {
                // step 2
		rawconn, err := lst.Accept()
		if err != nil {
			rawconn.Close()
			log.Warn(err)
			continue
		}
		go func(rawconn net.Conn) {
			conn := NewConn(rawconn)
                        // step 3
			id, err := s.Accept(conn, s.options.loginwait)
			if err != nil {
				_ = conn.WriteFrame(kim.OpClose, []byte(err.Error()))
				conn.Close()
				return
			}
			if _, ok := s.Get(id); ok {
				log.Warnf("channel %s existed", id)
				_ = conn.WriteFrame(kim.OpClose, []byte("channelId is repeated"))
				conn.Close()
				return
			}
                        //step 4
			channel := kim.NewChannel(id, conn)
			channel.SetReadWait(s.options.readwait)
			channel.SetWriteWait(s.options.writewait)
			s.Add(channel)

			log.Info("accept ", channel)
                        //step 5
			err = channel.Readloop(s.MessageListener)
			if err != nil {
				log.Info(err)
			}
                        // step 6
			s.Remove(channel.ID())
			_ = s.Disconnect(channel.ID())
			channel.Close()
		}(rawconn)
	}
}

// string channelID
// []byte data
func (s *Server) Push(id string, data []byte) error {
	ch, ok := s.ChannelMap.Get(id)
	if !ok {
		return errors.New("channel no found")
	}
	return ch.Push(data)
}
```

主要流程分为6步：

1. `net.Listen("tcp", s.listen)` 启用连接监听。
2. `lst.Accept()` 接收新的连接。
3. `s.Accept(conn, s.options.loginwait)` 交给上层处理认证等逻辑。
4. `s.Add(channel)` 创建一个channel对象，并添加到连接管理中。
5. `channel.Readloop(s.MessageListener)` 循环读取消息，这个逻辑调用的是channel.Readloop方法，这是一个通用逻辑，在websocket中有过介绍，这里就忽略了。
6. `s.Remove(channel.ID())` 如果Readloop方法返回了一个error，说明连接已经断开，Server就需要把它从channelMap中删除，并调用 `(kim.StateListener).Disconnect(string)`把断开事件回调给业务层。

### kim.Client实现

Client的核心逻辑也是在Connect方法中：

```golang
package tcp

import (
	"context"
	"errors"
	"fmt"
	"net/url"
	"sync"
	"sync/atomic"
	"time"

	"github.com/klintcheng/kim"
	"github.com/klintcheng/kim/logger"
)

// Client is a tcp implement of kim.Client
type Client struct {
	sync.Mutex
	kim.Dialer
	once    sync.Once
	id      string
	name    string
	conn    kim.Conn
	state   int32
	options ClientOptions
}

// Connect to server
func (c *Client) Connect(addr string) error {
	_, err := url.Parse(addr)
	if err != nil {
		return err
	}
        // 这里是一个CAS原子操作，对比并设置值，是并发安全的。
	if !atomic.CompareAndSwapInt32(&c.state, 0, 1) {
		return fmt.Errorf("client has connected")
	}

	ctx, cancel := context.WithTimeout(context.TODO(), time.Second*10)
	defer cancel()
	rawconn, err := c.Dialer.DialAndHandshake(ctx, addr)
	if err != nil {
		atomic.CompareAndSwapInt32(&c.state, 1, 0)
		return err
	}
	if rawconn == nil {
		return fmt.Errorf("conn is nil")
	}
	c.conn = NewConn(rawconn)

	if c.options.Heartbeat > 0 {
		go func() {
			err := c.heartbealoop()
			if err != nil {
				logger.WithField("module", "tcp.client").Warn("heartbealoop stopped - ", err)
			}
		}()
	}
	return nil
}
```

这个方法与websocket中Connect唯一不同之处是`c.conn = NewConn(rawconn)`。

> 读者可以思考下为什么？

接下来就是Read()、Send()及ping()等协议格式差异化导致的逻辑区分，不过，由于我们把net.Conn包装成了kim.Conn，所以这里逻辑都比较简单。

```golang
func (c *Client) Send(payload []byte) error {
	if atomic.LoadInt32(&c.state) == 0 {
		return fmt.Errorf("connection is nil")
	}
	c.Lock()
	defer c.Unlock()
	err := c.conn.SetWriteDeadline(time.Now().Add(c.options.WriteWait))
	if err != nil {
		return err
	}
	return c.conn.WriteFrame(kim.OpBinary, payload)
}

func (c *Client) Read() (kim.Frame, error) {
	if c.conn == nil {
		return nil, errors.New("connection is nil")
	}
	if c.options.Heartbeat > 0 {
		_ = c.conn.SetReadDeadline(time.Now().Add(c.options.ReadWait))
	}
	frame, err := c.conn.ReadFrame()
	if err != nil {
		return nil, err
	}
	if frame.GetOpCode() == kim.OpClose {
		return nil, errors.New("remote side close the channel")
	}
	return frame, nil
}

func (c *Client) heartbealoop() error {
	tick := time.NewTicker(c.options.Heartbeat)
	for range tick.C {
		// 发送一个ping的心跳包给服务端
		if err := c.ping(); err != nil {
			return err
		}
	}
	return nil
}

func (c *Client) ping() error {
	logger.WithField("module", "tcp.client").Tracef("%s send ping to server", c.id)

	err := c.conn.SetWriteDeadline(time.Now().Add(c.options.WriteWait))
	if err != nil {
		return err
	}
	return c.conn.WriteFrame(kim.OpPing, nil)
}
```

## 演示

演示代码就是上一章节（通信层框架设计）中的mock示例。

1.启动服务端

```cmd
$ go run main.go mock_srv -p tcp  
INFO[0000] started                                       id=srv1 listen=":8000" module=tcp.server
```

2.启动客户端

```golang
$ go run main.go mock_cli -p tcp -a localhost:8000
INFO[0000] start dial: localhost:8000                   
WARN[0000] test1 receive message [hello from server ]   
WARN[0000] test1 receive message [hello from server ]   
WARN[0000] test1 receive message [hello from server ]   
WARN[0000] test1 receive message [hello from server ]   
WARN[0000] test1 receive message [hello from server ]
```

可以看到，除了module变成了tcp.server，逻辑细节与websocket完全相同。

本章完！