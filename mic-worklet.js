class MicProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferFrames = 4096;
    this.channelCount = 1;
    this.accum = new Float32Array(this.bufferFrames * this.channelCount);
    this.offsetFrames = 0;
    this.stopped = false;
    this.reported = false;

    this.port.onmessage = (event) => {
      const msg = event.data;

      if (msg && msg.type === 'config') {
        this.channelCount = Math.max(1, Math.min(2, msg.channelCount || 1));
        this.accum = new Float32Array(this.bufferFrames * this.channelCount);
        this.offsetFrames = 0;
        this.reported = false;
      } else if (msg === 'flush') {
        this.flush();
      } else if (msg === 'stop') {
        this.flush();
        this.port.postMessage({ type: "stopped" });
        this.stopped = true;
      }
    };
  }

  flush() {
    if (this.offsetFrames > 0) {
      const used = this.offsetFrames * this.channelCount;
      const tail = this.accum.subarray(0, used);
      const copy = new Float32Array(tail.length);
      copy.set(tail);
      this.port.postMessage(copy.buffer, [copy.buffer]);
      this.offsetFrames = 0;
    }
  }

  process(inputs) {
    if (this.stopped) return false;

    const input = inputs[0];
    if (!input || input.length === 0) return true;

    const availableChannels = input.length;
    const frames = input[0]?.length || 0;
    if (frames === 0) return true;

    if (!this.reported) {
      this.port.postMessage({
        type: "channels",
        inputChannelCount: availableChannels,
        recordedChannelCount: this.channelCount
      });
      this.reported = true;
    }

    let srcFrame = 0;
    while (srcFrame < frames) {
      const writableFrames = this.bufferFrames - this.offsetFrames;
      const readableFrames = frames - srcFrame;
      const n = Math.min(writableFrames, readableFrames);

      for (let i = 0; i < n; i++) {
        const dstBase = (this.offsetFrames + i) * this.channelCount;
        for (let ch = 0; ch < this.channelCount; ch++) {
          const src = ch < availableChannels ? input[ch] : input[0];
          this.accum[dstBase + ch] = src[srcFrame + i];
        }
      }

      this.offsetFrames += n;
      srcFrame += n;

      if (this.offsetFrames === this.bufferFrames) {
        const out = this.accum;
        this.port.postMessage(out.buffer, [out.buffer]);
        this.accum = new Float32Array(this.bufferFrames * this.channelCount);
        this.offsetFrames = 0;
      }
    }

    return true;
  }
}

registerProcessor('mic-processor', MicProcessor);
