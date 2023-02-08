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

const debounceCreator = () => {
    let timer: ReturnType<typeof setTimeout>;

    return (callback: () => void, ms: number) => {
        clearInterval(timer);
        timer = setTimeout(callback, ms);
    };
};

const objectsAreEqual = (...args: Array<object>): boolean => {
    const objAsString = args.map((obj) => JSON.stringify(obj));

    for (let i = 0; i < objAsString.length; i++) {
        for (let j = i + 1; j < objAsString.length; j++) {
            if (objAsString[i] !== objAsString[j]) return false;
        }
    }

    return true;
};

export { changeHTMLTitle, recordTimer, debounceCreator, objectsAreEqual };
