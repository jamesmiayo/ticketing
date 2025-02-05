import { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { FaRegFaceGrinBeam } from "react-icons/fa6";
import { Box } from "@mui/material";

interface ReactionsPickerProps {
  onSelect: (emoji: string) => void; 
}

const ReactionsPicker: React.FC<ReactionsPickerProps> = ({ onSelect }) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      {showPicker && (
        <Box
          sx={{
            position: "absolute",
            bottom: "100%", 
            right: "0",
            zIndex: 1000,
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Picker
            data={data}
            onEmojiSelect={(emoji: { native: string }) => {
              onSelect(emoji.native);
              setShowPicker(false);
            }}
          />
        </Box>
      )}
      <div style={{ marginTop: 8 }}>
        <FaRegFaceGrinBeam
          size="20"
          onClick={() => setShowPicker(!showPicker)}
          style={{ cursor: "pointer" }}
        />
      </div>
    </Box>
  );
};

export default ReactionsPicker;
