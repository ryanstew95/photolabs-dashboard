import React from 'react';

const Panel = ({ id, label, value, onSelect }) => {
  return (
    <section className="dashboard__panel" onClick={() => onSelect(id)}>
      <h2>Panel {id}</h2>
      <p><strong>Label:</strong> {label}</p>
      <p><strong>Value:</strong> {value}</p>
    </section>
  );
};

export default Panel;
