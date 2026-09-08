const requiredSections=['Role','Purpose','Objectives','Best Used For','Required Inputs','Required Tools or Access','Workflow','Rules','Constraints','Permissions and Approval Rules','Best Practices','Quality Check','Output Format','Failure Handling','Source Grounding','Version'];
const starterSkills=[
 {name:'File Retrieval',job:'Locate and return the correct file or information source efficiently.',tags:['Files','Retrieval']},
 {name:'Task Documentation',job:'Turn completed work into clear, reusable task documentation.',tags:['Docs','Workflow']},
 {name:'File Organization',job:'Organize files using consistent naming, folders, and handling rules.',tags:['Files','Organization']}
];
const prompt=`You are creating a reusable AI skill for the Hopeworks Skill Library.

Using ONLY information contained in the sources attached to this NotebookLM notebook, create a production-ready SKILL.md file.

CORE PRINCIPLE:
One Skill = One Job.

The skill must perform one clearly defined capability. Do not combine unrelated jobs into one skill.

GROUNDING RULES:
- Use only information supported by the provided sources.
- Do not invent facts, procedures, requirements, policies, tools, or best practices.
- If the sources do not contain enough information to support a section, explicitly state that the information is not defined by the provided sources.
- Preserve important limitations, warnings, and requirements from the sources.
- Do not silently fill knowledge gaps with general knowledge.

Create the SKILL.md using this structure:

# Skill Name
## Role
## Purpose
## Objectives
## Best Used For
## Required Inputs
## Required Tools or Access
## Workflow
## Rules
## Constraints
## Permissions and Approval Rules
Separate actions into Read, Create, Modify, Destructive, and External Action. Clearly identify actions requiring human authorization.
## Best Practices
## Quality Check
## Output Format
## Failure Handling
## Examples
## Source Grounding
List which provided sources informed the skill and briefly state what each contributed.
## Version
Set the initial version to 1.0.0.

FINAL VALIDATION:
1. The skill performs one primary job.
2. Every factual rule is supported by the supplied sources.
3. No unsupported information was invented.
4. Required tools and permissions are identified.
5. Destructive or external actions have appropriate approval boundaries.
6. The workflow is clear enough for another AI to execute.
7. The output format is explicitly defined.
8. The skill can function as a reusable instruction file rather than a one-time prompt.

Return ONLY the finished SKILL.md in Markdown format. Do not include commentary before or after the file.`;

document.querySelector('#notebookPrompt').value=prompt;
const grid=document.querySelector('#skillGrid');
starterSkills.forEach(s=>grid.insertAdjacentHTML('beforeend',`<article class="card"><p class="eyebrow">SKILL</p><h2>${s.name}</h2><p>${s.job}</p><div>${s.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div></article>`));

document.querySelectorAll('.nav').forEach(btn=>btn.onclick=()=>show(btn.dataset.view,btn));
document.querySelector('#newSkill').onclick=()=>show('builder',document.querySelector('[data-view="builder"]'));
function show(id,btn){document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));document.querySelector('#'+id).classList.add('active-view');document.querySelectorAll('.nav').forEach(n=>n.classList.remove('active'));btn?.classList.add('active');document.querySelector('#pageTitle').textContent=id==='builder'?'Skill Builder':id==='validator'?'Validator':'Skill Library';}

document.querySelector('#copyPrompt').onclick=()=>copy(prompt,'NotebookLM prompt copied.');
document.querySelector('#copySkillBtn').onclick=()=>copy(document.querySelector('#skillInput').value,'SKILL.md copied.');
async function copy(text,msg){await navigator.clipboard.writeText(text);const el=document.querySelector('#validation');el.textContent=msg;el.className='validation pass';}

function hasHeading(md,name){const escaped=name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return new RegExp(`^#{1,3}\\s+${escaped}\\s*$`,'im').test(md)}
function validate(md){
 const checks=requiredSections.map(name=>({name,pass:hasHeading(md,name)}));
 const title=/^#\s+.+/m.test(md);
 const permissionTerms=['Read','Create','Modify','Destructive','External Action'];
 const permissions=permissionTerms.every(x=>new RegExp(x,'i').test(md));
 const grounded=/Source Grounding/i.test(md);
 const version=/1\.0\.0/.test(md);
 const oneJob=document.querySelector('#singleJob').value.trim().length>8;
 return [{name:'Skill title',pass:title},{name:'One job defined in builder',pass:oneJob},...checks,{name:'Permission categories',pass:permissions},{name:'Source grounding section',pass:grounded},{name:'Version 1.0.0',pass:version}];
}
function renderValidation(results){const box=document.querySelector('#validation');const passed=results.filter(x=>x.pass).length;const ok=passed===results.length;box.className='validation '+(ok?'pass':'fail');box.innerHTML=`<strong>${ok?'VALIDATION PASSED':'Needs work'} · ${passed}/${results.length}</strong>`+results.map(r=>`<div class="rule"><span>${r.name}</span><b>${r.pass?'✓':'✕'}</b></div>`).join('');document.querySelector('#downloadBtn').disabled=!ok;document.querySelector('#copySkillBtn').disabled=!ok;}
document.querySelector('#validateBtn').onclick=()=>{const md=document.querySelector('#skillInput').value.trim();if(!md){document.querySelector('#validation').textContent='Paste a SKILL.md first.';return}renderValidation(validate(md));};
document.querySelector('#downloadBtn').onclick=()=>{const md=document.querySelector('#skillInput').value;const name=(document.querySelector('#skillName').value||'hopeworks-skill').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');const blob=new Blob([md],{type:'text/markdown'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${name}-SKILL.md`;a.click();URL.revokeObjectURL(a.href);};

document.querySelector('#rules').innerHTML=['One Skill = One Job','Ground claims in supplied sources','Required tools/access are explicit','Human approval protects destructive/external actions','Workflow is executable by another AI','Output format is defined','Source grounding is preserved','Canonical skill stays platform-neutral'].map(x=>`<div class="rule"><span>${x}</span><b>Required</b></div>`).join('');