class MicProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferSize = 8192;
    this.accum = new Float32Array(this.bufferSize);
    this.offset = 0;
    this.stopped = false;

    this.port.onmessage = (event) => {
      const msg = event.data;
      if (msg === 'flush') {
        if (this.offset > 0) {
          const tail = this.accum.subarray(0, this.offset);
          const copy = new Float32Array(tail.length);
          copy.set(tail);
          this.port.postMessage(copy.buffer, [copy.buffer]);
          this.offset = 0;
        }
      } else if (msg === 'stop') {
        if (this.offset > 0) {
          const tail = this.accum.subarray(0, this.offset);
          const copy = new Float32Array(tail.length);
          copy.set(tail);
          this.port.postMessage(copy.buffer, [copy.buffer]);
          this.offset = 0;
        }
        this.stopped = true;
      }
    };
  }

  process(inputs) {
    if (this.stopped) return false;

    const input = inputs[0];
    if (!input || input.length === 0) return true;

    const ch0 = input[0];
    if (!ch0 || ch0.length === 0) return true;

    let srcOffset = 0;
    while (srcOffset < ch0.length) {
      const writable = this.bufferSize - this.offset;
      const readable = ch0.length - srcOffset;
      const n = Math.min(writable, readable);

      this.accum.set(ch0.subarray(srcOffset, srcOffset + n), this.offset);
      this.offset += n;
      srcOffset += n;

      if (this.offset === this.bufferSize) {
        const out = this.accum;
        this.port.postMessage(out.buffer, [out.buffer]);
        this.accum = new Float32Array(this.bufferSize);
        this.offset = 0;
      }
    }

    return true;
  }
}

registerProcessor('mic-processor', MicProcessor);
