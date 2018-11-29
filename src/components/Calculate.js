import React, { Component } from "react";
import PropTypes from "prop-types";
import ChatBot, { Loading } from "react-simple-chatbot";
import axios from "axios";

class Calculate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: "",
      trigger: false,
      save: null
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

  // componentWillMount() {
  //   const self = this;
  //   const { steps } = this.props;
  //   const search = steps.search.value;
  //   const endpoint = encodeURI('https://dbpedia.org');
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
  //   xhr.addEventListener('readystatechange', readyStateChange);
  //
  //   function readyStateChange() {
  //     if (this.readyState === 4) {
  //       const data = JSON.parse(this.responseText);
  //       const bindings = data.results.bindings;
  //       if (bindings && bindings.length > 0) {
  //         self.setState({ loading: false, result: bindings[0].comment.value });
  //       } else {
  //         self.setState({ loading: false, result: 'Not found.' });
  //       }
  //     }
  //   }
  //
  //   xhr.open('GET', queryUrl);
  //   xhr.send();
  // }

  componentDidMount() {
    console.log(this.props.data);
  }

  componentWillMount() {
    // console.log("print", this.props.data);
    var customObj = {};
    const { steps } = this.props;
    console.log("finalsteps", this.props.steps);
    for (var i in steps) {
      customObj[i] = steps[i].value;
    }
    console.log("lastobject", customObj);

    const {
      coverage,
      zip,
      year,
      model,
      deductible_collision,
      deductible_comprehensive,
      make,
      license_date,
      incidents,
      driver_dob,
      email
    } = customObj;

    const obj = {
      email,
      car_insurances: [
        {
          monthly_cost: "100",
          zipcode_where_parked: zip,
          coverage: "100",
          car: [
            {
              year,
              make,
              model,
              deductible_collision: deductible_collision.slice(1),
              deductible_comprehensive: deductible_comprehensive.slice(1)
            }
          ],
          driver: [
            {
              driver_name: "john",
              license_date: new Date(
                `${license_date.year.toString()}.${license_date.month}.01`
              ).toISOString(),
              incidents,
              driver_dob: new Date(
                `${driver_dob.year.toString()}.${driver_dob.month}.01`
              ).toISOString()
            }
          ]
        }
      ]
    };

    axios
      .post(this.props.url, obj)
      .then(data => {
        console.log("data", data);
        if (data.data.data.rate_model) {
          const { rate } = data.data.data.rate_model;
          this.setState({ save: rate, loading: false }, () => {
            this.props.triggerNextStep();
          });
        } else {
          this.setState({ loading: false }, () => {
            this.props.triggerNextStep();
          });
        }
      })
      .catch(err => {
        console.log("err", err);
        this.setState({ loading: false }, () => {
          this.props.triggerNextStep();
        });
      });
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { trigger, loading, result, save } = this.state;

    return (
      <div className="dbpedia">
        {loading ? <Loading /> : result}
        {!loading && (
          <div>
            {!trigger && (
              <div>
                {this.props.message
                  ? this.props.message
                  : `We estimate you can save ${save} from other providers`}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

Calculate.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func
};

Calculate.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined
};

export default Calculate;
