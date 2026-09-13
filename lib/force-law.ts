/** Signed correction to inward Newtonian force for ideal point masses. */
export function yukawaCorrection(alpha:number,range:number,separation:number){
 if(!Number.isFinite(alpha)||!Number.isFinite(range)||!Number.isFinite(separation)||range<=0||separation<=0)throw new RangeError('Finite values, positive range and separation are required');
 const ratio=separation/range;
 return alpha*(1+ratio)*Math.exp(-ratio);
}
