import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export const Smile = ({ setSelectEmoji, setShowEmoji }) => {
  return (
    <div
      className="absolute top-14 left-0 z-50"
      onMouseLeave={() => setShowEmoji(false)}
    >
      <Picker
        data={data}
        previewPosition="none"
        onEmojiSelect={(e) => {
          setSelectEmoji(e.native);
          setShowEmoji(false);
        }}
      />
    </div>
  );
};
