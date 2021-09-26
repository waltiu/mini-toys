# React.createElement
 # 输入
   const element = <div title="foo">hello</div>
   const container = document.getElementById('container')
 # 编译
   const element = React.createElement("div", { title: "foo" }, "hello");
 # 打印element
   const element = { type: 'div', props: { title: 'foo', children: 'hello' }}
# ReactDOM.render
 # 创建标签名为`element.type`的节点
   const node =document.createElement(`element.type`)
 # 设置node节点的title
   node["title"] = element.props.title
 # 创建空的文本节点text
   const text = document.createTextNode("")
 # 设置文本节点的内容为`element.props.children`
   text['nodeValue']=`element.props.children`
 # 将文本节点`text`添加进`node节点`
   node.appendChild(`text`)
 # 将node节点加入container节点
   container.appendChild(`node`)