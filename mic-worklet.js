class MicProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferSize = 2048;
    this.accum = new Float32Array(this.bufferSize);
    this.offset = 0;
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (!input || input.length === 0) {
      return true;
    }

    const ch0 = input[0];
    if (!ch0 || ch0.length === 0) {
      return true;
    }

    let srcOffset = 0;
    while (srcOffset < ch0.length) {
      const writable = this.bufferSize - this.offset;
      const readable = ch0.length - srcOffset;
      const n = Math.min(writable, readable);

      this.accum.set(ch0.subarray(srcOffset, srcOffset + n), this.offset);
      this.offset += n;
      srcOffset += n;

      if (this.offset === this.bufferSize) {
        this.port.postMessage(this.accum);
        this.accum = new Float32Array(this.bufferSize);
        this.offset = 0;
      }
    }

    return true;
  }
}

registerProcessor('mic-processor', MicProcessor);
