function InfoLinien({ isOpen, onClose }) {
  return (
    <div className={`info-linien ${isOpen ? 'open' : 'closed'}`}>
      {isOpen && (
        <div className="second-window">
          <h1>Seconda Finestra</h1>
        </div>
      )}
    </div>
  );
}

export default InfoLinien;