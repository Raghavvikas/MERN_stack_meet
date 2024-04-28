import React from "react";
import AppLayout from "../../layout/appLayout";

const feed = () => {
  const name = localStorage.getItem("parent_name");
  return (
    <>
      {/* <AppLayout> */}
      <div className="Card">
        <div className="container">
          <div className="header">
            Create post
            <div className="head-name">
              <div className="thumbnail"></div>
              {name}
              <div className="text">
                <textarea
                  id="w3review"
                  name="w3review"
                  rows="4"
                  cols="50"
                  placeholder="Whats's on your mind!"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="media"></div>
        </div>
      </div>
      {/* </AppLayout> */}
    </>
  );
};

export default feed;
