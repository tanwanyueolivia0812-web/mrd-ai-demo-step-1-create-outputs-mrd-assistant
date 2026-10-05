// Templates describe order and section roles; the renderer never assumes a section count.
export const MRD_TEMPLATES=[{id:'standard',name:'Standard MRD',available:true,sections:[
{id:'summary',type:'executive_summary',title:{zh:'执行摘要',en:'Executive Summary'}},
{id:'background',type:'market_background',title:{zh:'市场背景',en:'Market Background'}},
{id:'customer',type:'target_customer',title:{zh:'目标用户',en:'Target Customer'}},
{id:'needs',type:'user_needs',title:{zh:'用户需求与问题',en:'User Needs & Problems'}},
{id:'landscape',type:'competitive_landscape',title:{zh:'市场与竞品格局',en:'Market & Competitor Landscape'}},
{id:'opportunities',type:'market_opportunities',title:{zh:'市场机会',en:'Market Opportunities'}},
{id:'positioning',type:'product_positioning',title:{zh:'产品定位',en:'Product Positioning'}},
{id:'requirements',type:'core_requirements',title:{zh:'核心需求',en:'Core Requirements'}},
{id:'priorities',type:'requirement_priorities',title:{zh:'需求优先级',en:'Requirement Priorities'}},
{id:'risks',type:'risks',title:{zh:'风险与研究缺口',en:'Risks & Research Gaps'}},
{id:'success',type:'success_criteria',title:{zh:'成功标准',en:'Success Criteria'}},
{id:'appendix',type:'appendix',title:{zh:'研究附录',en:'Research Appendix'}}]},
...['Lean MRD','B2B MRD','Consumer Product MRD','New Market Entry MRD'].map(name=>({id:name.toLowerCase().replaceAll(' ','-'),name,available:false,sections:[]}))];
export const CATEGORY_ROLES={user:'user',user_need:'user',user_insight:'user',user_insights:'user',customer_segment:'user',competitor:'competitor',competitor_insight:'competitor',market:'market',industry:'market',technology:'market',opportunity:'opportunity',product_opportunity:'opportunity',feature_gap:'opportunity',risk:'risk',regulation:'risk',business:'context',business_model:'context',pricing:'context',channel:'context'};
export const languageFromBrief=value=>value==='英文'?'en':value==='中文'?'zh':'bilingual';
export const localized=(language,zh,en)=>zh===en?zh:language==='en'?en:language==='zh'?zh:`${zh} / ${en}`;
export function sectionTitle(section,language){if(typeof section.title==='string')return section.title;return localized(language,section.title.zh,section.title.en)}
