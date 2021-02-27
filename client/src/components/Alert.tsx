import React from 'react';
import { AlertProps } from '../interfaces';

type AlertComponentProps  = AlertProps & {
  hide: () => void
}

export const Alert: React.FC<AlertComponentProps> = ({text, type, hide}: AlertComponentProps) => {
  return (
    <div className="container">
      <div className={`alert myAlert alert-${type} d-flex align-items-center justify-content-between`} role="alert">
        {text}
        <button onClick={hide} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  )
}