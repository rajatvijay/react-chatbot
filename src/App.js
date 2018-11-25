import React, { Component } from "react";
import "./app.css";

import ChatBot, { Loading } from "react-simple-chatbot";
import DropList from "./components/DropList";
import DoubleDropdown from "./components/DoubleDropdown";

class App extends Component {
  state = { data: "data", SelectedCarMaker: "" };

  handleEnd({ steps, values }) {
    console.log(values);
  }

  doubleSelected = (key, item) => {
    var obj = {};
    obj[key] = item;
    this.setState(obj, () => console.log("look", this.state));
  };

  optionSelected = (key, item) => {
    var obj = {};
    obj[key] = item.value;

    this.setState(obj);
  };

  render() {
    console.log("state", this.state);
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
                trigger: "Zip"
              },
              {
                id: "Zip",
                user: true,
                validator: value => {
                  if (isNaN(value) || value.length < 5) {
                    return "Please provide correct Zip code";
                  }
                  return true;
                },
                trigger: "car-year"
              },

              {
                id: "car-year",
                message: "What year is the car you drive",
                trigger: "3"
              },

              {
                id: "3",
                component: (
                  <DropList
                    question="Select Year"
                    call={this.optionSelected}
                    keyID="SelectedCarYear"
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
                    call={this.optionSelected}
                    keyID="SelectedCarMaker"
                  />
                ),
                waitAction: true,
                trigger: "5"
              },
              {
                id: "5",
                message: "What is the model of your car",
                trigger: "car-model"
              },
              {
                id: "car-model",
                component: (
                  <DropList
                    question="Car Model"
                    call={this.optionSelected}
                    keyID="SelectedCarModel"
                  />
                ),
                waitAction: true,
                trigger: "6"
              },
              {
                id: "6",
                message:
                  "When did the primary driver get their US driving license?",
                trigger: "license"
              },
              {
                id: "license",
                component: (
                  <DoubleDropdown
                    question="Month and Year"
                    call={this.doubleSelected}
                    keyID="licenese"
                  />
                ),
                waitAction: true,
                trigger: "7"
              },
              {
                id: "7",
                message:
                  "How many driving incidents has the primary driver had in the last three years?",
                trigger: "incident"
              },
              {
                id: "incident",
                component: (
                  <DropList
                    question="Number of incidents"
                    call={this.optionSelected}
                    keyID="incident"
                  />
                ),
                waitAction: true,
                trigger: "8"
              },
              {
                id: "8",
                message: "What is the age of the primary driver?",
                trigger: "driver-age"
              },
              {
                id: "driver-age",
                component: (
                  <DoubleDropdown
                    question="Month and Year"
                    call={this.doubleSelected}
                    keyID="driverAge"
                  />
                ),
                waitAction: true,
                trigger: "9"
              },
              {
                id: "9",
                message: "What is the collision deductible you want?",
                trigger: "collision"
              },
              {
                id: "collision",
                component: (
                  <DropList
                    question="collision"
                    call={this.optionSelected}
                    keyID="collision"
                  />
                ),
                waitAction: true,
                trigger: "10"
              },
              {
                id: "10",
                message: "What is the comprehensive deductible you want?",
                trigger: "comprehensive"
              },
              {
                id: "comprehensive",
                component: (
                  <DropList
                    question="comprehensive deductible"
                    call={this.optionSelected}
                    keyID="comprehensive"
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
                message:
                  "We estimate you can save <$saving_amount> from <#> providers",
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
                  { value: "Shop", label: "Shop", trigger: "19" }
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
                component: (
                  <DropList
                    question="Time"
                    call={this.optionSelected}
                    keyID="provideTime"
                  />
                ),
                waitAction: true,
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
                    call={this.optionSelected}
                    keyID="provideTime"
                  />
                ),
                waitAction: true,
                trigger: "19"
              },
              {
                id: "19",
                message: "Great lets get you started.  ",
                end: true
              }
            ]}
          />
        </div>
      </div>
    );
  }
}

export default App;
