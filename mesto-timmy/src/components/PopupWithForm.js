function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  children,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name}` + (isOpen && " popup_active")}>
      <div className="popup__container popup__container_type_form">
        <button
          className="popup__close-icon button"
          type="button"
          aria-label="Закрыть окно"
    
          onClick={onClose}
        ></button>
        <h3 className="popup__head">{title}</h3>
        <form
          className="popup__field"
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__submit-button button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
