# Free transcription tools

`public/tools/transcribe.html` runs an English Whisper tiny model in a browser worker. The browser reads a selected audio file, decodes/resamples it to mono 16 kHz, and sends samples to its local worker. The speech model downloads from Hugging Face. Selected audio is not uploaded by this implementation. A third-party model download still exposes ordinary request information to the model host.

No caption service, paid API or server GPU is required. Maximum input: 100 MB / 20 minutes per clip. Enter the clip offset to preserve source-video timestamps. Scientific transcription needs manual correction; the small English model is chosen for modest device requirements, not publication accuracy.

SRT/VTT import, JSON export with file SHA-256/provenance, editable text export and SRT export are included. Edits to the plain-text draft do not silently alter original segment timestamps. Null ending timestamps are retained in JSON and omitted from SRT.

A video URL is provenance, not permission or an audio download. No cookies, DRM workarounds, access-control bypasses or protected transcript retrieval are implemented. Use a file you can lawfully process. Do not redistribute third-party transcripts without the necessary rights.

Build: install locked project dependencies, then run `node scripts/build-transcriber.mjs`. This bundles the browser worker and required ONNX runtime assets. Main project prebuild also runs it.

Current acceptance status is in `/research/REQUEST-AUDIT.md`. A built interface alone is not a completed transcription of the four requested videos.

Primary implementation references: https://huggingface.co/docs/transformers.js/en/pipelines and https://github.com/huggingface/transformers.js .

Public caption retrieval: `python tools/transcription/retrieve_captions.py --out PRIVATE_DIRECTORY` checks the four supplied videos and writes a provenance/status register. It attempts ordinary listed English caption endpoints only. Empty or inaccessible responses remain failures; there is no speech reconstruction from metadata. Retrieved text stays private until reviewed and appropriately licensed.

Checked: caption parser/export and a synthetic English speech fixture on the CPU backend. Browser-WASM end-to-end testing and transcription of the four actual videos remain pending. The website build passed.
