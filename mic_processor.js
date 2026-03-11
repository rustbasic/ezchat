class MicProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0];
    if (input && input[0]) {
      const ch0 = input[0];
      this.port.postMessage(ch0.slice().buffer, [ch0.slice().buffer]);
    }
    return true;
  }
}
registerProcessor('mic-processor', MicProcessor);
