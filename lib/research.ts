export const tasks=[
 {id:'R01',title:'Reproduce the experimental fit',area:'Data analysis',description:'Verify checksums, weighted mean, chi-squared and shared-nuisance uncertainty. Submit code and numerical checks.'},
 {id:'R02',title:'Resolve the missing block',area:'Provenance',description:'Explain 553 deposited rows versus 552 described blocks using primary evidence. Do not select a deletion to improve agreement.'},
 {id:'R03',title:'Recover apparatus metrology',area:'Experiment',description:'Find numerical source/probe positions, covariance and near/far geometry for Panda or original Eöt-Wash torque data.'},
 {id:'R04',title:'Audit the finite-source solution',area:'Computation',description:'Independently integrate the slotted cylinder. Quantify finite-cloud averaging and coordinate sensitivity.'},
 {id:'R05',title:'Derive the coupled dynamical operator',area:'Field theory',description:'Retain scalar amplitude, phase, vector modes and Gauss constraints in the Nelson–Walsh model. State gauge and boundary conditions.'},
 {id:'R06',title:'Solve a nonlinear benchmark',area:'Computation',description:'Specify a physical branch and charge sector; provide residuals, mesh/domain convergence and a reproducible solver before claiming stability.'},
 {id:'R07',title:'Audit the literature register',area:'Evidence review',description:'Check individual claims against primary sources. Distinguish measurements, theoretical results and unsupported engineering claims.'}
];
export const findings={status:'No significant anomalous force',peer_reviewed:false,n:553,mean_nm_s2:33.096184655936035,statistical_sigma_nm_s2:5.610010301823207,excess_nm_s2:-2.1038153440639675,excess_sigma_nm_s2:6.288705398296418,interval95_nm_s2:[-14.429451434107223,10.221820745979288],limitations:['553/552 discrepancy unresolved','Probe coordinates assumed; geometry normalized to published prediction','Spectrum is homogeneous Proca, not nonlinear coupled model','No global constraint fit completed']};
