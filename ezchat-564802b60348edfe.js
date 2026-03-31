export class IntoUnderlyingByteSource {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingByteSourceFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingbytesource_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get autoAllocateChunkSize() {
        const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingbytesource_cancel(ptr);
    }
    /**
     * @param {ReadableByteStreamController} controller
     * @returns {Promise<any>}
     */
    pull(controller) {
        const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, controller);
        return ret;
    }
    /**
     * @param {ReadableByteStreamController} controller
     */
    start(controller) {
        wasm.intounderlyingbytesource_start(this.__wbg_ptr, controller);
    }
    /**
     * @returns {ReadableStreamType}
     */
    get type() {
        const ret = wasm.intounderlyingbytesource_type(this.__wbg_ptr);
        return __wbindgen_enum_ReadableStreamType[ret];
    }
}
if (Symbol.dispose) IntoUnderlyingByteSource.prototype[Symbol.dispose] = IntoUnderlyingByteSource.prototype.free;

export class IntoUnderlyingSink {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSinkFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsink_free(ptr, 0);
    }
    /**
     * @param {any} reason
     * @returns {Promise<any>}
     */
    abort(reason) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_abort(ptr, reason);
        return ret;
    }
    /**
     * @returns {Promise<any>}
     */
    close() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_close(ptr);
        return ret;
    }
    /**
     * @param {any} chunk
     * @returns {Promise<any>}
     */
    write(chunk) {
        const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, chunk);
        return ret;
    }
}
if (Symbol.dispose) IntoUnderlyingSink.prototype[Symbol.dispose] = IntoUnderlyingSink.prototype.free;

export class IntoUnderlyingSource {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSourceFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsource_free(ptr, 0);
    }
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingsource_cancel(ptr);
    }
    /**
     * @param {ReadableStreamDefaultController} controller
     * @returns {Promise<any>}
     */
    pull(controller) {
        const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, controller);
        return ret;
    }
}
if (Symbol.dispose) IntoUnderlyingSource.prototype[Symbol.dispose] = IntoUnderlyingSource.prototype.free;

/**
 * Format that each sample has. Usually, this corresponds to the sampling
 * depth of the audio source. For example, 16 bit quantized samples can be
 * encoded in `i16` or `u16`. Note that the quantized sampling depth is not
 * directly visible for formats where [`is_float`] is true.
 *
 * Also note that the backend must support the encoding of the quantized
 * samples in the given format, as there is no generic transformation from one
 * format into the other done inside the frontend-library code. You can query
 * the supported formats by using [`supported_input_configs`].
 *
 * A good rule of thumb is to use [`SampleFormat::I16`] as this covers typical
 * music (WAV, MP3) as well as typical audio input devices on most platforms,
 *
 * [`is_float`]: SampleFormat::is_float
 * [`supported_input_configs`]: crate::traits::DeviceTrait::supported_input_configs
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14}
 */
export const SampleFormat = Object.freeze({
    /**
     * `i8` with a valid range of `i8::MIN..=i8::MAX` with `0` being the origin.
     */
    I8: 0, "0": "I8",
    /**
     * `i16` with a valid range of `i16::MIN..=i16::MAX` with `0` being the origin.
     */
    I16: 1, "1": "I16",
    /**
     * `I24` with a valid range of `-(1 << 23)..=((1 << 23) - 1)` with `0` being the origin.
     *
     * This format uses 4 bytes of storage but only 24 bits are significant.
     */
    I24: 2, "2": "I24",
    /**
     * `i32` with a valid range of `i32::MIN..=i32::MAX` with `0` being the origin.
     */
    I32: 3, "3": "I32",
    /**
     * `i64` with a valid range of `i64::MIN..=i64::MAX` with `0` being the origin.
     */
    I64: 4, "4": "I64",
    /**
     * `u8` with a valid range of `u8::MIN..=u8::MAX` with `1 << 7 == 128` being the origin.
     */
    U8: 5, "5": "U8",
    /**
     * `u16` with a valid range of `u16::MIN..=u16::MAX` with `1 << 15 == 32768` being the origin.
     */
    U16: 6, "6": "U16",
    /**
     * `U24` with a valid range of `0..=((1 << 24) - 1)` with `1 << 23 == 8388608` being the origin.
     *
     * This format uses 4 bytes of storage but only 24 bits are significant.
     */
    U24: 7, "7": "U24",
    /**
     * `u32` with a valid range of `u32::MIN..=u32::MAX` with `1 << 31` being the origin.
     */
    U32: 8, "8": "U32",
    /**
     * `U48` with a valid range of '0..(1 << 48)' with `1 << 47` being the origin
     * `u64` with a valid range of `u64::MIN..=u64::MAX` with `1 << 63` being the origin.
     */
    U64: 9, "9": "U64",
    /**
     * `f32` with a valid range of `-1.0..=1.0` with `0.0` being the origin.
     */
    F32: 10, "10": "F32",
    /**
     * `f64` with a valid range of `-1.0..=1.0` with `0.0` being the origin.
     */
    F64: 11, "11": "F64",
    /**
     * DSD 1-bit stream in u8 container (8 bits = 8 DSD samples) with 0x69 being the silence byte pattern.
     */
    DsdU8: 12, "12": "DsdU8",
    /**
     * DSD 1-bit stream in u16 container (16 bits = 16 DSD samples) with 0x69 being the silence byte pattern.
     */
    DsdU16: 13, "13": "DsdU16",
    /**
     * DSD 1-bit stream in u32 container (32 bits = 32 DSD samples) with 0x69 being the silence byte pattern.
     */
    DsdU32: 14, "14": "DsdU32",
});

/**
 * The set of parameters used to describe how to open a stream.
 *
 * The sample format is omitted in favour of using a sample type.
 *
 * See also [`BufferSize`] for details on buffer size behavior and latency considerations.
 */
