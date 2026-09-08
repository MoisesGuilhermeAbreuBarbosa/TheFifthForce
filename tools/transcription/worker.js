import {pipeline,env} from '@huggingface/transformers';
env.allowLocalModels=false;
env.backends.onnx.wasm.numThreads=1;
env.backends.onnx.wasm.wasmPaths='/tools/vendor/';
let recognizer;
self.onmessage=async({data})=>{
 try{
  if(!(data.audio instanceof Float32Array)||data.audio.length===0||data.audio.length>16000*1200)throw Error('Choose audio up to 20 minutes. Split longer recordings into clips.');
  recognizer??=await pipeline('automatic-speech-recognition','Xenova/whisper-tiny.en',{device:'wasm',dtype:'q8',progress_callback:p=>{if(p.status==='progress')self.postMessage({type:'progress',text:`Loading speech model: ${Math.round(p.progress)}%`});}});
  self.postMessage({type:'progress',text:'Transcribing on your device. Longer clips may take several minutes.'});
  const result=await recognizer(data.audio,{return_timestamps:true,chunk_length_s:30,stride_length_s:5});
  self.postMessage({type:'result',result});
 }catch(e){self.postMessage({type:'error',text:String(e.message||e)});}
};
