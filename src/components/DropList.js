import React, { Component } from "react";
import PropTypes from "prop-types";
import ChatBot, { Loading } from "react-simple-chatbot";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";

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
      loading: true,
      result: "",
      default: "choose value",
      trigger: false,
      options: []
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

  componentWillMount() {
    console.log("steps", this.props.steps);
    console.log("url", this.props.url);
    axios
      .get(this.props.url, {
        headers: {}
      })
      .then(data => {
        console.log("api", data.data.data.list);
        const { list } = data.data.data;
        this.setState({ options: list.length > 0 ? list : options }, () => {
          this.setState({ loading: false });
        });
      })
      .catch(err => console.log("error", err));
  }

  triggetNext(item) {
    const { keyID, call } = this.props;
    // var lastProperty;
    // for (lastProperty in this.props.steps);
    // lastProperty;
    // lastProperty.value = item.values;
    call(keyID, item);

    this.setState({ trigger: true, default: item.value }, () => {
      this.props.triggerNextStep({ value: item.value });
    });
  }

  render() {
    const { trigger, loading, result, options } = this.state;
    console.log("result", result);
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
              <Dropdown
                options={options}
                onChange={this.triggetNext}
                value={options[0]}
                placeholder="Select an option"
              />
            )}
            <br />
            {this.state.default}
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
