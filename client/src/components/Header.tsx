import React from 'react';

interface HeaderProps {
  text: string
}

export const Header: React.FC<HeaderProps> = ({text}: HeaderProps) => {
  return (
    <div><h1 className="font-weight-light display-1 text-center">{text}</h1></div>
  )
}