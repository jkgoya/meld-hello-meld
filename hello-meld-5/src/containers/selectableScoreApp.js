import React, { Component } from "react";
import SelectableScore from "selectable-score/lib/selectable-score";
import NextPageButton from "selectable-score/lib/next-page-button.js";
import PrevPageButton from "selectable-score/lib/prev-page-button.js";
import AnnotationSubmitter from "../annotations/annotationSubmitter.js";
import SelectionHandler from "../annotations/selectionHandler.js";
import AnnotationList from "../annotations/annotationList.js";
import ReactPlayer from "react-player";
import Modal from "react-modal";
import RenditionsPlaylist from "../annotations/renditionsPlaylist.js";

//Modal.setAppElement("root");
//
//const vAdjust = 26; // num. pixels to nudge down anno measureBoxes+
var scale = 50;

let viewPortHeight = window.outerHeight;
let viewPortWidth = window.outerWidth;
// prettier-ignore
var height = (viewPortHeight < 1439) ? 2000 : 2500;
// prettier-ignore
var width = (viewPortWidth > 1925) ? 2800 : 2000;

// height /= scale / 100;
// width /= scale / 100;

export default class SelectableScoreApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annoValue: "",
      selection: [],
      annotationType: "describing",
      placeholder: "Add your annotation...",
      uri:
        "https://raw.githubusercontent.com/trompamusic-encodings/Mahler_Symphony_No4_Doblinger-4hands/master/Mahler_No4_1-Doblinger-4hands.mei",
      selectorString: "",
      buttonContent: "Submit to your Solid POD",
      replyAnnotationTarget: [],
      currentAnnotation: [],
      toggleAnnotationRetrieval: false,
      hasContent: true,
      isClicked: false,
      showMEIInput: true,
      currentMedia: this.props.currentMedia || "",
      seekTo: "",
      measuresToAnnotationsMap: {},
      annoToDisplay: [],
      helpWindowIsActive: false,
      replyAnnotationTargetId: "",
      areRepliesVisible: false,
      vrvOptions: {
        scale: scale,
        adjustPageHeight: 0,
        pageHeight: height,
        pageWidth: width,
        footer: "none",
        unit: 6,
      },
    };
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleScoreUpdate = this.handleScoreUpdate.bind(this);
    this.handleStringChange = this.handleStringChange.bind(this);
    this.onResponse = this.onResponse.bind(this);
    this.onRefreshClick = this.onRefreshClick.bind(this);
    this.onReceiveAnnotationContainerContent = this.onReceiveAnnotationContainerContent.bind(
      this
    );
    this.onSubmitMEI = this.onSubmitMEI.bind(this);
    this.onMEIInputChange = this.onMEIInputChange.bind(this);
    this.hideMEIInput = this.hideMEIInput.bind(this);
    this.onAnnoTypeChange = this.onAnnoTypeChange.bind(this);
    this.onAnnoReplyHandler = this.onAnnoReplyHandler.bind(this);
    this.convertCoords = this.convertCoords.bind(this);
    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.onMediaClick = this.onMediaClick.bind(this);
    this.showReplyHandler = this.showReplyHandler.bind(this);
    this.handleAnnoShowingUpdate = this.handleAnnoShowingUpdate.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.player = React.createRef();
    this.handlePageTurn = this.handlePageTurn.bind(this);
  }

  zoomIn() {
    let step = 5;
    let initialZoom = this.state.vrvOptions.scale;
    let initialHeight = this.state.vrvOptions.pageHeight;
    let initialWidth = this.state.vrvOptions.pageWidth;
    //   vrvOptions.scale = vrvOptions.scale + step;
    //   vrvOptions.pageHeight = (pageHeight * 100) / vrvOptions.scale;
    //   vrvOptions.pageWidth = (pageWidth * 100) / vrvOptions.scale;
    //
    const newVrvOptions = Object.assign({}, this.state.vrvOptions);
    newVrvOptions.scale = initialZoom + step;
    //prettier-ignore
    newVrvOptions.pageHeight = initialHeight - (newVrvOptions.scale * 5);
    //prettier-ignore
    newVrvOptions.pageWidth = initialWidth - (newVrvOptions.scale * 2);
    if (newVrvOptions.scale < 50) {
      //prettier-ignore
      newVrvOptions.pageWidth = initialWidth - (newVrvOptions.scale * 5);
    }

    if (newVrvOptions.scale < 40) {
      //prettier-ignore
      newVrvOptions.pageHeight = initialHeight - (newVrvOptions.scale * 8);
      //prettier-ignore
      newVrvOptions.pageWidth = initialWidth - (newVrvOptions.scale * 5);
    }
    if (viewPortWidth >= 1925) {
      if (newVrvOptions.pageWidth > 3500) {
        newVrvOptions.pageWidth = 3500;
      }
    }

    if (newVrvOptions.scale >= 80) {
      console.log("max zoom reached");
      return;
    }
    // if (newVrvOptions.pageWidth >= 2380) {
    //   newVrvOptions.pageWidth = 2380;
    // }
    // if (newVrvOptions.pageWidth < 1500 || newVrvOptions.pageWidth > 1500) {
    //   newVrvOptions.pageWidth = 1500;
    // }
    // if (newVrvOptions.pageHeight < 1500 || newVrvOptions.pageHeight > 1500) {
    //   newVrvOptions.pageHeight = 1500;
    // }
    console.log(
      "ZOOM INCREASE",
      newVrvOptions.scale,
      "page w",
      newVrvOptions.pageWidth,
      "page h",
      newVrvOptions.pageHeight
    );
    this.setState({ vrvOptions: newVrvOptions });
  }

  zoomOut() {
    let step = 5;
    let initialZoom = this.state.vrvOptions.scale;
    let initialHeight = this.state.vrvOptions.pageHeight;
    let initialWidth = this.state.vrvOptions.pageWidth;
    //   vrvOptions.scale = vrvOptions.scale + step;
    //   vrvOptions.pageHeight = (pageHeight * 100) / vrvOptions.scale;
    //   vrvOptions.pageWidth = (pageWidth * 100) / vrvOptions.scale;
    //
    const newVrvOptions = Object.assign({}, this.state.vrvOptions);
    newVrvOptions.scale = initialZoom - step;
    //prettier-ignore
    newVrvOptions.pageHeight = initialHeight + (newVrvOptions.scale * 5);
    //prettier-ignore
    newVrvOptions.pageWidth = initialWidth + (newVrvOptions.scale * 2);
    if (newVrvOptions.scale < 50) {
      //prettier-ignore
      newVrvOptions.pageWidth = initialWidth + (newVrvOptions.scale * 5);
    }

    if (newVrvOptions.scale < 40) {
      //prettier-ignore
      newVrvOptions.pageHeight = initialHeight + (newVrvOptions.scale * 8);
      //prettier-ignore
      newVrvOptions.pageWidth = initialWidth + (newVrvOptions.scale * 5);
    }

    if (newVrvOptions.scale <= 25) {
      console.log("minimum zoom reached");
      return;
    }
    // if (newVrvOptions.pageWidth < 1500 || newVrvOptions.pageWidth > 1500) {
    //   newVrvOptions.pageWidth = 1500;
    // }
    // if (newVrvOptions.pageHeight < 1500 || newVrvOptions.pageHeight > 1500) {
    //   newVrvOptions.pageHeight = 1500;
    // }
    console.log(
      "ZOOM DECREASE",
      newVrvOptions.scale,
      "page w",
      newVrvOptions.pageWidth,
      "page h",
      newVrvOptions.pageHeight
    );
    this.setState({ vrvOptions: newVrvOptions });
  }

  showReplyHandler = () => {
    this.setState({ areRepliesVisible: !this.state.areRepliesVisible });
  };
  activateModal = () => {
    this.setState({ helpWindowIsActive: true });
  };

  deactivateModal = () => {
    this.setState({ helpWindowIsActive: false });
  };

  convertCoords(elem) {
    if (
      document.getElementById(elem.getAttribute("id")) &&
      elem.style.display !== "none" &&
      (elem.getBBox().x !== 0 || elem.getBBox().y !== 0)
    ) {
      //trims the box to fit within the measure and avoids overflowing slurs etc
      var staff1 = elem.getElementsByClassName("staff")[0];
      //magic from David Lewis
      var staffLines = Array.prototype.filter.call(
        staff1.children,
        (x) => x.tagName === "path"
      );
      //sets the bounding box size to the stafflines size
      var bbox = staffLines[0].getBBox();
      const x = elem.getBBox().x;
      const width = bbox.width;
      const y = elem.getBBox().y;
      const height = elem.getBBox().height;
      const offset = elem.closest("svg").parentElement.getBoundingClientRect();
      const matrix = elem.getScreenCTM();
      return {
        x: matrix.a * x + matrix.c * y + matrix.e - offset.left,
        y: matrix.b * x + matrix.d * y + matrix.f - offset.top,
        x2: matrix.a * (x + width) + matrix.c * y + matrix.e - offset.left,
        y2: matrix.b * x + matrix.d * (y + height) + matrix.f - offset.top,
      };
    } else {
      console.warn("Element unavailable on page: ", elem.getAttribute("id"));
      return { x: 0, y: 0, x2: 0, y2: 0 };
    }
  }

  onAnnoTypeChange = (e) =>
    this.setState({
      annotationType: e.target.value,
      placeholder: e.target.placeholder,
      buttonContent: "Submit to your Solid POD",
    });

  handleStringChange(selectorString) {
    this.setState({ selectorString }, () =>
      console.log(this.state.selectorString)
    );
  }

  handleSelectionChange(selection) {
    this.setState({ selection });
    /* and anything else your app needs to do when the selection changes */
  }

  onMEIInputChange = (e) => {
    this.setState({ uri: e.target.value });
  };

  hideMEIInput() {
    this.setState({ showMEIInput: !this.state.showMEIInput });
  }
  //////////// NEEDS TO WIPE TARGET REPLY AFTER RPELYING TO IT ALSO THE ANNOTATION TYPE HANDLING IS MESSY //////////////////
  onAnnoReplyHandler(replyTarget, replyTargetId) {
    this.setState({
      annotationType: "replying",
      placeholder: "you are replying to the selected annotation",
      buttonContent: "Reply to selected Solid annotation",
      replyAnnotationTarget: replyTarget,
      replyAnnotationTargetId: replyTargetId,
    });
  }

  onSubmitMEI = () => {
    this.setState(
      {
        isClicked: true,
      },
      () => {
        this.hideMEIInput();
      }
    );
  };

  onResponse(resp) {
    console.log(resp);
    if (resp.status === 201) {
      this.setState(
        {
          toggleAnnotationRetrieval: true,
        },
        () => {
          let loading = document.querySelector(".loading");
          loading.classList.remove("hidden");
          this.setState({
            toggleAnnotationRetrieval: false,
            annotationType: "describing",
            replyAnnotationTarget: [],
            replyAnnotationTargetId: "",
            placeholder: "Add your annotation...",
            annoToDisplay: [],
          });
        }
      );
    } else if (resp.status === 404) {
      alert("folder not found, check your annotation container path!");
    }
  }

  onRefreshClick() {
    if (this.state.hasContent === false) {
      return;
    } else
      this.setState(
        {
          toggleAnnotationRetrieval: true,
        },
        () => {
          let loading = document.querySelector(".loading");
          loading.classList.remove("hidden");
          this.setState({
            toggleAnnotationRetrieval: false,
            annotationType: "describing",
            replyAnnotationTarget: [],
            replyAnnotationTargetId: "",
            placeholder: "Add your annotation...",
            annoToDisplay: [],
          });
        }
      );
  }

  onMediaClick(bodyMedia) {
    console.log("button click", bodyMedia);
    //appends http fragment to avoid partial linking error
    //const mediaCue = bodies[0]["id"];
    // TODO validate properly
    const currentMedia = bodyMedia.split("#")[0];
    const seekTo = bodyMedia.split("#")[1].replace("t=", "");
    console.log("Setting up seek to: ", currentMedia, seekTo);
    this.setState({ currentMedia }, () => this.player.current.seekTo(seekTo));
  }

  onReceiveAnnotationContainerContent(content) {
    if (!content || !content.length) {
      alert("no annotation to retrieve");
      const noLongerInFocusList = Array.from(
        document.getElementsByClassName("inFocus")
      );
      noLongerInFocusList.forEach((noFocusElement) =>
        noFocusElement.classList.remove("inFocus")
      );
      document.querySelectorAll(".measureBox").forEach((mb) => mb.remove());
      document
        .querySelectorAll(".measureBoxBackground")
        .forEach((mb) => mb.remove());
      this.setState(
        {
          hasContent: false,
        },
        () => {
          console.log(this.state.hasContent, "no content to retrieve");
          this.setState({ hasContent: true });
        }
      );
      return;
    }
    // FIXME: Validate that these are (TROMPA?) Web Annotations
    content = content.filter((c) => c["@id"].endsWith(".jsonld"));

    let measuresToAnnotationsMapList = content.map((anno) => {
      let distinctMeasures = [];
      // replying annotations don't have distinct measures since they target
      // annotations, *not* MEI elements
      if (anno.motivation !== "replying") {
        const measures = anno.target
          .map((jsonTarget) => {
            const targetId = jsonTarget.id;
            const fragment = targetId.substr(targetId.lastIndexOf("#"));
            const element = document.querySelector(fragment);
            let measure = "";
            if (element) {
              measure = element.closest(".measure");
            }
            return measure;
          })
          .filter((el) => el); // ensure element exists on screen
        distinctMeasures = [...new Set(measures)];
      }
      return { annoId: anno["@id"], measures: distinctMeasures };
    });
    let newMap = {};
    measuresToAnnotationsMapList.forEach((measureToAnnoMap) => {
      measureToAnnoMap.measures.forEach((m) => {
        const mId = m.getAttribute("id");
        if (mId in newMap) {
          newMap[mId].push(measureToAnnoMap.annoId);
        } else {
          newMap[mId] = [measureToAnnoMap.annoId];
        }
      });
    });

    this.setState(
      { currentAnnotation: content, measuresToAnnotationsMap: newMap },
      () => {
        const noLongerInFocusList = Array.from(
          document.getElementsByClassName("inFocus")
        );
        noLongerInFocusList.forEach((noFocusElement) =>
          noFocusElement.classList.remove("inFocus")
        );
        // delete any existing measure boxes so we can redraw from blank slate
        document.querySelectorAll(".measureBox").forEach((mb) => mb.remove());
        document
          .querySelectorAll(".measureBoxBackground")
          .forEach((mb) => mb.remove());
        console.log("Mapped annotaitons ", newMap);
        console.log("current annotations ", content);
        // draw bounding boxes for all measures containing annotations
        const annotatedMeasuresOnScreen = Object.keys(
          this.state.measuresToAnnotationsMap
        ).filter(
          (measureId) => document.querySelectorAll("#" + measureId).length
        );
        console.log(
          "Annotated measures on screen: ",
          annotatedMeasuresOnScreen
        );
        annotatedMeasuresOnScreen.forEach((measureId) => {
          const coords = this.convertCoords(
            document.querySelector("#" + measureId)
          );
          console.log("Coords: ", coords);

          const measureBox = document.createElement("div");
          const measureBoxBackground = document.createElement("div");

          const coordsBox = {
            left: Math.floor(coords.x),
            top: Math.floor(coords.y),
            width: Math.ceil(coords.x2 - coords.x),
            height: Math.ceil(coords.y2 - coords.y),
          };
          console.log("Coords box: ", coordsBox);
          measureBox.setAttribute("id", "measureBox-" + measureId);
          measureBox.setAttribute("class", "measureBox");
          measureBox.setAttribute(
            "style",
            "position: absolute;" +
              "background: rgba(0, 0, 0, 0);" +
              "left: " +
              coordsBox.left +
              "px;" +
              "top: " +
              coordsBox.top +
              "px;" +
              "width: " +
              coordsBox.width +
              "px;" +
              "height: " +
              coordsBox.height +
              "px;" +
              "z-index: 1"
          );

          measureBoxBackground.setAttribute(
            "id",
            "measureBoxBackground-" + measureId
          );
          measureBoxBackground.setAttribute("class", "measureBoxBackground");
          measureBoxBackground.classList.remove("isOpen");
          measureBoxBackground.classList.add("isClosed");
          measureBoxBackground.setAttribute(
            "style",
            "position: absolute;" +
              // "background: rgba(241, 145, 0, 0.25);" +
              // "border:1px solid orange;" +
              "left: " +
              coordsBox.left +
              "px;" +
              "top: " +
              coordsBox.top +
              "px;" +
              "width: " +
              coordsBox.width +
              "px;" +
              "height: " +
              coordsBox.height +
              "px;" +
              "z-index: -1"
          );
          console.log("TRYING TO DRAW", measureBox);
          document
            .querySelector(".annotationBoxesContainer")
            .appendChild(measureBox);
          document
            .querySelector(".annotationBoxesContainer")
            .appendChild(measureBoxBackground);

          // FIXME: might need to work more on the onClick interaction
          // e.preventDefault();
          // const isBoxOpen = Array.from(e.currentTarget.classList).filter((c) =>
          //   c.startsWith("measureBox")
          // );
          // if (isBoxOpen.length > 1) {
          //   console.warn("too many open boxes", e.target);
          // }
          // // remove focus off previous inFocus elements (now outdated)
          // const noLongerOpen = Array.from(
          //   document.getElementsByClassName("isOpen")
          // );
          // noLongerOpen.forEach((noFocusElement) =>
          //   noFocusElement.classList.remove("isOpen")
          // );
          // // add focus to newly inFocus elements
          // const inOpenList = Array.from(
          //   document.getElementsByClassName(isBoxOpen[0])
          // );
          // inOpenList.forEach((focusElement) =>
          //   focusElement.classList.add("isOpen")
          // );

          measureBox.onclick = (e) => {
            const noLongerInFocusList = Array.from(
              document.getElementsByClassName("inFocus")
            );
            noLongerInFocusList.forEach((noFocusElement) =>
              noFocusElement.classList.remove("inFocus")
            );
            const bgBoxes = document.querySelectorAll(".measureBoxBackground");
            const frontBox = e.target.closest(".measureBox");
            bgBoxes.forEach((box) => {
              box.classList.add("isClosed");
              box.classList.remove("isOpen");
              const bgBoxId = box.id.split("measureBoxBackground-")[1];
              const frontBoxId = frontBox.id.split("measureBox-")[1];

              if (frontBoxId === bgBoxId) {
                box.classList.remove("isClosed");
                box.classList.add("isOpen");
                // box.setAttribute(
                //   "style",
                //   "position: absolute;" +
                //     "background: rgb(255, 255, 255);" +
                //     "border:1px solid orange;" +
                //     "left: " +
                //     coordsBox.left +
                //     "px;" +
                //     "top: " +
                //     coordsBox.top +
                //     "px;" +
                //     "width: " +
                //     coordsBox.width +
                //     "px;" +
                //     "height: " +
                //     coordsBox.height +
                //     "px;" +
                //     "z-index: -1"
                // );
              }
            });

            const noLongerShowing = Array.from(
              document.getElementsByClassName("showReply")
            );
            console.log("no longer showing ", noLongerShowing);
            //hides them

            if (noLongerShowing.length) {
              //const replyHolder = document.createElement("div");
              if (this.state.areRepliesVisible === true) {
                this.setState({ areRepliesVisible: false });
              }
              const annoContainer = document.querySelector(".listContainer");
              console.log(annoContainer);
              //annoContainer.appendChild(replyHolder);
              noLongerShowing.forEach((noReplyShowing) => {
                noReplyShowing.classList.add("hiddenReply");
                annoContainer.appendChild(noReplyShowing);
              });
              noLongerShowing.forEach((noReplyShowing) =>
                noReplyShowing.classList.remove("showReply")
              );
            }
            this.handleAnnoShowingUpdate(content, measureId);
          };
        });
      }
    );

    console.log("iteration succeded");

    content.forEach((anno) => {
      if (anno.motivation !== "replying") {
        anno.target.forEach((jsonTarget) => {
          const bodies = anno.body;
          const targetId = jsonTarget.id;
          const fragment = targetId.substr(targetId.lastIndexOf("#"));
          const element = document.querySelector(fragment);
          if (!element) {
            return console.warn("no content has been found");
          }
          const annoId = anno["@id"];
          const annoIdFragment = annoId.substr(annoId.lastIndexOf("/") + 1);
          //checks what's the motivation of the target
          switch (anno.motivation) {
            case "describing":
              if (bodies.length) {
                if ("value" in bodies[0]) {
                  // const title = document.createElementNS(
                  //   "http://www.w3.org/2000/svg",
                  //   "title"
                  // );
                  // Embeds the annotation text into this title node
                  //title.innerHTML = bodies[0]["value"];
                  //element.insertBefore(title, element.firstChild);
                  //element.classList.add(anno.anno.motivation);
                  element.classList.add("focus-" + annoIdFragment);
                }
              }
              break;
            case "linking":
              if (bodies.length) {
                // make the target clickable, linking to the (first) body URI
                // element.addEventListener(
                //   "click",
                //   function () {
                //     //appends http fragment to avoid partial linking error
                //     const URL = bodies[0]["id"];
                //     if (URL.startsWith("http")) {
                //       window.open(URL, "_blank");
                //     } else {
                //       const appendURL = "https://" + URL;
                //       window.open(appendURL, "_blank");
                //     }
                //   },
                //   true
                // );
                // and turn the cursor into a pointer as a hint that it's clickable
                element.classList.add("focus-" + annoIdFragment);
                //element.classList.add(anno.anno.motivation);
                element.classList.add("focus-" + annoIdFragment);
              }
              break;
            case "trompa:cueMedia":
              if (bodies.length) {
                // make the target clickable, seeking player to the (first) body media cue
                // element.onMediaClick = () => {
                //   //appends http fragment to avoid partial linking error
                //   const mediaCue = bodies[0]["id"];
                //   // TODO validate properly
                //   const currentMedia = mediaCue.split("#")[0];
                //   const seekTo = mediaCue.split("#")[1].replace("t=", "");
                //   console.log("Setting up seek to: ", currentMedia, seekTo);
                //   this.setState({ currentMedia }, () =>
                //     this.player.current.seekTo(seekTo)
                //   );
                // };
                // and turn the cursor into a pointer as a hint that it's clickable
                element.classList.add("focus-" + annoIdFragment);
                //element.classList.add("cueMedia");
              }
              break;
            case "trompa:cueImage":
              if (bodies.length) {
                element.classList.add("focus-" + annoIdFragment);
                //element.classList.add("cueMedia");
              }
              break;
            case "trompa:playlist": {
              return;
            }

            default:
              console.log(
                "sorry, don't know what to do for this annotation boss"
              );
          }
        });
      }
    });
    let loading = document.querySelector(".loading");
    loading.classList.add("hidden");
  }

  handleAnnoShowingUpdate(content, measureId) {
    let _annoIds = content.map((jsonIds) => {
      const annotationsIds = jsonIds["@id"];
      return annotationsIds;
    });
    let _filteredAnnoIds = this.state.measuresToAnnotationsMap[measureId];
    let compare = _annoIds.filter((anno) => _filteredAnnoIds.includes(anno));
    // compare has all annotation IDs *for our measure*
    // we want those, PLUS all replying annotations (which aren't tied to measures)
    const annotationsToDisplay = [
      ...compare,
      ...content
        .filter((anno) => anno.motivation === "replying") // get the replies
        .map((anno) => anno["@id"]), // and return their IDs
    ];
    console.log("to display: ", annotationsToDisplay);
    this.setState({
      annoToDisplay: annotationsToDisplay,
    });
  }

  handleScoreUpdate(scoreElement) {
    console.log("Received updated score DOM element: ", scoreElement);
    this.onRefreshClick();
  }

  handlePageTurn() {
    document.querySelectorAll(".measureBox").forEach((mb) => mb.remove());
    document
      .querySelectorAll(".measureBoxBackground")
      .forEach((mb) => mb.remove());
  }

  render() {
    const modal = this.state.helpWindowIsActive ? (
      <Modal
        isOpen={this.state.helpWindowIsActive}
        onRequestClose={this.deactivateModal}
        contentLabel="my modal"
        className="mymodal"
        overlayClassName="myoverlay"
        ariaHideApp={false}
      >
        <div>
          <header className="modal-header">
            <h1 className="modal-title">Help section</h1>
          </header>
          <div className="modal-body">
            <h3>
              Below you can find some tips on how to use the annotation tool:
            </h3>
            <br />
            <div style={{ height: 500, overflow: "auto" }}>
              <h4>How do I create an annotation?</h4>
              <p>
                - Select the type of selection you want to use (note, measure,
                directives etc)
                <br />
                <br />- Drag across the score in order to select the elements
                you want to annotate
                <br />
                <br />- You can select discontinuous measures by holding the
                shift key
                <br />
                <br />- Sometimes slurs can get in the way of your selection,
                you can deselect unwanted measures by holding the shift key and
                clicking on the measure you wish to deselect
                <br />
                <br />- Select the type of annotation you wish to submit
                (description, link etc)
                <br />
                <br />- Type the text or paste the URL you wish to attach to the
                annotation
                <br />
                <br />- Click the green submit button
              </p>
              <h4>I made a mistake in my annotation, how can I delete it?</h4>
              <p>
                - You can delete you annotation by clicking the rubbish bin icon
                in the annotation item and click yes to delete it
              </p>

              <h4>
                I have replied to an annotation but I can’t see my reply, where
                is it?
              </h4>
              <p>
                - You can see all the replies to the specific annotation by
                clicking the “show replies button” in the annotation you are
                replying to
              </p>
              <h4>
                Can I create a different type of reply (media or image content)?
              </h4>
              <p>
                - Not right now, this feature will be released in a future
                version of the software
              </p>
              <h4>
                How does the solid pod system work, is my data really safe?
              </h4>
              <p>
                - Solid was purposely built for data safety and protection, and
                by design everything contained in the pod is private unless
                specified. For more information visit the{" "}
                <a
                  href="https://solidproject.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  solid project
                </a>{" "}
                page for more info
              </p>
              <h4>I have found a bug, what can i do?</h4>
              <p>
                - Please submit a bug report to{" "}
                <a href="mailto:fzuba002@gold.ac.uk?subject=Bug report">
                  fzuba002@gold.ac.uk
                </a>{" "}
                describing the nature of the bug and how to reproduce it, make
                sure to include browser model and operating system used. Thanks!
                :)
              </p>
            </div>
          </div>
          <footer className="modal-footer">
            <button onClick={this.deactivateModal}>close</button>
          </footer>
        </div>
      </Modal>
    ) : (
      false
    );
    return (
      <div>
        {this.state.isClicked === true && (
          <div>
            <div className="scoreContainer">
              <div className="annotationBoxesContainer" />
              <SelectableScore
                uri={this.state.uri}
                annotationContainerUri={this.props.submitUri}
                vrvOptions={this.state.vrvOptions}
                onSelectionChange={this.handleSelectionChange}
                selectorString={this.state.selectorString}
                onScoreUpdate={this.handleScoreUpdate}
                onReceiveAnnotationContainerContent={
                  this.onReceiveAnnotationContainerContent
                }
                toggleAnnotationRetrieval={this.state.toggleAnnotationRetrieval}
                selectionArea=".scoreContainer"
              />
            </div>
            <div className="controls">
              <div className="prevPageButton" onClick={this.handlePageTurn}>
                <PrevPageButton
                  buttonContent={
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="arrow-to-left"
                      className="svg-inline--fa fa-arrow-to-left fa-w-14"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="100%"
                      height="100%"
                    >
                      <path
                        fill="grey"
                        d="M247.9 412.5l-148.4-148c-4.7-4.7-4.7-12.3 0-17l148.4-148c4.7-4.7 12.3-4.7 17 0l19.6 19.6c4.8 4.8 4.7 12.5-.2 17.1L187.2 230H436c6.6 0 12 5.4 12 12v28c0 6.6-5.4 12-12 12H187.2l97.1 93.7c4.8 4.7 4.9 12.4.2 17.1l-19.6 19.6c-4.7 4.8-12.3 4.8-17 .1zM52 436V76c0-6.6-5.4-12-12-12H12C5.4 64 0 69.4 0 76v360c0 6.6 5.4 12 12 12h28c6.6 0 12-5.4 12-12z"
                      ></path>
                    </svg>
                  }
                  uri={this.state.uri}
                />
              </div>
              <button onClick={this.zoomOut} className="zoomOut">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search-minus"
                  className="svg-inline--fa fa-search-minus fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="100%"
                  height="100%"
                >
                  <path
                    fill="grey"
                    d="M304 192v32c0 6.6-5.4 12-12 12H124c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm201 284.7L476.7 505c-9.4 9.4-24.6 9.4-33.9 0L343 405.3c-4.5-4.5-7-10.6-7-17V372c-35.3 27.6-79.7 44-128 44C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 48.3-16.4 92.7-44 128h16.3c6.4 0 12.5 2.5 17 7l99.7 99.7c9.3 9.4 9.3 24.6 0 34zM344 208c0-75.2-60.8-136-136-136S72 132.8 72 208s60.8 136 136 136 136-60.8 136-136z"
                  ></path>
                </svg>
              </button>
              {/* pass anything as buttonContent that you'd like to function as a clickable next page button */}
              <button onClick={this.zoomIn} className="zoomIn">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search-plus"
                  className="svg-inline--fa fa-search-plus fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="100%"
                  height="100%"
                >
                  <path
                    fill="grey"
                    d="M304 192v32c0 6.6-5.4 12-12 12h-56v56c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-56h-56c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h56v-56c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v56h56c6.6 0 12 5.4 12 12zm201 284.7L476.7 505c-9.4 9.4-24.6 9.4-33.9 0L343 405.3c-4.5-4.5-7-10.6-7-17V372c-35.3 27.6-79.7 44-128 44C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 48.3-16.4 92.7-44 128h16.3c6.4 0 12.5 2.5 17 7l99.7 99.7c9.3 9.4 9.3 24.6 0 34zM344 208c0-75.2-60.8-136-136-136S72 132.8 72 208s60.8 136 136 136 136-60.8 136-136z"
                  ></path>
                </svg>
              </button>
              <div className="nextPageButton" onClick={this.handlePageTurn}>
                <NextPageButton
                  buttonContent={
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="arrow-to-right"
                      className="svg-inline--fa fa-arrow-to-right fa-w-14"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="100%"
                      height="100%"
                    >
                      <path
                        fill="grey"
                        d="M200.1 99.5l148.4 148c4.7 4.7 4.7 12.3 0 17l-148.4 148c-4.7 4.7-12.3 4.7-17 0l-19.6-19.6c-4.8-4.8-4.7-12.5.2-17.1l97.1-93.7H12c-6.6 0-12-5.4-12-12v-28c0-6.6 5.4-12 12-12h248.8l-97.1-93.7c-4.8-4.7-4.9-12.4-.2-17.1l19.6-19.6c4.7-4.9 12.3-4.9 17-.2zM396 76v360c0 6.6 5.4 12 12 12h28c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12h-28c-6.6 0-12 5.4-12 12z"
                      ></path>
                    </svg>
                  }
                  uri={this.state.uri}
                />
              </div>
            </div>
          </div>
        )}
        {this.state.showMEIInput && (
          <div>
            <p>Select your MEI file:</p>
            <input
              type="text"
              onChange={this.onMEIInputChange}
              placeholder="mahler four hands rendition..."
              className="sizedTextBox"
            />

            <input
              title="click to render the linked MEI file"
              className="MEIButton"
              type="button"
              onClick={this.onSubmitMEI}
              value="render"
            />
          </div>
        )}

        {/*selector for the component selection*/}
        <SelectionHandler
          selectorString={this.state.selectorString}
          handleStringChange={this.handleStringChange}
        />
        {/*annotation submission component*/}
        <AnnotationSubmitter
          onAnnoTypeChange={this.onAnnoTypeChange}
          uri={this.state.uri}
          submitUri={this.props.submitUri}
          selection={this.state.selection}
          onResponse={this.onResponse}
          onRefreshClick={this.onRefreshClick}
          annotationType={this.state.annotationType}
          placeholder={this.state.placeholder}
          replyAnnotationTarget={this.state.replyAnnotationTarget}
          buttonContent={this.state.buttonContent}
          creator={this.props.userId}
          selectorString={this.state.selectorString}
          replyAnnotationTargetId={this.state.replyAnnotationTargetId}
          replyAnnoBody={this.state.replyAnnoBody}
        />
        {/*as buttonContent that you'd like to function as a clickable prev page
        button */}

        <RenditionsPlaylist
          allEntries={this.state.currentAnnotation}
          onRefreshClick={this.onRefreshClick}
        />

        <AnnotationList
          allEntries={this.state.currentAnnotation}
          filteringEntries={this.state.annoToDisplay}
          onAnnoReplyHandler={this.onAnnoReplyHandler}
          onMediaClick={this.onMediaClick}
          replyAnnotationTarget={this.state.replyAnnotationTarget}
          showReplyHandler={this.showReplyHandler}
          areRepliesVisible={this.state.areRepliesVisible}
          onRefreshClick={this.onRefreshClick}
        />
        <div className="loading hidden">
          Loading...
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="loader"
            height="100%"
            width="100%"
          >
            <circle cx="50" cy="50" r="45" />
          </svg>
        </div>

        <div>
          <button
            onClick={this.activateModal}
            style={{ padding: "5px", marginTop: "5px", marginLeft: "5px" }}
          >
            help
          </button>
          {modal}
        </div>

        <ReactPlayer
          width="80%"
          height="80%"
          ref={this.player}
          url={this.state.currentMedia}
          controls={true}
          onReady={() => {
            if (this.state.seekTo) {
              console.log("Seeking to: ", this.state.seekTo);
              this.player.current.seekTo(Math.floor(this.state.seekTo));
              this.setState({ seekTo: "" });
            }
          }}
        />
      </div>
    );
  }
}
