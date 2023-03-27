import { FC, MouseEvent, useRef } from 'react';
import './Modal.scss';

type ModalProps = { 
    type: 'confirm', 
    onConfirm: (message: string) => void, 
    onClose: () => void,
    title: string, 
    textContent: string 
}

export const Modal: FC<ModalProps> = (props) => {
    const textRef = useRef<HTMLTextAreaElement>(null)
    const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget === event.target) props.onClose()
        const target = event.target as HTMLButtonElement;

        if (target.value === 'cansel') props.onClose()
        if (target.value === 'accespt' && textRef.current) props.onConfirm(textRef.current.value)
    }
    return (
        <div className="modal-wrapper" onClick={clickHandler}>
            <div className="modal-container">
                <p className='modal__title'>{props.title}</p>
                <textarea className='model__textarea' ref={textRef} defaultValue={props.textContent}></textarea>
                <div className='modal__confirm-btn'>
                    <button className='confitm-btn' value={'cansel'}>Cancel</button>
                    <button className='confitm-btn accespt' value={'accespt'}>Accespt</button>
                </div>
            </div>
        </div>
    )
}