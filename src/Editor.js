import React, { Fragment, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./screens/editor.css";
import { Row, Col } from "react-bootstrap";

const Editor = () => {
  const [value, setValue] = useState("");

  console.log("value", value, typeof value);

  return (
    <Fragment>
      <h4>Editor</h4>

      {/* <div className="editor"> */}
      <Row>
        <Col md={4}>
          <ReactQuill
            theme="snow"
            value={value}
            // onChange={(e) => setValue(e.target.value)}
            onChange={setValue}
          />
        </Col>
      </Row>
      {/* </div> */}

      {/* <div
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: value }}
      ></div> */}
    </Fragment>
  );
};

export default Editor;
