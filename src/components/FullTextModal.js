import React from "react";

const FullTextModal = props => {
  const { isOpen, speaker, fullText, toggleModal } = props;
  return (
    <div className={isOpen === true ? "modal is-active" : "modal"}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{speaker && speaker.name}</p>

          <div class="field is-grouped">
            <div class="tags has-addons">
              {speaker.party && (
                <>
                  <span class="tag">Party</span>
                  <span class="tag is-primary">{speaker.party}</span>
                </>
              )}
              {speaker.constituency && (
                <>
                  <span class="tag">Constituency</span>
                  <span class="tag is-dark">{speaker.constituency}</span>
                </>
              )}
            </div>
          </div>
        </header>

        <section className="modal-card-body">
          {/* {(this.props.speaker && this.props.speaker.office) ? this.props.speaker.office.map( position => <p>{position}</p> ) : null } */}
          <p>{fullText}</p>
        </section>

        <footer className="modal-card-foot">
          <button
            className="button"
            aria-label="close"
            onClick={() => toggleModal()}
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default FullTextModal;
