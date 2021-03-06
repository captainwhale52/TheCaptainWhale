import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";

require('./index.scss');

@connect((store) => {
  return {
    localization: store.localization,
    data: store.data,
    browser: store.browser,
  }
})
export default class Post extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }
  componentWillMount() {

  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  componentDidUpdate() {
    const post = ReactDom.findDOMNode(this.refs['post']);
    // window.addEventListener('resize', function(event) {
    //   const iframes = contentDOM.querySelectorAll('iframe');
    //   iframes.forEach((element) => {
    //     element.width = contentDOM.clientWidth;
    //     element.height = contentDOM.clientWidth * 9 / 16;
    //   });
    // }.bind(this));
    const iframes = post.querySelectorAll('iframe');
    if (iframes && iframes.length > 0) {
      for (let i = 0; i < iframes.length; i++) {
        iframes[i].width = Math.min(post.clientWidth, 525);
        iframes[i].height = Math.min(post.clientWidth, 525) * 9 / 16 + 32;
        iframes[i].src += "&rel=0&showinfo=0";


      }
    }
    const links = post.querySelectorAll('a');
    if (links && links.length > 0) {
      for (let i = 0; i < links.length; i++) {
        links[i].target = "_blank";
      }
    }

    if (this.props.browser.showInstructionAbout && this.props.data.selectedPost && this.props.data.selectedPost.acf.category == "about") {
      this.props.dispatch({type: "SHOW_INSTRUCTION_ABOUT", payload: false});
    }
  }
  render() {
    const { localization } = this.props.localization;
    const { selectedPost } = this.props.data;
    if (selectedPost) {
      return(
        <div ref="post" className="post">
          <div className="wrapper">
            <div className="left">
            </div>
            <div className="right">
              <h1 className="header">
                { selectedPost.title.rendered }
              </h1>
              <div className="body" dangerouslySetInnerHTML={{__html: selectedPost.content.rendered}} />
            </div>
          </div>
        </div>
      );
    }
    return(
      <div ref="post" className="post">
      </div>
    );
  }
}
