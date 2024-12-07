import React from "react";
import IconEye from "@/components/icon/icon-eye";
import IconSave from "@/components/icon/icon-save";
import Link from "next/link";

interface SavePanelProps {
  handleSave: () => void;
}

const SavePanel: React.FC<SavePanelProps> = ({ handleSave }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-success gap-2"
        onClick={handleSave}
      >
        <IconSave className="shrink-0 ltr:mr-2 rtl:ml-2" />
        Add Product
      </button>
    </>
  );
};

export default SavePanel;
