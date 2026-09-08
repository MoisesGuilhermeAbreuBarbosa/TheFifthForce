"use client";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import {Table,TableHeader,TableBody,TableRow,TableHead,TableCell} from '@/components/ui/table';
import 'katex/dist/katex.min.css';
export default function Markdown({content}:{content:string}) {return <div className="scientific-prose"><ReactMarkdown skipHtml remarkPlugins={[remarkGfm,remarkMath]} rehypePlugins={[[rehypeKatex,{trust:false,throwOnError:false}]]} components={{table:({node,...props})=><Table {...props}/>,thead:({node,...props})=><TableHeader {...props}/>,tbody:({node,...props})=><TableBody {...props}/>,tr:({node,...props})=><TableRow {...props}/>,th:({node,...props})=><TableHead {...props}/>,td:({node,...props})=><TableCell {...props}/>,a:({node,...props})=><a {...props} rel="nofollow noopener noreferrer"/>}}>{content}</ReactMarkdown></div>}
