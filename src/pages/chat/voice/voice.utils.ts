interface IVoiceRecorder {
    startRecord: () => void,
    stopRecord: () => string | null
}

export default class VoiceRecorder implements IVoiceRecorder{
    private _recorder: MediaRecorder | null = null
    private _audio: Blob | null = null

    constructor () {
        (async () => {
            const chunks: Blob[] = []
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
                this._recorder = new MediaRecorder(stream)
                
                this._recorder.addEventListener('dataavailable', e => chunks.push(e.data))
                this._recorder.addEventListener('stop', () => {
                    this._audio = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
                    chunks.length = 0
                })

            } catch (error) {
                console.error(error)
                this._audio = this._recorder = null
            }
        })();
    };

    startRecord() {
        if (this._recorder) this._recorder.start()
    }

    stopRecord() {
        if (this._recorder) {
            this._recorder.stop()
            if (this._audio) return URL.createObjectURL(this._audio)
        }
        return null
    }
}