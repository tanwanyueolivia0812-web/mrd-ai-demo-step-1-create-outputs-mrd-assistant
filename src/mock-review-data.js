// Demo-only evidence enrichment. Not used by the review UI; replace alongside the mock research provider.
export function addMockReviewData(result){
 if(result.reviewSchema===1)return result;
 const sources=result.sources.map((s,index)=>({...s,credibility:s.researchCategory==='internal'?'low':index%4===0?'high':'medium',independenceGroup:s.researchCategory==='internal'?null:`demo-publisher-${index}`,qualityNote:'模拟质量标记，仅演示评估，不代表真实来源可靠性。'}));
 const evidence=[];
 const insights=result.insights.map((insight,index)=>{
  const type=insight.category==='opportunity'?'hypothesis':insight.id==='insight-user-0'||insight.category==='competitor'?'fact':'inference';
  const claims=insight.category==='competitor'?[insight.strength,insight.weakness].filter(Boolean):[insight.summary];
  const records=(insight.sourceIds||[]).map((sourceId,n)=>({id:`evidence-${insight.id}-${n}`,insightId:insight.id,sourceId,evidenceType:n===2&&insight.category!=='competitor'?'contradicting':n===3?'context':'supporting',snippet:n===2&&insight.category!=='competitor'?'部分用户表示，现有工具与个人习惯已经能够满足基本需求；这一问题并非对所有用户都同样突出。':claims[n%claims.length]||insight.summary,summary:'模拟证据摘要，非原文引述。',aiInterpretation:n===2&&insight.category!=='competitor'?'这一反向线索提示结论存在适用边界，应避免推广到所有目标用户。':n===3?'作为相关背景补充，不能单独证明结论。':'这一示例线索与洞察描述的现象相关，需要结合其他来源及目标用户进一步核验。',isMock:true}));
  evidence.push(...records);
  return {...insight,insightType:type,evidenceIds:records.map(e=>e.id),reasoning:{evidenceSummary:records.filter(e=>e.evidenceType==='supporting').slice(0,2).map(e=>e.snippet),pattern:insight.category==='competitor'?'不同产品在定位与能力覆盖上存在差异。':'多条示例线索呈现出相近问题，同时存在人群差异和适用边界。',conclusion:insight.summary}};
 });
 return {...result,reviewSchema:1,categories:[{id:'user',label:'用户需求'},{id:'competitor',label:'竞品'},{id:'market',label:'市场'},{id:'opportunity',label:'产品机会'},{id:'scope',label:'研究范围'}],sources,evidence,insights};
}
