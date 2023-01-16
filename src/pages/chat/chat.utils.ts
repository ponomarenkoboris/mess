import type { KeyboardEvent, RefObject, ChangeEvent, MouseEvent } from 'react'

enum HotKeys {
    ENTER = 'Enter',
    CTRL = 'Control'
}

const keyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>, textareaRef: RefObject<HTMLTextAreaElement>): void => {
    if (!textareaRef.current?.value) {
        if (event.key === HotKeys.ENTER) event.preventDefault()
        return
    }

    if (event.key === HotKeys.ENTER && event.ctrlKey) {
        event.preventDefault()
        textareaRef.current.value += '\n'
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight
        return
    }

    if (event.key === HotKeys.ENTER && !event.ctrlKey) {
        event.preventDefault()
        const message = textareaRef.current.value
        console.log(message)
        textareaRef.current.value = ''
        return
    }
}

const docsHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.item(0)!
    console.log(file.name)

    const formData = new FormData()
    formData.append('file', file)

    const configuration = {
        method: 'POST',
        body: formData
    }

    fetch('url', configuration)
        .then(data => console.log(data))
        .catch(error => console.log(error))

}

const voiceHansler = () => {}
const smilesHandler = () => {}

enum ButtonClassNames {
    DOCS = 'user-input_docs',
    VOICE = 'user-input_voice',
    SMILES = 'user-input_smiles'
}

const userInputClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLButtonElement

    if (element.closest(`.${ButtonClassNames.DOCS}`)) {
        const fileInput = element.tagName === 'IMG' ? element.parentNode?.querySelector('input') : element.querySelector('input')
        fileInput?.click()
    }

    if (element.closest(`.${ButtonClassNames.VOICE}`)) {}
    if (element.closest(`.${ButtonClassNames.SMILES}`)) {}
}

export {
    keyDownHandler,
    docsHandler,
    voiceHansler,
    smilesHandler,
    ButtonClassNames,
    userInputClickHandler
}