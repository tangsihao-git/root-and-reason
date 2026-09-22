import katex from 'katex';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
function CaptionText({text}:{text:string}) {
 return <>{text.split(/(?<!\\)\$([^$]+)(?<!\\)\$/g).map((part,index)=>index%2
  ?<span key={index} data-tex={part} tabIndex={0} role="button" title="点击复制 LaTeX" aria-label={`复制 LaTeX：${part}`} dangerouslySetInnerHTML={{__html:katex.renderToString(part,{displayMode:false,throwOnError:false,trust:false})}}/>
  :part)}</>;
}
export function DocFigure({src,alt,caption,label,id,kind}:{src:string;alt:string;caption:string;label?:string;id?:string;kind?:string}) {
 const prefix=!label?caption.match(/^([图表]\s*\d+(?:[.\-–]\d+)*)[\s　]*/):null;
 const displayLabel=label||prefix?.[1];
 const description=prefix?caption.slice(prefix[0].length):caption;
 return <figure id={id} className={`doc-figure ${kind==='schematic'?'schematic':''}`}><a href={basePath+src} target="_blank" rel="noreferrer" title="查看原图"><img src={basePath+src} alt={alt} loading="lazy"/></a><figcaption>{displayLabel&&<span className="caption-label">{displayLabel.split(/(\d+(?:[.\-–]\d+)*)/).map((part,index)=>/^\d/.test(part)?<span className="caption-number" key={index}>{part}</span>:part)}　</span>}<CaptionText text={description}/></figcaption></figure>;
}
