export const painPoints = [
  { title: '学习任务分散，缺乏统一管理', impact: '高', mentions: 12, description: '用户需要在多个课程平台、日历和笔记工具之间切换，容易遗漏任务和截止日期。' },
  { title: '难以制定可执行的学习计划', impact: '高', mentions: 10, description: '用户知道自己需要学习，但不知道如何根据考试时间和任务量合理安排每天的学习内容。' },
  { title: '拖延导致计划无法持续执行', impact: '高', mentions: 9, description: '传统学习计划通常是静态的，一旦某一天没有完成任务，后续计划容易全部被打乱。' },
  { title: '现有 AI 工具更擅长回答问题，而不是管理学习过程', impact: '中', mentions: 7, description: '多数 AI 工具能够解释知识或生成内容，但缺乏持续的学习任务管理能力。' },
];
export const competitors = [
  { name: 'Notion AI', mark: 'N', strengths: ['信息整理能力强', '支持 AI 内容生成', '工作空间灵活'], weaknesses: ['学习场景不是核心定位', '需要用户自己搭建学习管理系统', '缺少针对学生的自动规划能力'], gap: '学习计划自动生成与动态调整' },
  { name: 'Quizlet AI', mark: 'Q', strengths: ['学习场景明确', '擅长记忆和知识测试', '学习内容结构化程度高'], weaknesses: ['更偏知识记忆', '不解决整体学习规划问题', '对课程任务和 DDL 管理能力有限'], gap: '跨课程学习任务管理' },
];
export const marketOpportunities = [
  { title: 'AI 从「回答问题」向「完成任务」发展', level: '高', description: '用户逐渐期待 AI 不只是提供答案，而是能够持续帮助完成复杂任务和工作流程。' },
  { title: '学生需要更个性化的学习规划', level: '高', description: '不同学生的课程、考试时间、学习节奏不同，固定模板难以满足个性化学习需求。' },
  { title: 'AI Agent 在教育场景中的应用增加', level: '中', description: 'AI Agent 可以根据目标、进度和反馈动态调整任务，为学习管理类产品提供新的产品形态。' },
];
export const productOpportunities = [
  { title: 'AI 智能学习规划', level: '高', problem: '用户不知道如何把长期学习目标拆分成每天可以执行的任务。', solution: '让 AI 根据课程安排、Assignment DDL、考试时间和用户可学习时间，自动生成个性化学习计划。', tags: ['课程安排', 'Assignment DDL', '考试时间', '可学习时间'], logic: ['不会制定可执行的学习计划', '现有产品缺少自动学习规划', 'AI Agent 从回答问题转向任务执行'] },
  { title: '动态调整学习计划', level: '高', problem: '传统计划一旦被打乱，就很难继续执行。', solution: 'AI 根据用户每天的完成情况，自动重新安排剩余学习任务。', example: ['今天没有完成 Chapter 3', 'AI 自动调整未来三天计划'], logic: ['拖延使静态计划难以持续执行', '缺少针对学生的动态规划能力', 'AI Agent 可根据进度与反馈调整任务'] },
  { title: '多课程统一管理', level: '中高', problem: '学生的学习任务分散在不同平台。', solution: '在一个 AI 工作台中统一管理课程、作业、考试、学习任务和截止日期。', tags: ['Courses', 'Assignments', 'Exams', 'Study Tasks', 'Deadlines'], logic: ['多平台切换容易遗漏任务与截止日期', '竞品对跨课程任务和 DDL 管理有限', '学生需要适配不同课程与节奏的规划'] },
];
