import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div style={{width: '100%', height: 'calc(100vh - 110px)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}