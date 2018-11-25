import React, { Component } from "react";
import PropTypes from "prop-types";
import ChatBot, { Loading } from "react-simple-chatbot";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const options = [
  { value: "one", label: "One" },
  {
    value: "two",
    label: "Two",
    className: "myOptionClassName"
  },
  {
    type: "group",
    name: "group1",
    items: [
      {
        value: "three",
        label: "Three",
        className: "myOptionClassName"
      },
      { value: "four", label: "Four" }
    ]
  },
  {
    type: "group",
    name: "group2",
    items: [{ value: "five", label: "Five" }, { value: "six", label: "Six" }]
  }
];

class DropList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      result: "",
      default: "Choose month and year",

      trigger: false,
      month: "",
      year: ""
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

  // componentWillMount() {
  //   const self = this;
  //   const { steps } = this.props;
  //   const search = steps.search.value;
  //   const endpoint = encodeURI("https://dbpedia.org");
  //   const query = encodeURI(`
  //     select * where {
  //     ?x rdfs:label "${search}"@en .
  //     ?x rdfs:comment ?comment .
  //     FILTER (lang(?comment) = 'en')
  //     } LIMIT 100
  //   `);
  //
  //   const queryUrl = `https://dbpedia.org/sparql/?default-graph-uri=${endpoint}&query=${query}&format=json`;
  //
  //   const xhr = new XMLHttpRequest();
  //
  //   xhr.addEventListener("readystatechange", readyStateChange);
  //
  //   function readyStateChange() {
  //     if (this.readyState === 4) {
  //       const data = JSON.parse(this.responseText);
  //       const bindings = data.results.bindings;
  //       if (bindings && bindings.length > 0) {
  //         self.setState({ loading: false, result: bindings[0].comment.value });
  //       } else {
  //         self.setState({ loading: false, result: "Not found." });
  //       }
  //     }
  //   }
  //
  //   xhr.open("GET", queryUrl);
  //   xhr.send();
  // }

  triggetNext(item, val) {
    const { keyID, call } = this.props;

    // if (val === "1") {
    //   this.setState({ month: item.value }, () => {
    //     console.log(this.state);
    //     this.props.triggerNextStep();
    //     if (month != "") {
    //       this.setState({ trigger: true, default: item.value }, () => {
    //         call(keyID, item);
    //       });
    //     }
    //   });
    // }
    // if (val === "2") {
    //   this.setState({ year: item.value }, () => {
    //     console.log(this.state);
    //     if (month != "" && year != "") {
    //       this.setState({ trigger: true, default: item.value }, () => {
    //         call(keyID, { month, year });
    //         this.props.triggerNextStep();
    //       });
    //     }
    //   });
    // }
    if (val === "1") {
      this.setState({ month: item.value }, val => {
        if (this.state.month && this.state.year) {
          this.setState({ trigger: true }, () => {
            const { month, year } = this.state;
            call(keyID, { month, year });
            this.props.triggerNextStep();
          });
        }
      });
    }
    if (val === "2") {
      this.setState({ year: item.value }, val => {
        if (this.state.month && this.state.year) {
          this.setState({ trigger: true }, () => {
            const { month, year } = this.state;
            call(keyID, { month, year });
            this.props.triggerNextStep();
          });
        }
      });
    }

    // if (month || year) {
    //   this.setState({ trigger: true, default: item.value }, () => {
    //     call(keyID, { month, year });
    //     this.props.triggerNextStep();
    //   });
    // }
  }

  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div className="dbpedia">
        {loading ? <Loading /> : result}
        {!loading && (
          <div
            style={{
              textAlign: "center",
              marginTop: 20
            }}
          >
            {this.props.question}
            {!trigger && (
              <div>
                <Dropdown
                  options={options}
                  onChange={item => this.triggetNext(item, "1")}
                  value="Month"
                  placeholder="Select an option"
                />
                <Dropdown
                  options={options}
                  onChange={item => this.triggetNext(item, "2")}
                  value="Year"
                  placeholder="Select an option"
                />
              </div>
            )}
            <br />
            <div>
              {this.state.month},{this.state.year}
            </div>
          </div>
        )}
      </div>
    );
  }
}

DropList.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func
};

DropList.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined
};

export default DropList;
