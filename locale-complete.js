/* Short chart labels and numeric formats are localized from canonical values. */
I18n.pairs([
 ['【交互观察 · ','【Interactive observation · '],['参数：','Parameters: '],['结果：','Results: '],['理论解释：','Explanation: '],['我的发现：','My findings: '],['完整观测点：','Complete observations: '],['折叠节点：','Folded nodes: '],['对应理论：','Related theory: '],
 ['Card 模型','Card model'],['层次结构','Hierarchy'],['交互反馈','Interaction feedback'],['颜色空间','Color spaces'],['配色策略','Color strategy'],['无障碍','Accessibility'],['曲线拟合','Curve fitting'],['等值线','Contours'],['故事线','Storyline'],['阿基米德螺旋','Archimedean spiral'],['主导航','Main navigation'],['界面语言','Interface language'],['切换到中文','Switch to Chinese'],['课程概况','Course overview'],['学习进度','Learning progress'],['课程交互演示','Interactive lesson visualization'],
 ['一','Mon'],['二','Tue'],['三','Wed'],['四','Thu'],['五','Fri'],['六','Sat'],['日','Sun'],['周一','Mon'],['周二','Tue'],['周三','Wed'],['周四','Thu'],['周五','Fri'],['周六','Sat'],['周日','Sun'],
 ['原始记录：空值、重复和异常分别标出','Raw records: missing, duplicate and invalid entries'],['原始记录：空值、重复与异常分别标出','Raw records: missing, duplicate and invalid entries'],['空→0','Missing → 0'],['字段字典：id 是标识；score 为 0–100 分或 null','Dictionary: id is an identifier; score is 0–100 or null'],
 ['Information · 信息','Information'],['Knowledge · 知识','Knowledge'],['Wisdom · 智慧','Wisdom'],['Data · 数据','Data'],['智慧 · 情境决策','Wisdom · situated decision'],['知识 · 解释与验证','Knowledge · explanation and validation'],['信息 · 汇总与比较','Information · summary and comparison'],['数据 · 原始观测','Data · observations'],['当前层级','Selected level'],['原始数据','Raw data'],['结构化信息','Organized information'],['解释与证据','Explanation and evidence'],['情境判断','Situated judgment'],
 ['人数 / 人','Student count'],['平均成绩 / 分','Mean score / points'],['成绩总和 / 分','Score total / points'],['无样本','No sample'],['更新前的元素','Previous elements'],['新数据匹配后的元素','Elements after matching'],['Enter · 新增','Enter · new'],['按索引：old[i] ↔ next[i]','Index matching: old[i] ↔ next[i]'],['数据表','Data table'],['视觉结构','Visual structure'],['交互视图','Interactive view'],['数据变换','Data transformation'],['视图变换','View transformation'],['成绩 → 高度','Score → height'],['可折叠的学生分类树','Foldable student hierarchy'],['父容器 · 注册捕获和冒泡监听','Parent · capture and bubble listeners'],['点击：展开学生详情','Activate: expand student details'],['点击：收起学生详情','Activate: hide student details'],['目标','Target'],['触发学生按钮点击事件','Activate the student button'],['学生 S01 · 计算机 · 82 分','Student S01 · Computing · 82 points'],
 ['白色文字预览','White text'],['黑色文字预览','Black text'],['相同 S、L，不同色相','Same S and L, different hue'],['相对中心的偏差：温差 / °C','Deviation: temperature anomaly / °C'],['无序类别：不同专业','Unordered categories: programs'],['连续数量：降水量 / mm','Ordered magnitude: rainfall / mm'],['中心偏差','Deviation'],['连续数量','Magnitude'],['类别','Categories'],['a*: −100（绿） → +100（红）','a*: −100 green → +100 red'],['Tableau 10 前六色','First six Tableau 10 colors'],['合成响应值','Synthetic response'],['配色','Palette'],['下方：相同数据的连续顺序明度参照','Below: continuous ordered-lightness reference'],['上方灰色区域：未观测，不能当作真实的 0','Gray above: unobserved, not actual zero'],
 ['事件总数 / 件','Event count'],['事件 / 十万人','Events per 100,000'],['数值 · 线性轴','Value · linear axis'],['数值 · 对数轴（正值）','Value · log axis, positive domain'],['数值 · 对数轴','Value · log axis'],['数值（固定范围 0–100）','Value · fixed domain 0–100'],['边交点 t = (threshold − v₀) / (v₁ − v₀)','Edge crossing t = (threshold − v₀) / (v₁ − v₀)'],['每日访问 / 次','Daily visits'],['区间总访问量 / 次','Interval total visits'],['区间平均访问 / 次','Mean daily visits'],['日访问均值 / 次','Mean visits by weekday'],['此区间没有有效观测：缺失不等于 0','No observed values here: missing is not zero'],['1 月起点 · 顺时针推进','Month 1 at top · clockwise'],['明度：季节数值','Lightness: seasonal value'],['深色更高','Darker means higher'],['初始分组','Initial groups'],['准备阶段','Preparation'],['联合采样','Joint sampling'],['交叉验证','Cross-validation'],['结果讨论','Results discussion'],['归档交接','Archive and handover'],['缺失（未观测）','Missing (unobserved)'],['同场景','Shared scene'],['成绩 / 分','Score / points']
]);
I18n.pattern(/^已完成 (\d+)%$/,'Completed $1%');
I18n.pattern(/^(.+)学习进度$/,'$1 learning progress');
I18n.pattern(/^未清洗均值 ([\d.]+) 分$/,'Uncleaned mean $1 points');
I18n.pattern(/^清洗后均值 ([\d.]+) 分$/,'Cleaned mean $1 points');
I18n.pattern(/^保留记录示例（前 5 条）：(.*)$/,'Retained examples (first 5): $1');
I18n.pattern(/^Update · 原 (.+)$/,'Update · previously $1');
I18n.pattern(/^缩放 (\d+)%$/,'Zoom $1%');
I18n.pattern(/^真实数据范围 0–100；颜色图例范围 0–(\d+)$/,'Observed values 0–100; legend 0–$1');
I18n.pattern(/^观测 (\d+)：(.+)$/,'Observation $1: $2');
I18n.pattern(/^黄色边界：f\(x,y\) = (\d+)$/,'Gold contour: f(x,y) = $1');
I18n.pattern(/^(.+) 起 (\d+) 天均值：([\d.]+)$/,'$1, $2-day mean: $3');
I18n.pattern(/^(.+) 起 (\d+) 天总和：([\d.]+)$/,'$1, $2-day total: $3');
I18n.pattern(/^(.+) · 原始日值 (\d+)$/,'$1 · raw daily value $2');
I18n.pattern(/^(.+)：(\d+) 次$/,'$1: $2 visits');
I18n.pattern(/^(.+)：缺失（未观测）$/,'$1: missing (unobserved)');
I18n.pattern(/^(\d+) 年 (\d+) 月：([\d.]+)$/,'Year $1, month $2: $3');
I18n.pattern(/^一圈 = (\d+) 月 · 已展开 (\d+) 月$/,'One turn = $1 months · $2 months shown');
I18n.pattern(/^(.+)（周([一二三四五六日])）$/,'$1 ($2)');
