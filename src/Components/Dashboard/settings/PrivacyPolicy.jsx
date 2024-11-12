import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleOnSave = () => {
    console.log(content);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen py-1">
      <div className="p-2 rounded">
        <div className="flex gap-3">
          <LeftOutlined
            className="text-lg cursor-pointer"
            onClick={handleGoBack}
          />
          <h1 className="text-4xl font-bold py-4 text-secondary-color">
            Privacy Policy
          </h1>
        </div>
        <div className="">
          <JoditEditor
            ref={editor}
            value={content}
            config={{ height: 500, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
        <Button
          onClick={handleOnSave}
          className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
