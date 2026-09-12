import {getVisitCounts} from '@/lib/visit-counter';
import archivedCounts from '@/public/research/visit-counts.json';

export const dynamic='force-dynamic';

export async function GET(){
  try{
    const counts=await getVisitCounts();
    return Response.json(counts?{available:true,...counts,measurement:'page accesses',classification:'declared request user-agent',archive:archivedCounts}:{available:false,archive:archivedCounts},{headers:{'cache-control':'no-store'}});
  }catch{return Response.json({available:false,archive:archivedCounts},{headers:{'cache-control':'no-store'}});}
}
