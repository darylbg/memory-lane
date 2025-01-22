import React from 'react';
import ButtonComponent from './Primitive Components/ButtonComponent';
import forward_icon from "../Assets/Icons/forward_icon.png";
import { useGame } from '../GameContext';

export default function BottomBar() {
    const {gameState} = useGame();
  return (
    <div className='flex justify-between'>
      <div>left side</div>
      {gameState === "playing" && <ButtonComponent text='SUMBIT' icon={forward_icon} custom_class="secondary-button"/>}
    </div>
  )
}
