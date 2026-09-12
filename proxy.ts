import {NextRequest,NextResponse} from 'next/server';
import {classifyVisitor,recordVisit} from '@/lib/visit-counter';

export async function proxy(request:NextRequest){
  try{await recordVisit(classifyVisitor(request.headers.get('user-agent')||''));}catch{}
  return NextResponse.next();
}

export const config={matcher:['/']};
