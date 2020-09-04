import React from 'react';

function Modal(props) {
    const { message, active, close } = props;

    return (
        <div className={'modal ' + (active ? 'is-active' : '')}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Modal title</p>
                    <button className="delete" aria-label="close" onClick={close}></button>
                </header>
                <section className="modal-card-body">
                    {message}
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={close} >Ok</button>
                </footer>
            </div>
        </div>
    )
}

export default Modal;
