import React from 'react';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

export const Smile = ({ selectEmoji, setSelectEmoji }) => {

  const handleAddEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));

    const emoji = String.fromCodePoint(...codeArray);
    setSelectEmoji(selectEmoji + emoji);
  };

  return (
    <div className='absolute top-14 left-0'>
      <Picker data={data} onEmojiSelect={handleAddEmoji} />
    </div>
  )
}
