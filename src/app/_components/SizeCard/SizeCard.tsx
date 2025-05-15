"use client"
import React from 'react'
import "./Sizecard.css"
import { Size } from '@/app/_types/productTypes';
function SizeCard({ size, onSelect }: {
  size: Size,
  onSelect: (size: Size) => void
}) {

  return (
    <div onClick={() => onSelect(size)} style={{ width: "32px", height: "32px" }} className={`${size.selected && "sizeCardSelected"} sizeCard rounded p-3 flex items-center justify-center`}>{size.sizeNumber}</div>
  )
}

export default SizeCard;