import React from 'react';
import ButtonComponent from './Primitive Components/ButtonComponent';
import forward_icon from "../Assets/Icons/forward_icon.png";
import { useGame } from '../GameContext';

export default function BottomBar() {
    const {gameState, submitGame, shuffledGameSet} = useGame();
  return (
    <div className='flex justify-between pb-2'>
      <div>left side</div>
      {gameState === "playing" && <ButtonComponent action={submitGame(shuffledGameSet)} text='SUMBIT' icon={forward_icon} custom_class="secondary-button"/>}
    </div>
  )
}
