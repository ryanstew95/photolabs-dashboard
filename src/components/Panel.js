import React from 'react';

const Panel = ({ id, label, value, onSelect }) => {
  return (
    <section className="dashboard__panel" onClick={onSelect}>
      <h2>Panel {id}</h2>
      <h1 className="dashboard__panel-header">{label}</h1>
    <p className="dashboard__panel-value">{value}</p>
    </section>
  );
};

export default Panel;
