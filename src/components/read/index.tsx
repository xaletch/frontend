import { FC } from 'react'
import { Editor } from '../Notes/Editor/Editor';
import { NoteName } from '../NoteName/NoteName';
import { SelectSmile } from '../SelectSmile/SelectSmile';
import { BgImage } from '../BgImage/BgImage';
import { DocumentHead } from '../DocumentHead/DocumentHead';
import { NoteContentInterface } from '../../app/types';

export const ReadContent: FC<NoteContentInterface> = ({ imageUrl, name, smile, blocks, isPublic }) => {
  return (
    <div className="flex-1 h-screen relative z-0">
      <DocumentHead
        id={''}
        smile={smile}
        noteName={name} closeMenu={false} resetWidth={undefined} handleInput={undefined} isPublic={isPublic} isRead={true} 
      />
      <div className="">
        {imageUrl && (
          <BgImage imageUrl={imageUrl} isRead={true} />
        )}
        <div className="md:max-w-3xl px-3 md:px-0  lg:max-w-4xl mx-auto pb-12 pt-8">
          <div className="pl-0 md:pl-14">
            <SelectSmile smile={smile} handleRemoveSmile={() => {}} isRead={true} />
            <div className='note-setting py-4 flex gap-2 opacity-1 manage-note_btn relative'></div>
            <div className="note-hover">
              <NoteName noteName={name} readOnly={true} handleInput={() => {}} />
            </div>

            <div>
              <div className="mt-2">
                <Editor key={name} initialContent={blocks} onChange={() => {}} isEditable={false}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
