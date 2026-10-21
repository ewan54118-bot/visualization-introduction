/* Each entry corresponds, in order, to the three theory points in content.js.
 * [observation prompt, parameters for the in-place visualization].
 * Theory and visualization share the same lesson; there is no separate lab page.
 */
window.THEORY_CONNECTIONS = {
 '1-0':[
  ['先确认字段含义：学号是身份、成绩是 0–100 的数值。再开启异常项，检查哪条记录违反字段约束。',{missing:0,duplicate:0,outlier:2,clean:false}],
  ['比较把空字符串误当 0 和保留为缺失时的均值；切换“空值错误转换为 0”，观察分母和均值一起变化。',{missing:6,duplicate:0,outlier:0,clean:false,emptyAsZero:true}],
  ['清洗可以修正规则违反，却不能把合成记录变成真实样本。注意图下的数据来源与推断边界。',{missing:3,duplicate:2,outlier:1,clean:true}]
 ],
 '1-1':[
  ['选择数据层，观察单条成绩还没有形成总体描述。',{level:'data'}],
  ['切换信息层，比较平均值与范围怎样组织了原始观察。',{level:'information'}],
  ['切换知识与智慧层，辨别描述、解释和决策还分别需要什么证据。',{level:'knowledge'}]
 ],
 '1-2':[
  ['先看学号，再选满意度：学号只有同异，满意度支持顺序；数轴上的距离不能随意解释。',{field:'id',channel:'position',chart:'bar'}],
  ['观察摄氏温度的差值，再切换身高，比较为什么“二倍”在两种尺度上含义不同。',{field:'temperature',channel:'area'}],
  ['用相同身高数据切换长度、圆面积和颜色，比较哪种更容易精确读数。',{field:'height',channel:'position',chart:'bar'}]
 ],
 '1-3':[
  ['提高筛选阈值并切换排序，观察输入记录与图中顺序分别发生了什么变化。',{threshold:80,aggregate:'count',sort:true}],
  ['查看分组后的汇总；人数、均值与总和保留的信息不同，可与下方记录明细对照。',{threshold:60,aggregate:'sum'}],
  ['将阈值提高到 90 分，比较样本量减少时均值的含义，避免只看均值而忽略人数。',{threshold:90,aggregate:'mean'}]
 ],
 '1-4':[
  ['切换“单个元素”和“全部元素”，观察高亮范围与选择数量。选择图元和匹配数据是两个步骤。',{frame:0,key:'id',selection:'one'}],
  ['查看第二次更新中的新增、更新和退出，检查三种状态如何覆盖这次数据变化。',{frame:1,key:'id',selection:'all'}],
  ['先按下标匹配，再换唯一 id，观察字母与旧图元颜色的身份对应是否保持一致。',{frame:2,key:'index',selection:'all'}]
 ],
 '2-0':[
  ['提高分数下限；保留记录数改变，说明交互作用于数据变换层。',{threshold:80,encoding:'height',zoom:100,stage:1}],
  ['不改变筛选条件，将成绩从柱高改为颜色，观察数据量不变而表达方式改变。',{threshold:60,encoding:'color',zoom:100,stage:2}],
  ['只改变缩放倍数，观察裁切窗口与视图变化；保留样本数应保持不变。',{threshold:60,encoding:'height',zoom:145,stage:3}]
 ],
 '2-1':[
  ['切换学院优先和专业优先，观察相同记录怎样形成不同层级顺序。',{order:'major',threshold:40,collapsed:[]}],
  ['折叠与展开分组节点，比较汇总层级与更细的专业层级；计数无法还原学生的个体成绩。',{order:'college',threshold:60,collapsed:['信息学院']}],
  ['提高阈值后核对根节点、第一层计数与叶子人数，父级总和应保持一致。',{order:'college',threshold:85,collapsed:[]}]
 ],
 '2-2':[
  ['展开所有节点，沿连线从根节点找到父子关系，观察每个节点的名称和人数。',{collapsed:[],orientation:'horizontal',spacing:38}],
  ['改变间距和布局方向，检查节点坐标变了，但类别关系没有变化。',{collapsed:[],orientation:'vertical',spacing:54}],
  ['先折叠信息学院，再点击节点展开。局部隐藏降低复杂度，但节点计数保持不变。',{collapsed:['信息学院'],orientation:'horizontal'}]
 ],
 '2-3':[
  ['点击学生按钮，观察父级冒泡日志。父容器的一处监听可统一处理子按钮。',{stop:false,fired:false}],
  ['点击按钮中的文字，观察实际目标元素和 closest 匹配结果；文字内部点击仍能找到对应按钮。',{stop:false,fired:false}],
  ['连续点击展开和收起，检查内容可见性与按钮 aria-expanded 同步变化。',{stop:false,fired:false}]
 ],
 '3-0':[
  ['观察右侧 RGB 通道读数和最终色块：屏幕颜色由红、绿、蓝通道的加色混合形成。',{hue:0,saturation:100,lightness:50}],
  ['保持 S、L 相同，只调色相，对照相对亮度与对比度的变化。',{hue:60,saturation:90,lightness:50}],
  ['比较黑字和白字预览；颜色之外的文字标签帮助说明当前数值，不能只凭色块传递信息。',{hue:240,saturation:50,lightness:55}]
 ],
 '3-1':[
  ['选择专业类别数据与定性配色，观察各类别不再暗示连续数值的高低。',{dataType:'category',scheme:'qualitative',steps:6}],
  ['选择降水量与顺序配色，检查由少到多的明度方向，再用灰度验证层次。',{dataType:'rain',scheme:'sequential',gray:true}],
  ['选择温差与发散色阶，将中心设为 0；再移动中心，观察解释为什么随之改变。',{dataType:'temperature',scheme:'diverging',center:0}]
 ],
 '3-2':[
  ['保持 a*=b*=0，改变 L*，检查黑白中性轴上的明度变化。',{lightness:20,a:0,b:0}],
  ['保持 L*，在平面中点击或调整 a*、b*，观察红绿与黄蓝两个方向。',{lightness:60,a:-40,b:35}],
  ['把选点移到灰色区域，查看 sRGB 越界状态；裁剪后的 RGB 并不等于原目标颜色。',{lightness:85,a:70,b:60}]
 ],
 '3-3':[
  ['观察色板上的文字是否可读，比较不同明度的单色方案；配色关系不能替代对比检查。',{hue:235,rule:'mono',saturation:50}],
  ['用主色与互补色形成强调关系，注意强调应只服务需要突出的对象。',{hue:235,rule:'complement',saturation:60}],
  ['选择三角色并旋转主色，虽然始终相差 120°，视觉亮度与权重仍可能不同。',{hue:60,rule:'triad',saturation:80}]
 ],
 '3-4':[
  ['关闭再开启直接标签，比较六条曲线的识别负担；颜色数量增加时标签尤为重要。',{palette:'wong',labels:true,gray:false}],
  ['开启灰度，检查当前定性颜色的明度是否能表达顺序：这些类别色并不是连续数量色阶。',{palette:'tol',gray:true,labels:true}],
  ['观察系列名称、纵轴单位和直接标签；完整解释来自图形、图例与文字一起工作。',{palette:'tableau',gray:false,labels:true}]
 ],
 '3-5':[
  ['对照彩虹色与顺序明度，观察连续梯度怎样被颜色制造出看似突变的边界。',{scheme:'rainbow',bands:8}],
  ['保持数据 0–100，把图例上界改为 200，观察相同数据使用了多少颜色范围。',{scheme:'sequential',bands:12,domainMax:200}],
  ['启用缺失样本，比较灰色“缺失”与数值 0 的颜色，两者不能混为一谈。',{scheme:'sequential',missing:true,domainMax:100}]
 ],
 '3-6':[
  ['提高饱和度查看强调色，再降低它观察柔和背景的效果；注意白字对比的数值变化。',{hue:240,saturation:85,lightness:45}],
  ['把饱和度降低、明度提高，对照白字对比是否仍达到适合阅读的水平。',{saturation:20,lightness:80}],
  ['同时看色块中的较大文字与下方较小参数文字，检查缩小显示时是否仍容易识别。',{hue:235,saturation:35,lightness:55}]
 ],
 '3-7':[
  ['打开灰度后追踪三条线，再增加线型和形状，比较是否仍依赖颜色。',{gray:true,redundant:true}],
  ['开启冗余编码，利用线尾标签直接识别系列，减少往返图例的次数。',{gray:false,redundant:true}],
  ['保持冗余编码，在灰度和原色之间切换，再改变窗口尺寸观察交叉位置的可读性。',{gray:true,redundant:true}]
 ],
 '4-0':[
  ['比较总数与每十万人发生率，注意纵轴单位随比较指标一起改变。',{metric:'count',sort:false}],
  ['切换到人口标准化并排序，观察地区排序逆转，思考你要比较总负担还是发生频率。',{metric:'rate',sort:true}],
  ['用发生率读图，确认纵轴明确写出“事件 / 十万人”，而非无单位的数量。',{metric:'rate',sort:false}]
 ],
 '4-1':[
  ['调整纵轴下界，观察相同输入值被重新映射到不同的像素柱长。',{baseline:70,scale:'linear',dataset:'comparison'}],
  ['查看跨数量级的增长序列，切换对数尺度，注意其下界必须大于 0。',{scale:'log',dataset:'growth'}],
  ['保留同一增长序列改回线性尺度，比较刻度、单位和分布的变化。',{scale:'linear',dataset:'growth',baseline:0}]
 ],
 '4-2':[
  ['切换线性与阶梯插值：只改变点间连接规则，没有拟合或推断新的真实观测。',{curve:'step',showPoints:true}],
  ['切换单调三次插值，注意平滑线穿过原有点，但观测数量仍是 6 条。',{curve:'monotone',showPoints:true}],
  ['关闭再开启原始点，对照没有观测标记时，曲线是否更容易被误认为精确的连续事实。',{curve:'monotone',showPoints:true}]
 ],
 '4-3':[
  ['改变图高，对比数值增长不变而中位线段角度改变。',{height:220}],
  ['载入约 45° 的图高，观察它只是不同宽高比中的一种选择，并非数据发生改变。',{height:560}],
  ['固定一份结果作对照，再改变高度；核对两图是否使用相同的数值范围。',{height:360}]
 ],
 '4-4':[
  ['显示粗采样网格，观察二维标量场由一组规则网格数值构成。',{threshold:50,resolution:12,grid:true}],
  ['提高阈值，观察同一标量场中等值边界朝高峰收缩。',{threshold:78,resolution:30,grid:false}],
  ['先固定粗网格结果，再切换 60×60，比较边界的几何细节与被遗漏的结构。',{threshold:50,resolution:60,grid:true}]
 ],
 '5-0':[
  ['定位日期提示与 UTC 标注，确认时间轴的日期约定一致，再检查单日观测。',{window:1,start:0,end:83,cursor:45,stat:'mean'}],
  ['查看每周访问总和，再切换每周均值；两者时间区间相同，数值语义却不同。',{window:7,stat:'sum',start:0,end:83}],
  ['在日值、周均值与双周均值之间切换，比较异常峰值与短周期怎样被聚合隐藏。',{window:14,stat:'mean',start:0,end:83}]
 ],
 '5-1':[
  ['沿日期递增方向读取观测点；框选区间后，顺序与真实日期仍保持一致。',{start:35,end:55,missing:false}],
  ['模拟连续九天缺测，观察缺口保留了真实日期跨度，而不是把两侧记录挤到一起。',{start:15,end:45,missing:true,connect:false}],
  ['保留缺测并关闭跨缺口连线，比较断线如何区别“未知”与“已知但平稳变化”。',{start:15,end:45,missing:true,connect:false}]
 ],
 '5-2':[
  ['同一行比较相同星期几，同一列查看一周；再切换按星期平均，观察周周期。',{view:'weekday',selected:45}],
  ['开启一个缺失日期，查看灰色与最低数值的颜色区别，以及图下注明的颜色范围。',{view:'calendar',selected:28,missing:true}],
  ['点击具体日期格，观察日期、数值与下方趋势线的联动定位。',{view:'calendar',selected:45,missing:false}]
 ],
 '5-3':[
  ['让一圈表示 12 个月，观察真实年周期如何逐圈对齐；再改成 6 个月进行对照。',{period:12,frame:48,spacing:5}],
  ['从第一个月播放，沿顶部起点顺时针追踪时间推进，检查每圈周期单位。',{period:12,frame:1,spacing:5}],
  ['观察相同月份在内外圈的方向关系，注意外圈相同时间跨度具有更长的弧长。',{period:12,frame:48,spacing:8}]
 ],
 '5-4':[
  ['逐步推进事件，横向位置表示事件顺序，并非均匀的实际时长。',{frame:2,character:'all'}],
  ['单独追踪研究员 B，观察稳定的颜色和字母标签怎样保持角色身份。',{frame:5,character:'1'}],
  ['定位事件 4 中研究员 B 与工程师 C 的接近，对照当前场景说明理解相遇关系。',{frame:3,character:'all'}]
 ]
};
