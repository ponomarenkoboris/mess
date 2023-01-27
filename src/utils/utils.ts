const changeHTMLTitle = (title: string): void => {
    document.title = `Mess | ${title}`;
};

interface IRecordTimer {
    startTimer: () => void;
    stopTimer: () => void;
}

class RecordTimer implements IRecordTimer {
    private _timer = 0;

    get duration() {
        return this._timer / 1000;
    }

    startTimer() {
        this._timer = Date.now();
    }

    stopTimer() {
        this._timer = Date.now() - this._timer;
    }
}

const recordTimer = new RecordTimer();

export { changeHTMLTitle, recordTimer };