export class StreamConfig {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StreamConfigFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_streamconfig_free(ptr, 0);
    }
    /**
     * @returns {number | undefined}
     */
    get buffer_size() {
        const ret = wasm.__wbg_get_streamconfig_buffer_size(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {number}
     */
    get channels() {
        const ret = wasm.__wbg_get_streamconfig_channels(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get sample_rate() {
        const ret = wasm.__wbg_get_streamconfig_sample_rate(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number | null} [arg0]
     */
    set buffer_size(arg0) {
        wasm.__wbg_set_streamconfig_buffer_size(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @param {number} arg0
     */
    set channels(arg0) {
        wasm.__wbg_set_streamconfig_channels(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set sample_rate(arg0) {
        wasm.__wbg_set_streamconfig_sample_rate(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) StreamConfig.prototype[Symbol.dispose] = StreamConfig.prototype.free;

function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_boolean_get_6abe7d340f528f63: function(arg0) {
            const v = arg0;
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_debug_string_8baecc377ad92880: function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_in_840bcdd0dba8d13c: function(arg0, arg1) {
            const ret = arg0 in arg1;
            return ret;
        },
        __wbg___wbindgen_is_falsy_f8005c4864e74c90: function(arg0) {
            const ret = !arg0;
            return ret;
        },
        __wbg___wbindgen_is_function_d4c2480b46f29e33: function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_object_e04e3a51a90cde43: function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_undefined_5957b329897cc39c: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_number_get_4fcba947d278ad7c: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_ae6081df8158aa73: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_bd5a70920abf0236: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg__wbg_cb_unref_207c541c2d58dfb3: function(arg0) {
            arg0._wbg_cb_unref();
        },
        __wbg_activeElement_cfc711b0738ba754: function(arg0) {
            const ret = arg0.activeElement;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_activeElement_d652ca030dafc89a: function(arg0) {
            const ret = arg0.activeElement;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_activeTexture_9c2e6aa83f9ff71f: function(arg0, arg1) {
            arg0.activeTexture(arg1 >>> 0);
        },
        __wbg_activeTexture_d7776bac3a6d7d81: function(arg0, arg1) {
            arg0.activeTexture(arg1 >>> 0);
        },
        __wbg_addEventListener_08e194e8fe195b37: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3, arg4);
        }, arguments); },
        __wbg_addEventListener_c3f2f004f4fa2158: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3);
        }, arguments); },
        __wbg_altKey_623814ca5e7abb1b: function(arg0) {
            const ret = arg0.altKey;
            return ret;
        },
        __wbg_altKey_b7cd0d9a18b626b5: function(arg0) {
            const ret = arg0.altKey;
            return ret;
        },
        __wbg_appendChild_023bbb6d63210eba: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.appendChild(arg1);
            return ret;
        }, arguments); },
        __wbg_arrayBuffer_5d543febf098c9ac: function(arg0) {
            const ret = arg0.arrayBuffer();
            return ret;
        },
        __wbg_arrayBuffer_8ecc0a6b9389c2f0: function() { return handleError(function (arg0) {
            const ret = arg0.arrayBuffer();
            return ret;
        }, arguments); },
        __wbg_at_858343696477686d: function(arg0, arg1) {
            const ret = arg0.at(arg1);
            return ret;
        },
        __wbg_attachShader_08f9dc290f7f21cc: function(arg0, arg1, arg2) {
            arg0.attachShader(arg1, arg2);
        },
        __wbg_attachShader_bf3db0e95841cd87: function(arg0, arg1, arg2) {
            arg0.attachShader(arg1, arg2);
        },
        __wbg_bindBuffer_7e9a97580c172350: function(arg0, arg1, arg2) {
            arg0.bindBuffer(arg1 >>> 0, arg2);
        },
        __wbg_bindBuffer_dfc10755fbcf7688: function(arg0, arg1, arg2) {
            arg0.bindBuffer(arg1 >>> 0, arg2);
        },
        __wbg_bindTexture_9560807e79c79e9e: function(arg0, arg1, arg2) {
            arg0.bindTexture(arg1 >>> 0, arg2);
        },
        __wbg_bindTexture_adcc93a197a861bd: function(arg0, arg1, arg2) {
            arg0.bindTexture(arg1 >>> 0, arg2);
        },
        __wbg_bindVertexArrayOES_5a903bbe60cd30d4: function(arg0, arg1) {
            arg0.bindVertexArrayOES(arg1);
        },
        __wbg_bindVertexArray_b536f88ef905a6ac: function(arg0, arg1) {
            arg0.bindVertexArray(arg1);
        },
        __wbg_blendEquationSeparate_9f1e2055fa2e7076: function(arg0, arg1, arg2) {
            arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_blendEquationSeparate_9f64c05b6971ddb3: function(arg0, arg1, arg2) {
            arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_blendFuncSeparate_56946f7dffea79ff: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
        },
        __wbg_blendFuncSeparate_cb15d1499ea79a3a: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
        },
        __wbg_blockSize_4b05e54ab26f00ff: function(arg0) {
            const ret = arg0.blockSize;
            return ret;
        },
        __wbg_blur_6d175b984c318aa6: function() { return handleError(function (arg0) {
            arg0.blur();
        }, arguments); },
        __wbg_body_36314a75ae5381db: function(arg0) {
            const ret = arg0.body;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_body_beec15cfa6418ebc: function(arg0) {
            const ret = arg0.body;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_bottom_c86a41d512913e7c: function(arg0) {
            const ret = arg0.bottom;
            return ret;
        },
        __wbg_bufferData_2eb007f9cc031f1d: function(arg0, arg1, arg2, arg3) {
            arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_bufferData_fccd5262811b54a2: function(arg0, arg1, arg2, arg3) {
            arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_buffer_7995e62a0d5aa86b: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_button_6ff6ec7a5996d7c3: function(arg0) {
            const ret = arg0.button;
            return ret;
        },
        __wbg_byobRequest_c811916d08114911: function(arg0) {
            const ret = arg0.byobRequest;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_byteLength_8aac0bae101c5258: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteOffset_2eccc0773963d3fd: function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        },
        __wbg_call_1aea13500fe8ff6c: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_call_faf6b66fc4667ce6: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.call(arg1);
            return ret;
        }, arguments); },
        __wbg_cancelAnimationFrame_e4f634a350c9abea: function() { return handleError(function (arg0, arg1) {
            arg0.cancelAnimationFrame(arg1);
        }, arguments); },
        __wbg_cancel_9f06f2f58509e39a: function(arg0) {
            const ret = arg0.cancel();
            return ret;
        },
        __wbg_catch_3f5030086f7b1bd3: function(arg0, arg1) {
            const ret = arg0.catch(arg1);
            return ret;
        },
        __wbg_changedTouches_2d6b95d980b636fb: function(arg0) {
            const ret = arg0.changedTouches;
            return ret;
        },
        __wbg_clearColor_60597fdb4a95724a: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.clearColor(arg1, arg2, arg3, arg4);
        },
        __wbg_clearColor_76ab1d644be45073: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.clearColor(arg1, arg2, arg3, arg4);
        },
        __wbg_clearInterval_a61bfe337d831347: function(arg0, arg1) {
            arg0.clearInterval(arg1);
        },
        __wbg_clear_02b91fe3c1160f4b: function(arg0, arg1) {
            arg0.clear(arg1 >>> 0);
        },
        __wbg_clear_fec66fb050661e6a: function(arg0, arg1) {
            arg0.clear(arg1 >>> 0);
        },
        __wbg_click_316acb1784cf5f8f: function(arg0) {
            arg0.click();
        },
        __wbg_clientX_12f0ab24c24904f0: function(arg0) {
            const ret = arg0.clientX;
            return ret;
        },
        __wbg_clientX_8c81ad57ed84961f: function(arg0) {
            const ret = arg0.clientX;
            return ret;
        },
        __wbg_clientY_241f3b4550ee7a11: function(arg0) {
            const ret = arg0.clientY;
            return ret;
        },
        __wbg_clientY_6bacb3cc0e8c6e24: function(arg0) {
            const ret = arg0.clientY;
            return ret;
        },
        __wbg_clipboardData_0b6c72dd3156dbc2: function(arg0) {
            const ret = arg0.clipboardData;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_clipboard_855de0b742a93c01: function(arg0) {
            const ret = arg0.clipboard;
            return ret;
        },
        __wbg_close_3ada062587678dbb: function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments); },
        __wbg_close_5ca6cc6dcfa7ad34: function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments); },
        __wbg_close_c04d3e7b3df0d98f: function() { return handleError(function (arg0) {
            const ret = arg0.close();
            return ret;
        }, arguments); },
        __wbg_colorMask_9af657e57e8c55fc: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
        },
        __wbg_colorMask_fe066b286e037add: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
        },
        __wbg_compileShader_b489b59d862a0656: function(arg0, arg1) {
            arg0.compileShader(arg1);
        },
        __wbg_compileShader_e1741f6f6b22f200: function(arg0, arg1) {
            arg0.compileShader(arg1);
        },
        __wbg_connect_7c0e2ff1c4cf1e92: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.connect(arg1);
            return ret;
        }, arguments); },
        __wbg_contentBoxSize_11ce9033f81acf51: function(arg0) {
            const ret = arg0.contentBoxSize;
            return ret;
        },
        __wbg_contentRect_a22ec0c09ccde322: function(arg0) {
            const ret = arg0.contentRect;
            return ret;
        },
        __wbg_copyToChannel_267cd1b95ea933bd: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.copyToChannel(getArrayF32FromWasm0(arg1, arg2), arg3);
        }, arguments); },
        __wbg_createAnalyser_32b33b0a57d5f27e: function() { return handleError(function (arg0) {
            const ret = arg0.createAnalyser();
            return ret;
        }, arguments); },
        __wbg_createBufferSource_29170d8f4910f1d7: function() { return handleError(function (arg0) {
            const ret = arg0.createBufferSource();
            return ret;
        }, arguments); },
        __wbg_createBuffer_51038b526ef93816: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.createBuffer(arg1 >>> 0, arg2 >>> 0, arg3);
            return ret;
        }, arguments); },
        __wbg_createBuffer_634aae6afc8603fa: function(arg0) {
            const ret = arg0.createBuffer();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createBuffer_cb32bba0a245b5f0: function(arg0) {
            const ret = arg0.createBuffer();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createElement_22af76933a7b7e81: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createElement(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_createGain_491b54328898a629: function() { return handleError(function (arg0) {
            const ret = arg0.createGain();
            return ret;
        }, arguments); },
        __wbg_createMediaStreamSource_96b076db9525eb0a: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createMediaStreamSource(arg1);
            return ret;
        }, arguments); },
        __wbg_createObjectURL_2208364127a91493: function() { return handleError(function (arg0, arg1) {
            const ret = URL.createObjectURL(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_createProgram_b20375f7e07e4565: function(arg0) {
            const ret = arg0.createProgram();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createProgram_eeb811f1092e4e66: function(arg0) {
            const ret = arg0.createProgram();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createShader_828e81c3b01299f7: function(arg0, arg1) {
            const ret = arg0.createShader(arg1 >>> 0);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createShader_a68df73e8615cf7f: function(arg0, arg1) {
            const ret = arg0.createShader(arg1 >>> 0);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createTexture_64eb57187dc16330: function(arg0) {
            const ret = arg0.createTexture();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createTexture_bdd2fd7604c04839: function(arg0) {
            const ret = arg0.createTexture();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createVertexArrayOES_17388a7ebf4b7bfe: function(arg0) {
            const ret = arg0.createVertexArrayOES();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createVertexArray_7c2c139cdda744b5: function(arg0) {
            const ret = arg0.createVertexArray();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ctrlKey_4d1d15f09a1b4db8: function(arg0) {
            const ret = arg0.ctrlKey;
            return ret;
        },
        __wbg_ctrlKey_94d556e6ab38c97d: function(arg0) {
            const ret = arg0.ctrlKey;
            return ret;
        },
        __wbg_currentTime_4b027aa2933e8d2f: function(arg0) {
            const ret = arg0.currentTime;
            return ret;
        },
        __wbg_dataTransfer_8c13705740352389: function(arg0) {
            const ret = arg0.dataTransfer;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_data_9292d8f8f4b1e74a: function(arg0) {
            const ret = arg0.data;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_data_fd2eb161f349bca3: function(arg0, arg1) {
            const ret = arg1.data;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_debug_7a3bd9504b731164: function(arg0, arg1) {
            console.debug(getStringFromWasm0(arg0, arg1));
        },
        __wbg_decodeAudioData_8d0e0dd320c37adb: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.decodeAudioData(arg1);
            return ret;
        }, arguments); },
        __wbg_deleteBuffer_431cacf83f504e90: function(arg0, arg1) {
            arg0.deleteBuffer(arg1);
        },
        __wbg_deleteBuffer_fa6436606df27f35: function(arg0, arg1) {
            arg0.deleteBuffer(arg1);
        },
        __wbg_deleteProgram_4a768b09bc35123b: function(arg0, arg1) {
            arg0.deleteProgram(arg1);
        },
        __wbg_deleteProgram_b37d748df05b3396: function(arg0, arg1) {
            arg0.deleteProgram(arg1);
        },
        __wbg_deleteShader_7ccf49592116c727: function(arg0, arg1) {
            arg0.deleteShader(arg1);
        },
        __wbg_deleteShader_b90b1e4c164edffd: function(arg0, arg1) {
            arg0.deleteShader(arg1);
        },
        __wbg_deleteTexture_b1d80c8269d61722: function(arg0, arg1) {
            arg0.deleteTexture(arg1);
        },
        __wbg_deleteTexture_cebd404ba7d6b782: function(arg0, arg1) {
            arg0.deleteTexture(arg1);
        },
        __wbg_deltaMode_b330560cc0a9c24c: function(arg0) {
            const ret = arg0.deltaMode;
            return ret;
        },
        __wbg_deltaX_dedec684bb3c150c: function(arg0) {
            const ret = arg0.deltaX;
            return ret;
        },
        __wbg_deltaY_ced7fd7b3e26f5cc: function(arg0) {
            const ret = arg0.deltaY;
            return ret;
        },
        __wbg_destination_00629644127851ed: function(arg0) {
            const ret = arg0.destination;
            return ret;
        },
        __wbg_detachShader_04a6ab368f8a69a4: function(arg0, arg1, arg2) {
            arg0.detachShader(arg1, arg2);
        },
        __wbg_detachShader_b07e80c05e89acd6: function(arg0, arg1, arg2) {
            arg0.detachShader(arg1, arg2);
        },
        __wbg_devicePixelContentBoxSize_94ca4800fdadff57: function(arg0) {
            const ret = arg0.devicePixelContentBoxSize;
            return ret;
        },
        __wbg_devicePixelRatio_0eaaa56cea485850: function(arg0) {
            const ret = arg0.devicePixelRatio;
            return ret;
        },
        __wbg_disableVertexAttribArray_7719cf9351a6e469: function(arg0, arg1) {
            arg0.disableVertexAttribArray(arg1 >>> 0);
        },
        __wbg_disableVertexAttribArray_d4213fe0bc2a5347: function(arg0, arg1) {
            arg0.disableVertexAttribArray(arg1 >>> 0);
        },
        __wbg_disable_289f67dd5f931fca: function(arg0, arg1) {
            arg0.disable(arg1 >>> 0);
        },
        __wbg_disable_34e3af368545441a: function(arg0, arg1) {
            arg0.disable(arg1 >>> 0);
        },
        __wbg_disconnect_74a197fe784423eb: function(arg0) {
            arg0.disconnect();
        },
        __wbg_document_8d00b6db6f4e3e5e: function(arg0) {
            const ret = arg0.document;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_done_e0b2820e599cb9f4: function(arg0) {
            const ret = arg0.done;
            return ret;
        },
        __wbg_drawElements_102ab4772a9d2473: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.drawElements(arg1 >>> 0, arg2, arg3 >>> 0, arg4);
        },
        __wbg_drawElements_f5b2b72992001212: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.drawElements(arg1 >>> 0, arg2, arg3 >>> 0, arg4);
        },
        __wbg_duration_bd329266e3120c63: function(arg0) {
            const ret = arg0.duration;
            return ret;
        },
        __wbg_elementFromPoint_ccc5c0c2259400b1: function(arg0, arg1, arg2) {
            const ret = arg0.elementFromPoint(arg1, arg2);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_elementFromPoint_cf5267e177fb4744: function(arg0, arg1, arg2) {
            const ret = arg0.elementFromPoint(arg1, arg2);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_enableVertexAttribArray_a349186274ae7f6e: function(arg0, arg1) {
            arg0.enableVertexAttribArray(arg1 >>> 0);
        },
        __wbg_enableVertexAttribArray_ebc5e5c3005f1bd8: function(arg0, arg1) {
            arg0.enableVertexAttribArray(arg1 >>> 0);
        },
        __wbg_enable_78737d68d27bc055: function(arg0, arg1) {
            arg0.enable(arg1 >>> 0);
        },
        __wbg_enable_bd9bfea24edbfe6f: function(arg0, arg1) {
            arg0.enable(arg1 >>> 0);
        },
        __wbg_enqueue_937caeb31417c9ca: function() { return handleError(function (arg0, arg1) {
            arg0.enqueue(arg1);
        }, arguments); },
        __wbg_error_1f86c19d6ed1899f: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_error_8bf5c4b515429984: function(arg0) {
            console.error(arg0);
        },
        __wbg_fetch_9848342fe2c78756: function(arg0) {
            const ret = fetch(arg0);
            return ret;
        },
        __wbg_fetch_b371b952a61cca04: function(arg0) {
            const ret = fetch(arg0);
            return ret;
        },
        __wbg_fftSize_ac5bfd3199f3bd39: function(arg0) {
            const ret = arg0.fftSize;
            return ret;
        },
        __wbg_files_22058139ca7be405: function(arg0) {
            const ret = arg0.files;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_files_6579fff3d3c76522: function(arg0) {
            const ret = arg0.files;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_focus_b56ac9e2d8e6d278: function() { return handleError(function (arg0) {
            arg0.focus();
        }, arguments); },
        __wbg_force_187ec25d04a5cb0a: function(arg0) {
            const ret = arg0.force;
            return ret;
        },
        __wbg_gain_18e605c32c016a91: function(arg0) {
            const ret = arg0.gain;
            return ret;
        },
        __wbg_generateMipmap_8058c7d04247e9fd: function(arg0, arg1) {
            arg0.generateMipmap(arg1 >>> 0);
        },
        __wbg_generateMipmap_a8b798c252d1c332: function(arg0, arg1) {
            arg0.generateMipmap(arg1 >>> 0);
        },
        __wbg_getAttribLocation_0310bf1bb79ade6e: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.getAttribLocation(arg1, getStringFromWasm0(arg2, arg3));
            return ret;
        },
        __wbg_getAttribLocation_55aecb8cfc90b49f: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.getAttribLocation(arg1, getStringFromWasm0(arg2, arg3));
            return ret;
        },
        __wbg_getBoundingClientRect_9b255725f1fd6390: function(arg0) {
            const ret = arg0.getBoundingClientRect();
            return ret;
        },
        __wbg_getChannelData_a8ecf1e634f6441f: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg1.getChannelData(arg2 >>> 0);
            const ptr1 = passArrayF32ToWasm0(ret, wasm.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_getComputedStyle_54985c5cd0d50b68: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.getComputedStyle(arg1);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getContext_064ba67b26a73a3e: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getData_4163bac5ddce12af: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.getData(getStringFromWasm0(arg2, arg3));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_getElementById_c252cc267c1876cd: function(arg0, arg1, arg2) {
            const ret = arg0.getElementById(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_getError_35831166f6a494f7: function(arg0) {
            const ret = arg0.getError();
            return ret;
        },
        __wbg_getError_88cabea3574aa21e: function(arg0) {
            const ret = arg0.getError();
            return ret;
        },
        __wbg_getExtension_5b564cbf3e616e17: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getExtension(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getExtension_accec60a148bde49: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getExtension(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getFloatTimeDomainData_48f0a6ee63fdf690: function(arg0, arg1, arg2) {
            arg0.getFloatTimeDomainData(getArrayF32FromWasm0(arg1, arg2));
        },
        __wbg_getItem_dd0194ffb8abcfea: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.getItem(getStringFromWasm0(arg2, arg3));
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_getModifierState_6187d8c1d991b4f3: function(arg0, arg1, arg2) {
            const ret = arg0.getModifierState(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_getParameter_1a896a8dcca1c4fa: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.getParameter(arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_getParameter_7be23eeb6876b790: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.getParameter(arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_getProgramInfoLog_6f8aa7c1b37d4140: function(arg0, arg1, arg2) {
            const ret = arg1.getProgramInfoLog(arg2);
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_getProgramInfoLog_8a6ecb6668e998d1: function(arg0, arg1, arg2) {
            const ret = arg1.getProgramInfoLog(arg2);
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_getProgramParameter_8f31caa7326d56ff: function(arg0, arg1, arg2) {
            const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
            return ret;
        },
        __wbg_getProgramParameter_a6da442bd18f71ea: function(arg0, arg1, arg2) {
            const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
            return ret;
        },
        __wbg_getPropertyValue_60177298ed778c76: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.getPropertyValue(getStringFromWasm0(arg2, arg3));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_getRandomValues_3f44b700395062e5: function() { return handleError(function (arg0, arg1) {
            globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
        }, arguments); },
        __wbg_getReader_b4b1868fbca77dbe: function() { return handleError(function (arg0) {
            const ret = arg0.getReader();
            return ret;
        }, arguments); },
        __wbg_getRootNode_910b3e4bb982df59: function(arg0) {
            const ret = arg0.getRootNode();
            return ret;
        },
        __wbg_getShaderInfoLog_4a30ecb2bca0a8fd: function(arg0, arg1, arg2) {
            const ret = arg1.getShaderInfoLog(arg2);
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_getShaderInfoLog_fb2b3e5488623f52: function(arg0, arg1, arg2) {
            const ret = arg1.getShaderInfoLog(arg2);
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_getShaderParameter_1289544e6a149b67: function(arg0, arg1, arg2) {
            const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
            return ret;
        },
        __wbg_getShaderParameter_34d1e384ebb29665: function(arg0, arg1, arg2) {
            const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
            return ret;
        },
        __wbg_getSupportedExtensions_da40de6648eaa0d8: function(arg0) {
            const ret = arg0.getSupportedExtensions();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_getSupportedExtensions_fa152e3812b9efef: function(arg0) {
            const ret = arg0.getSupportedExtensions();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_getTimezoneOffset_bbf1d3938a4dde0e: function(arg0) {
            const ret = arg0.getTimezoneOffset();
            return ret;
        },
        __wbg_getTracks_1d14591f895f4215: function(arg0) {
            const ret = arg0.getTracks();
            return ret;
        },
        __wbg_getUniformLocation_141c8d21824a1679: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_getUniformLocation_83c8ff312ccadd3a: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_getUserMedia_5d834541f3ce2347: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.getUserMedia(arg1);
            return ret;
        }, arguments); },
        __wbg_get_42ed88e13b57129a: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_8944f33c9c7f4f6c: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_8bf846a08c6fea8b: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_97a4b9029a97fbd6: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_c4d2a0b7139c5c07: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_d8a3d51a73d14c8a: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_done_d52497fb625bce7e: function(arg0) {
            const ret = arg0.done;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_unchecked_c33f0e513c522d7c: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_value_d22a7c6aab606a8b: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_hash_e91d33a0d00110ad: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.hash;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_headers_1203e238e53bae22: function(arg0) {
            const ret = arg0.headers;
            return ret;
        },
        __wbg_headers_38964af605485595: function(arg0) {
            const ret = arg0.headers;
            return ret;
        },
        __wbg_height_8b6fea8d47c5e971: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_height_dfa2647073c07bd3: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_hidden_8c7bca58c8bc198b: function(arg0) {
            const ret = arg0.hidden;
            return ret;
        },
        __wbg_host_e7ebcde4d9228cbd: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.host;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_hostname_a9471d56e7582e29: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.hostname;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_href_42d0a7d79a5a0fe5: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.href;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_id_240b347d233ca1d1: function(arg0, arg1) {
            const ret = arg1.id;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_identifier_daadd2a87890f58e: function(arg0) {
            const ret = arg0.identifier;
            return ret;
        },
        __wbg_info_a6f5892d3cb1b84d: function(arg0, arg1) {
            console.info(getStringFromWasm0(arg0, arg1));
        },
        __wbg_inlineSize_f64479376708e733: function(arg0) {
            const ret = arg0.inlineSize;
            return ret;
        },
        __wbg_instanceof_Document_218688d2e8fb055d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Document;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Element_881a44d6b4abcd54: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Element;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlAnchorElement_b3ae2f0442bb4677: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLAnchorElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlButtonElement_c20dc71be802cadb: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLButtonElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlCanvasElement_1ee070c578ed9cdc: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLCanvasElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlElement_51b34b7de7e6e993: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlInputElement_43dd210efb1a50be: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLInputElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_MediaStreamTrack_95c2c156eb4b48ca: function(arg0) {
            let result;
            try {
                result = arg0 instanceof MediaStreamTrack;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ReadableStream_a9e21e670321584e: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ReadableStream;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ResizeObserverEntry_4e372494b33dbe01: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ResizeObserverEntry;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ResizeObserverSize_34570bdda353c1ee: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ResizeObserverSize;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Response_b11437cbbe8c9041: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Response;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ShadowRoot_1804b287b4b8885a: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ShadowRoot;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_TypeError_8103a3341a8a8ff1: function(arg0) {
            let result;
            try {
                result = arg0 instanceof TypeError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_WebGl2RenderingContext_b0fd328023d101b2: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WebGL2RenderingContext;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_WebGlRenderingContext_adf3c47ab91df5dd: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WebGLRenderingContext;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Window_4bfad3a9470c25c9: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Window;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_isActive_18695c592c129243: function(arg0) {
            const ret = arg0.isActive;
            return ret;
        },
        __wbg_isComposing_13845fb49708f774: function(arg0) {
            const ret = arg0.isComposing;
            return ret;
        },
        __wbg_isComposing_b6a9b6cdc9bf634f: function(arg0) {
            const ret = arg0.isComposing;
            return ret;
        },
        __wbg_isSecureContext_7e0bcdac29e0331c: function(arg0) {
            const ret = arg0.isSecureContext;
            return ret;
        },
        __wbg_is_04cfa9fd1c38e170: function(arg0, arg1) {
            const ret = Object.is(arg0, arg1);
            return ret;
        },
        __wbg_item_7951592e2522317c: function(arg0, arg1) {
            const ret = arg0.item(arg1 >>> 0);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_items_5588a2bbd684f32b: function(arg0) {
            const ret = arg0.items;
            return ret;
        },
        __wbg_iterator_8af67730d17a1376: function() {
            const ret = Symbol.iterator;
            return ret;
        },
        __wbg_keyCode_f413778c7fc7de5b: function(arg0) {
            const ret = arg0.keyCode;
            return ret;
        },
        __wbg_key_65cfc09af9f5d704: function(arg0, arg1) {
            const ret = arg1.key;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_lastModified_0465c84f5911cd19: function(arg0) {
            const ret = arg0.lastModified;
            return ret;
        },
        __wbg_left_7fde6d2f4c00c190: function(arg0) {
            const ret = arg0.left;
            return ret;
        },
        __wbg_length_090b6aa6235450ba: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_28a576c6efe95da0: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_713cc1160ce7b5b9: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_7c86b41147f1adf2: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_a17f0ae382922389: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_f06180ca280d7026: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_linkProgram_47357d3d0a10d366: function(arg0, arg1) {
            arg0.linkProgram(arg1);
        },
        __wbg_linkProgram_4f362b048cee2c35: function(arg0, arg1) {
            arg0.linkProgram(arg1);
        },
        __wbg_localStorage_35d0825b8c30139a: function() { return handleError(function (arg0) {
            const ret = arg0.localStorage;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_location_bb43558c9f37b0ca: function(arg0) {
            const ret = arg0.location;
            return ret;
        },
        __wbg_matchMedia_acde27cc00f327ad: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.matchMedia(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_matches_8bb11cf515c655a9: function(arg0) {
            const ret = arg0.matches;
            return ret;
        },
        __wbg_maxChannelCount_697b75583fde0dfe: function(arg0) {
            const ret = arg0.maxChannelCount;
            return ret;
        },
        __wbg_mediaDevices_8d31a388b6b640ac: function() { return handleError(function (arg0) {
            const ret = arg0.mediaDevices;
            return ret;
        }, arguments); },
        __wbg_metaKey_063c7ad0034c4776: function(arg0) {
            const ret = arg0.metaKey;
            return ret;
        },
        __wbg_metaKey_b753a333bfa4b0d5: function(arg0) {
            const ret = arg0.metaKey;
            return ret;
        },
        __wbg_mimeType_9b2ebd8aac8a9a36: function(arg0, arg1) {
            const ret = arg1.mimeType;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_name_b13d20d43c10b41b: function(arg0, arg1) {
            const ret = arg1.name;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_navigator_cda717510f3a4a47: function(arg0) {
            const ret = arg0.navigator;
            return ret;
        },
        __wbg_new_465338a5f5f7520b: function() { return handleError(function () {
            const ret = new lAudioContext();
            return ret;
        }, arguments); },
        __wbg_new_4774b8d4db1224e4: function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        },
        __wbg_new_480195ddf7042529: function() {
            const ret = new Array();
            return ret;
        },
        __wbg_new_8065ed62408da879: function() { return handleError(function (arg0) {
            const ret = new ResizeObserver(arg0);
            return ret;
        }, arguments); },
        __wbg_new_9b76322f12909441: function() { return handleError(function () {
            const ret = new FileReader();
            return ret;
        }, arguments); },
        __wbg_new_a52e1ac82c258947: function(arg0) {
            const ret = new Date(arg0);
            return ret;
        },
        __wbg_new_e4597c3f125a2038: function() {
            const ret = new Object();
            return ret;
        },
        __wbg_new_e7a94ed988189973: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_new_ebde992a0bf6bdf6: function(arg0, arg1) {
            const ret = new Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_f32e3b8443eb97b5: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return wasm_bindgen__convert__closures_____invoke__h1cf4d134efa2ac20(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return ret;
            } finally {
                state0.a = 0;
            }
        },
        __wbg_new_from_slice_2733a138cec5cdcf: function(arg0, arg1) {
            const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_typed_5101eada2c6754de: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return wasm_bindgen__convert__closures_____invoke__h1cf4d134efa2ac20(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return ret;
            } finally {
                state0.a = 0;
            }
        },
        __wbg_new_with_blob_sequence_and_options_04ad34c580171014: function() { return handleError(function (arg0, arg1) {
            const ret = new Blob(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_new_with_byte_offset_and_length_716709b677573556: function(arg0, arg1, arg2) {
            const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_context_options_9f51673cfed95c3e: function() { return handleError(function (arg0) {
            const ret = new lAudioContext(arg0);
            return ret;
        }, arguments); },
        __wbg_new_with_length_a90559ebda3954f8: function(arg0) {
            const ret = new Uint8Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_media_stream_b367d74e25de2fea: function() { return handleError(function (arg0) {
            const ret = new MediaRecorder(arg0);
            return ret;
        }, arguments); },
        __wbg_new_with_record_from_str_to_blob_promise_60f7030cae1d24b4: function() { return handleError(function (arg0) {
            const ret = new ClipboardItem(arg0);
            return ret;
        }, arguments); },
        __wbg_new_with_str_and_init_f420a9ad6aaedb54: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new Request(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments); },
        __wbg_new_with_u8_array_sequence_and_options_28abb17248a46323: function() { return handleError(function (arg0, arg1) {
            const ret = new Blob(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_next_9a5990d0355cdd1a: function() { return handleError(function (arg0) {
            const ret = arg0.next();
            return ret;
        }, arguments); },
        __wbg_next_e75ce91d696d3c0f: function(arg0) {
            const ret = arg0.next;
            return ret;
        },
        __wbg_now_1925e14eb84a904c: function(arg0) {
            const ret = arg0.now();
            return ret;
        },
        __wbg_now_cd850b0a28a6e656: function() {
            const ret = Date.now();
            return ret;
        },
        __wbg_now_e7c6795a7f81e10f: function(arg0) {
            const ret = arg0.now();
            return ret;
        },
        __wbg_numberOfChannels_4aecb7f2460f8ea8: function(arg0) {
            const ret = arg0.numberOfChannels;
            return ret;
        },
        __wbg_observe_c458eebafd0a8bb9: function(arg0, arg1, arg2) {
            arg0.observe(arg1, arg2);
        },
        __wbg_of_786b4c4fc6e0c8d8: function(arg0) {
            const ret = Array.of(arg0);
            return ret;
        },
        __wbg_offsetTop_5424134c7cb6d30d: function(arg0) {
            const ret = arg0.offsetTop;
            return ret;
        },
        __wbg_ok_61e571b7fedb8af7: function(arg0) {
            const ret = arg0.ok;
            return ret;
        },
        __wbg_open_a6f9e8a6a34b1d5f: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.open(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_origin_91618866c365ad50: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.origin;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_performance_3fcf6e32a7e1ed0a: function(arg0) {
            const ret = arg0.performance;
            return ret;
        },
        __wbg_performance_6c4d39832e915483: function(arg0) {
            const ret = arg0.performance;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_pixelStorei_838f319e957b97b1: function(arg0, arg1, arg2) {
            arg0.pixelStorei(arg1 >>> 0, arg2);
        },
        __wbg_pixelStorei_f5aed17ba3a24523: function(arg0, arg1, arg2) {
            arg0.pixelStorei(arg1 >>> 0, arg2);
        },
        __wbg_playbackRate_b9c184b131e61b76: function(arg0) {
            const ret = arg0.playbackRate;
            return ret;
        },
        __wbg_port_1409f1352bb489d0: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.port;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_preventDefault_460dd6189b1ad1ab: function(arg0) {
            arg0.preventDefault();
        },
        __wbg_protocol_5473cec3fb4226c2: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.protocol;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_prototypesetcall_7dca54d31cb9d2dc: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_push_bb0def92a641d074: function(arg0, arg1) {
            const ret = arg0.push(arg1);
            return ret;
        },
        __wbg_queueMicrotask_1f50b4bdf2c98605: function(arg0) {
            queueMicrotask(arg0);
        },
        __wbg_queueMicrotask_805204511f79bee8: function(arg0) {
            const ret = arg0.queueMicrotask;
            return ret;
        },
        __wbg_readAsArrayBuffer_14656e2aaf501229: function() { return handleError(function (arg0, arg1) {
            arg0.readAsArrayBuffer(arg1);
        }, arguments); },
        __wbg_readPixels_55677ecdb64ad211: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
        }, arguments); },
        __wbg_readPixels_ba0426af511e8a77: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
        }, arguments); },
        __wbg_readPixels_c001c684bc183eda: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
        }, arguments); },
        __wbg_read_726c9a763a71152a: function(arg0) {
            const ret = arg0.read();
            return ret;
        },
        __wbg_releaseLock_264816e2a03fd477: function(arg0) {
            arg0.releaseLock();
        },
        __wbg_removeChild_5fbc36e12df0c63a: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.removeChild(arg1);
            return ret;
        }, arguments); },
        __wbg_removeEventListener_42a836ce43a8c79e: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3);
        }, arguments); },
        __wbg_removeTrack_d97fd150da26f617: function(arg0, arg1) {
            arg0.removeTrack(arg1);
        },
        __wbg_remove_bcd187ef84462474: function(arg0) {
            arg0.remove();
        },
        __wbg_requestAnimationFrame_6e0a982366ee51fd: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.requestAnimationFrame(arg1);
            return ret;
        }, arguments); },
        __wbg_resolve_bb4df27803d377b2: function(arg0) {
            const ret = Promise.resolve(arg0);
            return ret;
        },
        __wbg_respond_2bf437afb2fda9c8: function() { return handleError(function (arg0, arg1) {
            arg0.respond(arg1 >>> 0);
        }, arguments); },
        __wbg_result_a0347628a71fe585: function() { return handleError(function (arg0) {
            const ret = arg0.result;
            return ret;
        }, arguments); },
        __wbg_resume_0248e20d9cfcfbb8: function() { return handleError(function (arg0) {
            arg0.resume();
        }, arguments); },
        __wbg_resume_9929bf86f4a50af3: function() { return handleError(function (arg0) {
            const ret = arg0.resume();
            return ret;
        }, arguments); },
        __wbg_revokeObjectURL_014134bd1b57521f: function() { return handleError(function (arg0, arg1) {
            URL.revokeObjectURL(getStringFromWasm0(arg0, arg1));
        }, arguments); },
        __wbg_right_0e3de5e55ae0e94d: function(arg0) {
            const ret = arg0.right;
            return ret;
        },
        __wbg_sampleRate_f5c819c1a082715d: function(arg0) {
            const ret = arg0.sampleRate;
            return ret;
        },
        __wbg_scissor_6505f3843445d107: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.scissor(arg1, arg2, arg3, arg4);
        },
        __wbg_scissor_8005f47af2354125: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.scissor(arg1, arg2, arg3, arg4);
        },
        __wbg_search_3fcd70c2bba17cd4: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.search;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_setAttribute_81f03c9a783fca26: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_setItem_0707664297606df0: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.setItem(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_setProperty_77aa66794680d1f8: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_setTimeout_b5154d023ff780d5: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setTimeout(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_set_05b085c909633819: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(arg0, arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_set_7680cae2d713f38d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.set(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_set_accept_2286f5fa1fa8ead4: function(arg0, arg1, arg2) {
            arg0.accept = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_audio_a410d56d8bee05bd: function(arg0, arg1) {
            arg0.audio = arg1;
        },
        __wbg_set_autofocus_2baf8d3154d4fe73: function() { return handleError(function (arg0, arg1) {
            arg0.autofocus = arg1 !== 0;
        }, arguments); },
        __wbg_set_body_44749a7f105b35d6: function(arg0, arg1) {
            arg0.body = arg1;
        },
        __wbg_set_box_8ba9150ba20c856d: function(arg0, arg1) {
            arg0.box = __wbindgen_enum_ResizeObserverBoxOptions[arg1];
        },
        __wbg_set_buffer_7d1478e1e085b5c5: function(arg0, arg1) {
            arg0.buffer = arg1;
        },
        __wbg_set_channelCount_1a455f97063c38d8: function(arg0, arg1) {
            arg0.channelCount = arg1 >>> 0;
        },
        __wbg_set_className_1549b13eaf989f36: function(arg0, arg1, arg2) {
            arg0.className = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_credentials_c683644702783392: function(arg0, arg1) {
            arg0.credentials = __wbindgen_enum_RequestCredentials[arg1];
        },
        __wbg_set_dd6f99ffb0ba908d: function(arg0, arg1, arg2) {
            arg0.set(getArrayU8FromWasm0(arg1, arg2));
        },
        __wbg_set_download_bef6047ed402d9a3: function(arg0, arg1, arg2) {
            arg0.download = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_fftSize_3a81ed73fc2c4fa5: function(arg0, arg1) {
            arg0.fftSize = arg1 >>> 0;
        },
        __wbg_set_height_9a5b963336a79877: function(arg0, arg1) {
            arg0.height = arg1 >>> 0;
        },
        __wbg_set_href_c37d0814725bb28a: function(arg0, arg1, arg2) {
            arg0.href = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_id_e047efbc2bf2e248: function(arg0, arg1, arg2) {
            arg0.id = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_innerHTML_fb75cf5a1a8b7074: function(arg0, arg1, arg2) {
            arg0.innerHTML = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_innerText_ddd82a9618aaf667: function(arg0, arg1, arg2) {
            arg0.innerText = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_method_6c51b627d66b223f: function(arg0, arg1, arg2) {
            arg0.method = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_mode_b3a032fdfee82cfd: function(arg0, arg1) {
            arg0.mode = __wbindgen_enum_RequestMode[arg1];
        },
        __wbg_set_multiple_6e1de37ea971253e: function(arg0, arg1) {
            arg0.multiple = arg1 !== 0;
        },
        __wbg_set_once_56fa6839520fa6a6: function(arg0, arg1) {
            arg0.once = arg1 !== 0;
        },
        __wbg_set_onclick_1edcda98a955e162: function(arg0, arg1) {
            arg0.onclick = arg1;
        },
        __wbg_set_ondataavailable_6fcd12505431c35f: function(arg0, arg1) {
            arg0.ondataavailable = arg1;
        },
        __wbg_set_onended_a1ded668fb6ecbce: function(arg0, arg1) {
            arg0.onended = arg1;
        },
        __wbg_set_onerror_d65350f27bc343c2: function(arg0, arg1) {
            arg0.onerror = arg1;
        },
        __wbg_set_onload_5da4be7060ed1ed1: function(arg0, arg1) {
            arg0.onload = arg1;
        },
        __wbg_set_onstop_e7bcfda3b2d67936: function(arg0, arg1) {
            arg0.onstop = arg1;
        },
        __wbg_set_sample_rate_5bd2230a28a642f7: function(arg0, arg1) {
            arg0.sampleRate = arg1;
        },
        __wbg_set_tabIndex_33f53cfc844ca8f3: function(arg0, arg1) {
            arg0.tabIndex = arg1;
        },
        __wbg_set_type_1db84da6e5a49412: function(arg0, arg1, arg2) {
            arg0.type = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_type_447d82ce2670a003: function(arg0, arg1, arg2) {
            arg0.type = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_value_4b64b6cdf730356a: function(arg0, arg1, arg2) {
            arg0.value = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_value_f1cc384062669899: function(arg0, arg1) {
            arg0.value = arg1;
        },
        __wbg_set_width_d8263652df911d1d: function(arg0, arg1) {
            arg0.width = arg1 >>> 0;
        },
        __wbg_shaderSource_0a7551b1ac04be73: function(arg0, arg1, arg2, arg3) {
            arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
        },
        __wbg_shaderSource_20cc64d9735c296d: function(arg0, arg1, arg2, arg3) {
            arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
        },
        __wbg_shiftKey_857fbec753359d1e: function(arg0) {
            const ret = arg0.shiftKey;
            return ret;
        },
        __wbg_shiftKey_d4827a15bbdb1aa5: function(arg0) {
            const ret = arg0.shiftKey;
            return ret;
        },
        __wbg_size_e9400c140cc11cc7: function(arg0) {
            const ret = arg0.size;
            return ret;
        },
        __wbg_slice_ce29f5879fdbab04: function(arg0, arg1) {
            const ret = arg1.slice();
            const ptr1 = passArrayJsValueToWasm0(ret, wasm.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_stack_9697bdd96985d38d: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_start_2dda5325f9257b0d: function() { return handleError(function (arg0, arg1) {
            arg0.start(arg1);
        }, arguments); },
        __wbg_start_7cd0298f291e73e8: function() { return handleError(function (arg0, arg1) {
            arg0.start(arg1);
        }, arguments); },
        __wbg_start_c939f61786bc7e68: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.start(arg1, arg2);
        }, arguments); },
        __wbg_start_d003fb8599cb5ac4: function() { return handleError(function (arg0) {
            arg0.start();
        }, arguments); },
        __wbg_state_8a7c387184be1a2f: function(arg0) {
            const ret = arg0.state;
            return (__wbindgen_enum_RecordingState.indexOf(ret) + 1 || 4) - 1;
        },
        __wbg_static_accessor_GLOBAL_44bef9fa6011e260: function() {
            const ret = typeof global === 'undefined' ? null : global;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_GLOBAL_THIS_13002645baf43d84: function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_SELF_91d0abd4d035416c: function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_WINDOW_513f857c65724fc7: function() {
            const ret = typeof window === 'undefined' ? null : window;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_statusText_e1b7df82e6e7f1e5: function(arg0, arg1) {
            const ret = arg1.statusText;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_status_b5e005082e72a873: function(arg0) {
            const ret = arg0.status;
            return ret;
        },
        __wbg_stopPropagation_262a1d5650b130d7: function(arg0) {
            arg0.stopPropagation();
        },
        __wbg_stop_981515bfb4a8f034: function(arg0) {
            arg0.stop();
        },
        __wbg_stop_aaba2e174197ff4c: function() { return handleError(function (arg0) {
            arg0.stop();
        }, arguments); },
        __wbg_stop_d9869ba83262efaf: function() { return handleError(function (arg0) {
            arg0.stop();
        }, arguments); },
        __wbg_style_d942ffa1ec2c163f: function(arg0) {
            const ret = arg0.style;
            return ret;
        },
        __wbg_texImage2D_795f9dff0fd9f8fe: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texImage2D_88a8191aa5c3d7bb: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texImage2D_e8b9f50a2836a005: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texParameteri_1d5f90924850bc7e: function(arg0, arg1, arg2, arg3) {
            arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
        },
        __wbg_texParameteri_2f60d62df693455a: function(arg0, arg1, arg2, arg3) {
            arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
        },
        __wbg_texSubImage2D_07b82087117be55c: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texSubImage2D_256097e8c70c742d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texSubImage2D_8be481783b3f22eb: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_then_d9ebfadd74ddfbb2: function(arg0, arg1) {
            const ret = arg0.then(arg1);
            return ret;
        },
        __wbg_then_f6dedb0d880db23a: function(arg0, arg1, arg2) {
            const ret = arg0.then(arg1, arg2);
            return ret;
        },
        __wbg_top_2bb9ec161fa40e1a: function(arg0) {
            const ret = arg0.top;
            return ret;
        },
        __wbg_touches_1e9f47b14b3fbe74: function(arg0) {
            const ret = arg0.touches;
            return ret;
        },
        __wbg_type_566f6d422619dcbd: function(arg0, arg1) {
            const ret = arg1.type;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_type_d7b671a40df94cfa: function(arg0, arg1) {
            const ret = arg1.type;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_uniform1i_017af453f51246d1: function(arg0, arg1, arg2) {
            arg0.uniform1i(arg1, arg2);
        },
        __wbg_uniform1i_620429c56da52252: function(arg0, arg1, arg2) {
            arg0.uniform1i(arg1, arg2);
        },
        __wbg_uniform2f_5257bfacc7b8f8d0: function(arg0, arg1, arg2, arg3) {
            arg0.uniform2f(arg1, arg2, arg3);
        },
        __wbg_uniform2f_cfddaa3dd75db9f4: function(arg0, arg1, arg2, arg3) {
            arg0.uniform2f(arg1, arg2, arg3);
        },
        __wbg_updateApp_5bae7207edddfea9: function() {
            updateApp();
        },
        __wbg_url_b31e4fbab3865532: function(arg0, arg1) {
            const ret = arg1.url;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_useProgram_a229a93fc78688ee: function(arg0, arg1) {
            arg0.useProgram(arg1);
        },
        __wbg_useProgram_eec93ec68983b282: function(arg0, arg1) {
            arg0.useProgram(arg1);
        },
        __wbg_userActivation_c285a1b398d9d661: function(arg0) {
            const ret = arg0.userActivation;
            return ret;
        },
        __wbg_userAgent_6dfab2ad96d4e4e4: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.userAgent;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_value_8996dd08e99f9529: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_value_8c87c2c46debf719: function(arg0, arg1) {
            const ret = arg1.value;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_vertexAttribPointer_72351aab9dc93e2c: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
        },
        __wbg_vertexAttribPointer_ef3fe0b7841ec062: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
        },
        __wbg_view_9abb0f56dce823ac: function(arg0) {
            const ret = arg0.view;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_viewport_1031753073d031a2: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.viewport(arg1, arg2, arg3, arg4);
        },
        __wbg_viewport_94c85b86d76f49a7: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.viewport(arg1, arg2, arg3, arg4);
        },
        __wbg_warn_04b50ec2b1c9de77: function(arg0, arg1) {
            console.warn(getStringFromWasm0(arg0, arg1));
        },
        __wbg_width_1b4013dc9b9b69b2: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_width_d9dcbdea8dc30708: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_writeText_22edab12bac6cddd: function(arg0, arg1, arg2) {
            const ret = arg0.writeText(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_write_d89d8f622980c89b: function(arg0, arg1) {
            const ret = arg0.write(arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 1320, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h2444edb24aaf3261);
            return ret;
        },
        __wbindgen_cast_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 3056, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__hfc31131121e980af);
            return ret;
        },
        __wbindgen_cast_0000000000000003: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("Array<any>")], shim_idx: 1840, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h2cb77667c6d2860c);
            return ret;
        },
        __wbindgen_cast_0000000000000004: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("BlobEvent")], shim_idx: 500, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h727c3a0b46dbd799);
            return ret;
        },
        __wbindgen_cast_0000000000000005: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("Event")], shim_idx: 1840, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h2cb77667c6d2860c_4);
            return ret;
        },
        __wbindgen_cast_0000000000000006: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("KeyboardEvent")], shim_idx: 500, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h727c3a0b46dbd799_5);
            return ret;
        },
        __wbindgen_cast_0000000000000007: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 1004, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__hee4bb32f061b4454);
            return ret;
        },
        __wbindgen_cast_0000000000000008: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 1018, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h6f876ef74ad1bc1d);
            return ret;
        },
        __wbindgen_cast_0000000000000009: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 1838, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h168820d45d42245b);
            return ret;
        },
        __wbindgen_cast_000000000000000a: function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_cast_000000000000000b: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(F32)) -> NamedExternref("Float32Array")`.
            const ret = getArrayF32FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_000000000000000c: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(I16)) -> NamedExternref("Int16Array")`.
            const ret = getArrayI16FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_000000000000000d: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(I32)) -> NamedExternref("Int32Array")`.
            const ret = getArrayI32FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_000000000000000e: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(I8)) -> NamedExternref("Int8Array")`.
            const ret = getArrayI8FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_000000000000000f: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U16)) -> NamedExternref("Uint16Array")`.
            const ret = getArrayU16FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000010: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U32)) -> NamedExternref("Uint32Array")`.
            const ret = getArrayU32FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000011: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8Array")`.
            const ret = getArrayU8FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000012: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./ezchat_bg.js": import0,
    };
}

const lAudioContext = (typeof AudioContext !== 'undefined' ? AudioContext : (typeof webkitAudioContext !== 'undefined' ? webkitAudioContext : undefined));
function wasm_bindgen__convert__closures_____invoke__hee4bb32f061b4454(arg0, arg1) {
    wasm.wasm_bindgen__convert__closures_____invoke__hee4bb32f061b4454(arg0, arg1);
}

function wasm_bindgen__convert__closures_____invoke__h6f876ef74ad1bc1d(arg0, arg1) {
    wasm.wasm_bindgen__convert__closures_____invoke__h6f876ef74ad1bc1d(arg0, arg1);
}

function wasm_bindgen__convert__closures_____invoke__h168820d45d42245b(arg0, arg1) {
    const ret = wasm.wasm_bindgen__convert__closures_____invoke__h168820d45d42245b(arg0, arg1);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}

function wasm_bindgen__convert__closures_____invoke__h2444edb24aaf3261(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h2444edb24aaf3261(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h2cb77667c6d2860c(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h2cb77667c6d2860c(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h727c3a0b46dbd799(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h727c3a0b46dbd799(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h2cb77667c6d2860c_4(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h2cb77667c6d2860c_4(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h727c3a0b46dbd799_5(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h727c3a0b46dbd799_5(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__hfc31131121e980af(arg0, arg1, arg2) {
    const ret = wasm.wasm_bindgen__convert__closures_____invoke__hfc31131121e980af(arg0, arg1, arg2);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}

function wasm_bindgen__convert__closures_____invoke__h1cf4d134efa2ac20(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures_____invoke__h1cf4d134efa2ac20(arg0, arg1, arg2, arg3);
}


const __wbindgen_enum_ReadableStreamType = ["bytes"];


const __wbindgen_enum_RecordingState = ["inactive", "recording", "paused"];


const __wbindgen_enum_RequestCredentials = ["omit", "same-origin", "include"];


const __wbindgen_enum_RequestMode = ["same-origin", "no-cors", "cors", "navigate"];


const __wbindgen_enum_ResizeObserverBoxOptions = ["border-box", "content-box", "device-pixel-content-box"];
const IntoUnderlyingByteSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingbytesource_free(ptr >>> 0, 1));
const IntoUnderlyingSinkFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsink_free(ptr >>> 0, 1));
const IntoUnderlyingSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsource_free(ptr >>> 0, 1));
const StreamConfigFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_streamconfig_free(ptr >>> 0, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => wasm.__wbindgen_destroy_closure(state.a, state.b));

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayI16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayI8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function getArrayU16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

let cachedInt16ArrayMemory0 = null;
function getInt16ArrayMemory0() {
    if (cachedInt16ArrayMemory0 === null || cachedInt16ArrayMemory0.byteLength === 0) {
        cachedInt16ArrayMemory0 = new Int16Array(wasm.memory.buffer);
    }
    return cachedInt16ArrayMemory0;
}

let cachedInt32ArrayMemory0 = null;
function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

let cachedInt8ArrayMemory0 = null;
function getInt8ArrayMemory0() {
    if (cachedInt8ArrayMemory0 === null || cachedInt8ArrayMemory0.byteLength === 0) {
        cachedInt8ArrayMemory0 = new Int8Array(wasm.memory.buffer);
    }
    return cachedInt8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint16ArrayMemory0 = null;
function getUint16ArrayMemory0() {
    if (cachedUint16ArrayMemory0 === null || cachedUint16ArrayMemory0.byteLength === 0) {
        cachedUint16ArrayMemory0 = new Uint16Array(wasm.memory.buffer);
    }
    return cachedUint16ArrayMemory0;
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function makeMutClosure(arg0, arg1, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            state.a = a;
            real._wbg_cb_unref();
        }
    };
    real._wbg_cb_unref = () => {
        if (--state.cnt === 0) {
            wasm.__wbindgen_destroy_closure(state.a, state.b);
            state.a = 0;
            CLOSURE_DTORS.unregister(state);
        }
    };
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasm;
function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedInt16ArrayMemory0 = null;
    cachedInt32ArrayMemory0 = null;
    cachedInt8ArrayMemory0 = null;
    cachedUint16ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('ezchat_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
