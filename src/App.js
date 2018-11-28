import React, { Component } from "react";
import "./app.css";

import ChatBot, { Loading } from "react-simple-chatbot";
import DropList from "./components/DropList";
import DoubleDropdown from "./components/DoubleDropdown";
import axios from "axios";
import Calculate from "./components/Calculate";

class App extends Component {
  state = { data: "data" };

  handleEnd = ({ steps, values }) => {
    console.log(values);
    const {
      coverage,
      year,
      model,
      deductible_collision,
      deductible_comprehensive,
      make,
      license_date,
      incidents,
      driver_dob
    } = this.state;
    const obj = {
      car_insurances: [
        {
          monthly_cost: "100",
          zipcode_where_parked: values[0],
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
      .post("https://api.sikka.app/user/rate_model/guest/", obj)
      .then(data => console.log("success", data))
      .catch(err => console.log("err", err));
  };

  doubleSelected = (key, item) => {
    var obj = {};
    obj[key] = item;
    this.setState(obj, () => console.log("look", this.state));
  };

  optionSelected = (key, item) => {
    if (key == "make") {
      localStorage.setItem("key", item.value);
    }
    var obj = {};
    obj[key] = item.value;

    return this.setState(obj);
  };

  render() {
    console.log("state", this.state);
    const { state } = this;

    return (
      <div className="App">
        <div>
          <ChatBot
            className="hello"
            handleEnd={this.handleEnd}
            steps={[
              {
                id: "1",
                message: `Hi ${this.props.name ||
                  ""}! I'm Claudia. Let's make sure you are not over paying for insurance. This will only take a minute.`,
                trigger: "2"
              },
              {
                id: "2",
                message:
                  "To start I will need your zip code where your car is parked",
                trigger: "zip"
              },
              {
                id: "zip",
                user: true,
                validator: value => {
                  if (isNaN(value) || value.length < 5) {
                    return "Please provide correct Zip code";
                  }
                  return true;
                },
                trigger: "3"
              },

              {
                id: "3",
                message: "What year is the car you drive",
                trigger: "car-year"
              },

              {
                id: "car-year",
                component: (
                  <DropList
                    question="Select Year"
                    url="https://api.sikka.app/user/dropdown/list/?parent=year"
                    call={this.optionSelected}
                    keyID="year"
                  />
                ),
                waitAction: true,

                trigger: "4"
              },
              {
                id: "4",
                message: "What is the make of your car",

                trigger: "make"
              },
              {
                id: "make",
                component: (
                  <DropList
                    question="choose maker"
                    url="https://api.sikka.app/user/dropdown/list/?parent=make"
                    call={this.optionSelected}
                    keyID="make"
                  />
                ),
                waitAction: true,
                trigger: "5"
              },
              {
                id: "5",
                message: "What is the model of your car",
                trigger: "model"
              },
              {
                id: "model",
                component: (
                  <DropList
                    question="Car Model"
                    url={`https://api.sikka.app/user/dropdown/list/?parent=model&filter=${localStorage.getItem(
                      "key"
                    )}`}
                    call={this.optionSelected}
                    keyID="model"
                  />
                ),
                waitAction: true,
                trigger: "6"
              },
              {
                id: "6",
                message:
                  "When did the primary driver get their US driving license?",
                trigger: "license_date"
              },
              {
                id: "license_date",
                component: (
                  <DoubleDropdown
                    question="Month and Year"
                    url="https://api.sikka.app/user/dropdown/list/?parent=year"
                    call={this.doubleSelected}
                    keyID="license_date"
                  />
                ),
                waitAction: true,
                trigger: "7"
              },
              {
                id: "7",
                message:
                  "How many driving incidents has the primary driver had in the last three years?",
                trigger: "incidents"
              },
              {
                id: "incidents",
                component: (
                  <DropList
                    question="Number of incidents"
                    url="https://api.sikka.app/user/dropdown/list/?parent=incidents"
                    call={this.optionSelected}
                    keyID="incidents"
                  />
                ),
                waitAction: true,
                trigger: "8"
              },
              {
                id: "8",
                message: "What is the DOB of the primary driver?",
                trigger: "driver_dob"
              },
              {
                id: "driver_dob",
                component: (
                  <DoubleDropdown
                    question="Month and Year"
                    url="https://api.sikka.app/user/dropdown/list/?parent=year"
                    call={this.doubleSelected}
                    keyID="driver_dob"
                  />
                ),
                waitAction: true,
                trigger: "9"
              },
              {
                id: "9",
                message: "What is the collision deductible you want?",
                trigger: "deductible_collision"
              },
              {
                id: "deductible_collision",
                component: (
                  <DropList
                    question="collision"
                    url="https://api.sikka.app/user/dropdown/list/?parent=deductible_collision"
                    call={this.optionSelected}
                    keyID="deductible_collision"
                  />
                ),
                waitAction: true,
                trigger: "10"
              },
              {
                id: "10",
                message: "What is the comprehensive deductible you want?",
                trigger: "deductible_comprehensive"
              },
              {
                id: "deductible_comprehensive",
                component: (
                  <DropList
                    question="comprehensive deductible"
                    url="https://api.sikka.app/user/dropdown/list/?parent=deductible_comprehensive"
                    call={this.optionSelected}
                    keyID="deductible_comprehensive"
                  />
                ),
                waitAction: true,
                trigger: "11"
              },
              {
                id: "11",
                message: "What are the coverage levels you want?",
                trigger: "coverage"
              },
              {
                id: "coverage",
                component: (
                  <DropList
                    question="coverage levels"
                    url="https://api.sikka.app/user/dropdown/list/?parent=coverage"
                    call={this.optionSelected}
                    keyID="coverage"
                  />
                ),
                waitAction: true,
                trigger: "12"
              },
              {
                id: "12",
                message: "Thanks for all your inputs!",
                trigger: "13"
              },
              {
                id: "13",
                component: (
                  <Calculate
                    url="https://api.sikka.app/user/rate_model/guest/"
                    data={state}
                  />
                ),
                asMessage: true,
                waitAction: true,
                trigger: "2way"
              },
              {
                id: "2way",
                options: [
                  {
                    value: "Refining Quote",
                    label: "Refining Quote",
                    trigger: "14"
                  },
                  { value: "Shop", label: "Shop", trigger: "shop" }
                ]
              },

              {
                id: "14",
                message:
                  "Great just a couple more questions and we will give you a more precise estimate. ",
                trigger: "15"
              },
              {
                id: "15",
                message: "What is your gender? ",
                trigger: "gender"
              },
              {
                id: "gender",
                options: [
                  { value: "male", label: "Male", trigger: "16" },
                  { value: "female", label: "Female", trigger: "16" }
                ]
              },
              {
                id: "16",
                message: "What is the average mileage per year you drive? ",
                trigger: "mileage"
              },
              {
                id: "mileage",
                component: (
                  <DropList
                    question="About mileage"
                    url="https://api.sikka.app/user/dropdown/list/?parent=mileage"
                    call={this.optionSelected}
                    keyID="mileage"
                  />
                ),
                waitAction: true,
                trigger: "17"
              },
              {
                id: "17",
                message: "How long have you been with this provider? ",
                trigger: "provideTime"
              },
              {
                id: "provideTime",
                user: true,
                validator: value => {
                  if (isNaN(value)) {
                    return "value should be a number";
                  }
                  return true;
                },
                trigger: "18"
              },
              {
                id: "18",
                message: "What are the safety features in your car? ",
                trigger: "safety"
              },
              {
                id: "safety",
                component: (
                  <DropList
                    question="safety"
                    url="https://api.sikka.app/user/dropdown/list/?parent=safety_features"
                    call={this.optionSelected}
                    keyID="safety"
                  />
                ),
                waitAction: true,
                trigger: "19"
              },

              {
                id: "19",
                component: (
                  <Calculate url="https://api.sikka.app/user/rate_model/guest/" />
                ),
                asMessage: true,
                waitAction: true,
                trigger: "20"
              },
              {
                id: "20",
                message: "Great lets get you started.  ",
                trigger: "shopButton"
              },
              {
                id: "shopButton",
                options: [{ value: "Shop", label: "Shop", trigger: "shop" }]
              },
              {
                id: "shop",
                component: <Calculate url="https://api/" message="Thank you" />,
                asMessage: true,
                end: true
              }
            ]}
          />
        </div>
      </div>
    );
  }
}
//console.log(new Date().toISOString());

export default App;
