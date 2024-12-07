import React from "react";
import IconEye from "@/components/icon/icon-eye";
import IconSave from "@/components/icon/icon-save";
import Link from "next/link";

interface SavePanelProps {
  handleSave: () => void;
  text: string;
}

const SavePanel: React.FC<SavePanelProps> = ({ handleSave, text }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-success gap-2"
        onClick={handleSave}
      >
        <IconSave className="shrink-0 ltr:mr-2 rtl:ml-2" />
        {text}
      </button>
    </>
  );
};

export default SavePanel;
