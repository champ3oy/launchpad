import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Header from "./components/HeaderItem";
import Param from "./components/ParamItem";
import "@expo/match-media";
import MediaQuery from "react-responsive";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      GET: true,
      POST: false,
      PUT: false,
      DELETE: false,
      action: "GET",
      response: {},
      api: "",
    };
  }

  async _performAction(url = "", data = {}) {
    await fetch(url, {
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
    }).then((data) => {
      this.setState({ response: data });
      console.log(data);
      console.log(data.data);
      console.log(data.headers);
    });

    // Default options are marked with *
    // const response = await
    // fetch(url, {
    //   method: "GET", // *GET, POST, PUT, DELETE, etc.
    //   mode: "no-cors", // no-cors, *cors, same-origin
    //   // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //   // credentials: "same-origin", // include, *same-origin, omit
    //   // headers: {
    //   //   "Content-Type": "application/json",
    //   //   // 'Content-Type': 'application/x-www-form-urlencoded',
    //   // },
    //   // redirect: "follow", // manual, *follow, error
    //   // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //   // if (data) {
    //   //   body: JSON.stringify(data)
    //   // }, // body data type must match "Content-Type" header
    // })
    //   .then((response) => {
    //     console.log(response.status);
    //     console.log(response.json());
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     this.setState({ response: data });
    //   });
    /*     console.log(response.json().body)
    return response.json(); // parses JSON response into native JavaScript eobjcts */
  }

  render() {
    let makeActive = (arg) => {
      if (arg === "GET") {
        this.setState({ GET: true });
        this.setState({ POST: false });
        this.setState({ PUT: false });
        this.setState({ DELETE: false });
        this.setState({ action: "GET" });
      } else if (arg === "POST") {
        this.setState({ GET: false });
        this.setState({ POST: true });
        this.setState({ PUT: false });
        this.setState({ DELETE: false });
        this.setState({ action: "POST" });
      } else if (arg === "PUT") {
        this.setState({ GET: false });
        this.setState({ POST: false });
        this.setState({ PUT: true });
        this.setState({ DELETE: false });
        this.setState({ action: "PUT" });
      } else if (arg === "DELETE") {
        this.setState({ GET: false });
        this.setState({ POST: false });
        this.setState({ PUT: false });
        this.setState({ DELETE: true });
        this.setState({ action: "DELETE" });
      }
    };

    let responseText = (
      <div style={{ flexDirection: "row" }}>
        <Text style={{ color: "#dde2f4", marginBottom: 10 }}>
          API endpoint :{" "}
        </Text>
        <Text style={{ color: "orange", marginBottom: 10 }}>
          {this.state.response.url}
        </Text>
      </div>
    );

    return (
      <View style={styles.container}>
        <MediaQuery minDeviceWidth={700}>
          <View style={styles.header}>
            <Text style={styles.brand}> 🚀 </Text>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.newButton}>
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 16 }}
                >
                  New +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 20,
            }}
          >
            <Text style={{ fontSize: 100, fontWeight: "bold", color: "white" }}>
              LaunchPad 🚀
            </Text>
          </View>

          <View style={styles.container2}>
            <View
              style={{
                flexDirection: "row",
                width: "auto",
                height: 50,
                backgroundColor: "#2b2f40",
                borderRadius: 5,
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <View
                style={{
                  width: 70,
                  height: 50,
                  borderRightWidth: 3,
                  borderRightColor: "#161822",
                  marginRight: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: "#8b57df",
                    fontSize: "15",
                    fontWeight: "bold",
                  }}
                >
                  {this.state.action}
                </Text>
              </View>
              <View
                style={{
                  width: 470,
                }}
              >
                <TextInput
                  style={{
                    fontSize: 15,
                    color: "#dde2f4",
                    paddingHorizontal: 10,
                  }}
                  placeholder="API URL"
                  onChangeText={(api) => this.setState({ api: api })}
                />
              </View>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 50,
                  marginLeft: 5,
                  alignItems: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#8b57df",
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  borderLeftColor: "#161822",
                  borderLeftWidth: 3,
                }}
                onPress={() => {
                  let res = this._performAction(this.state.api);
                  console.log(this.state.api);
                  this.setState({ response: JSON.stringify(res) });
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  LAUNCH 🚀
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: 650,
                height: 50,
                backgroundColor: "#2b2f40",
                borderRadius: 5,
                alignItems: "center",
                marginTop: 3,
                padding: 10,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.option,
                  this.state.GET ? { backgroundColor: "#8b57df" } : null,
                ]}
                onPress={() => makeActive("GET")}
              >
                <Text
                  style={{
                    color: this.state.GET ? "#dde2f4" : "#8b57df",
                    fontSize: "15",
                    fontWeight: "bold",
                  }}
                >
                  GET
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  this.state.POST ? { backgroundColor: "#8b57df" } : null,
                ]}
                onPress={() => makeActive("POST")}
              >
                <Text
                  style={{
                    color: this.state.POST ? "#dde2f4" : "#8b57df",
                    fontSize: "15",
                    fontWeight: "bold",
                  }}
                >
                  POST
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  this.state.PUT ? { backgroundColor: "#8b57df" } : null,
                ]}
                onPress={() => makeActive("PUT")}
              >
                <Text
                  style={{
                    color: this.state.PUT ? "#dde2f4" : "#8b57df",
                    fontSize: "15",
                    fontWeight: "bold",
                  }}
                >
                  PUT
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  this.state.DELETE ? { backgroundColor: "#8b57df" } : null,
                ]}
                onPress={() => makeActive("DELETE")}
              >
                <Text
                  style={{
                    color: this.state.DELETE ? "#dde2f4" : "#8b57df",
                    fontSize: "15",
                    fontWeight: "bold",
                  }}
                >
                  DELETE
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputCon}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  marginBottom: 10,
                  color: "#dde2f4",
                }}
              >
                Authentication
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <TextInput
                  style={{
                    width: "100%",
                    fontSize: 15,
                    marginRight: 10,
                    borderBottomColor: "#8b57df",
                    borderBottomWidth: 3,
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    color: "#dde2f4",
                  }}
                  placeholder="Authentication"
                />
              </View>
            </View>

            <View style={{ marginBottom: 0 }}>
              <Header />
            </View>

            <View style={{ marginBottom: 0 }}>
              <Param />
            </View>

            <View style={[styles.inputCon, { marginBottom: 20 }]}>
              <Text style={styles.inputh1}>Response</Text>
              <View
                style={{
                  flexDirection: "column",
                  backgroundColor: "#101119",
                  // height: 40,
                  marginBottom: 10,
                  borderLeftWidth: 3,
                  borderLeftColor: "#8b57df",
                  padding: 10,
                }}
              >
                {responseText}
              </View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              padding: 30,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ color: "#dde2f4", fontSize: 16, fontWeight: "bold" }}
            >
              LaunchPad &copy; 2020
            </Text>
            <Text style={{ color: "#dde2f4", fontSize: 16 }}>@ cirlorm_io</Text>
          </View>
        </MediaQuery>

        <MediaQuery maxDeviceWidth={700} minDeviceWidth={450}>
          <View style={styles.headerMobile}>
            <Text style={styles.brandMobile}> 🚀 </Text>
            <View style={styles.buttonsMobile}>
              <TouchableOpacity style={styles.newButtonMobile}>
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 16 }}
                >
                  New +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 20,
            }}
          >
            <Text style={{ fontSize: 50, fontWeight: "bold", color: "white" }}>
              LaunchPad 🚀
            </Text>
          </View>

          <View style={styles.container2Mobile}>
            <View
              style={{
                flexDirection: "row",
                width: "80%",
                height: 50,
                backgroundColor: "#2b2f40",
                borderRadius: 5,
                alignItems: "center",
                marginTop: 30,
                // marginHorizontal: 50
              }}
            >
              <View
                style={{
                  width: "20%",
                  height: 50,
                  borderRightWidth: 3,
                  borderRightColor: "#161822",
                  marginRight: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: "#8b57df",
                    fontSize: "15",
                    fontWeight: "bold",
                  }}
                >
                  {this.state.action}
                </Text>
              </View>
              <View
                style={{
                  width: "60%",
                }}
              >
                <TextInput
                  style={{
                    fontSize: 15,
                    color: "#dde2f4",
                    paddingHorizontal: 10,
                  }}
                  placeholder="API URL"
                  onChangeText={(api) => this.setState({ api: api })}
                />
              </View>
              <TouchableOpacity
                style={{
                  width: "20%",
                  height: 50,
                  marginLeft: 0,
                  alignItems: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#8b57df",
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  borderLeftColor: "#161822",
                  borderLeftWidth: 3,
                }}
                onPress={() => {
                  let res = this._performAction(this.state.api);
                  console.log(this.state.api);
                  this.setState({ response: JSON.stringify(res) });
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 25 }}
                >
                  🚀
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "80%",
                height: 50,
                backgroundColor: "#2b2f40",
                borderRadius: 5,
                alignItems: "center",
                marginTop: 3,
                padding: 10,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.option,
                  this.state.GET ? { backgroundColor: "#8b57df" } : null,
                ]}
                onPress={() => makeActive("GET")}
              >
                <Text
                  style={{
                    color: this.state.GET ? "#dde2f4" : "#8b57df",
                    fontSize: "15",
                    fontWeight: "bold",
                  }}
                >
                  GET
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  this.state.POST ? { backgroundColor: "#8b57df" } : null,
                ]}
                onPress={() => makeActive("POST")}
              >
                <Text
                  style={{
                    color: this.state.POST ? "#dde2f4" : "#8b57df",
                    fontSize: "15",
                    fontWeight: "bold",
                  }}
                >
                  POST
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  this.state.PUT ? { backgroundColor: "#8b57df" } : null,
                ]}
                onPress={() => makeActive("PUT")}
              >
                <Text
                  style={{
                    color: this.state.PUT ? "#dde2f4" : "#8b57df",
                    fontSize: "15",
                    fontWeight: "bold",
                  }}
                >
                  PUT
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  this.state.DELETE ? { backgroundColor: "#8b57df" } : null,
                ]}
                onPress={() => makeActive("DELETE")}
              >
                <Text
                  style={{
                    color: this.state.DELETE ? "#dde2f4" : "#8b57df",
                    fontSize: "15",
                    fontWeight: "bold",
                  }}
                >
                  DELETE
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputConMobile}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  marginBottom: 10,
                  color: "#dde2f4",
                }}
              >
                Authentication
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <TextInput
                  style={{
                    width: "100%",
                    fontSize: 15,
                    marginRight: 10,
                    borderBottomColor: "#8b57df",
                    borderBottomWidth: 3,
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    color: "#dde2f4",
                  }}
                  placeholder="Authentication"
                />
              </View>
            </View>

            <View
              style={{
                marginBottom: 0,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Header />
            </View>

            <View
              style={{
                marginBottom: 0,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Param />
            </View>

            <View style={[styles.inputConMobile, { marginBottom: 20 }]}>
              <Text style={styles.inputh1Mobile}>Response</Text>
              <View
                style={{
                  flexDirection: "column",
                  backgroundColor: "#101119",
                  // height: 40,
                  marginBottom: 10,
                  borderLeftWidth: 3,
                  borderLeftColor: "#8b57df",
                  padding: 10,
                }}
              >
                {responseText}
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              padding: 30,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ color: "#dde2f4", fontSize: 16, fontWeight: "bold" }}
            >
              LaunchPad &copy; 2020
            </Text>
            <Text style={{ color: "#dde2f4", fontSize: 16 }}>@ cirlorm_io</Text>
          </View>
        </MediaQuery>
        
        <MediaQuery maxDeviceWidth={450}>
          <View style={styles.headerMobile}>
            <Text style={styles.brandMobile}> LanchPad 🚀 </Text>
            <View style={styles.buttonsMobile}>
              <TouchableOpacity style={styles.newButtonMobile}>
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 16 }}
                >
                  New +
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.container2Mobile}>
            <View
              style={{
                flexDirection: "row",
                width: "90%",
                height: 50,
                backgroundColor: "#2b2f40",
                borderRadius: 5,
                alignItems: "center",
                marginTop: 30,
                // marginHorizontal: 50
              }}
            >
              <View
                style={{
                  width: "20%",
                  height: 50,
                  borderRightWidth: 3,
                  borderRightColor: "#161822",
                  marginRight: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: "#8b57df",
                    fontSize: "15",
                    fontWeight: "bold",
                  }}
                >
                  {this.state.action}
                </Text>
              </View>
              <View
                style={{
                  width: "60%",
                }}
              >
                <TextInput
                  style={{
                    fontSize: 15,
                    color: "#dde2f4",
                    paddingHorizontal: 10,
                  }}
                  placeholder="API URL"
                  onChangeText={(api) => this.setState({ api: api })}
                />
              </View>
              <TouchableOpacity
                style={{
                  width: "20%",
                  height: 50,
                  marginLeft: 0,
                  alignItems: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#8b57df",
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  borderLeftColor: "#161822",
                  borderLeftWidth: 3,
                }}
                onPress={() => {
                  let res = this._performAction(this.state.api);
                  console.log(this.state.api);
                  this.setState({ response: JSON.stringify(res) });
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                >
                  🚀
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "90%",
                height: 50,
                backgroundColor: "#2b2f40",
                borderRadius: 5,
                alignItems: "center",
                marginTop: 3,
                padding: 10,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.optionMobile,
                  this.state.GET ? { backgroundColor: "#8b57df" } : null,
                ]}
                onPress={() => makeActive("GET")}
              >
                <Text
                  style={{
                    color: this.state.GET ? "#dde2f4" : "#8b57df",
                    fontSize: "8",
                    fontWeight: "bold",
                  }}
                >
                  GET
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionMobile,
                  this.state.POST ? { backgroundColor: "#8b57df" } : null,
                ]}
                onPress={() => makeActive("POST")}
              >
                <Text
                  style={{
                    color: this.state.POST ? "#dde2f4" : "#8b57df",
                    fontSize: "8",
                    fontWeight: "bold",
                  }}
                >
                  POST
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionMobile,
                  this.state.PUT ? { backgroundColor: "#8b57df" } : null,
                ]}
                onPress={() => makeActive("PUT")}
              >
                <Text
                  style={{
                    color: this.state.PUT ? "#dde2f4" : "#8b57df",
                    fontSize: "8",
                    fontWeight: "bold",
                  }}
                >
                  PUT
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionMobile,
                  this.state.DELETE ? { backgroundColor: "#8b57df" } : null,
                ]}
                onPress={() => makeActive("DELETE")}
              >
                <Text
                  style={{
                    color: this.state.DELETE ? "#dde2f4" : "#8b57df",
                    fontSize: "8",
                    fontWeight: "bold",
                  }}
                >
                  DELETE
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputConMobile2}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  marginBottom: 10,
                  color: "#dde2f4",
                }}
              >
                Authentication
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <TextInput
                  style={{
                    width: "100%",
                    fontSize: 15,
                    marginRight: 10,
                    borderBottomColor: "#8b57df",
                    borderBottomWidth: 3,
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    color: "#dde2f4",
                  }}
                  placeholder="Authentication"
                />
              </View>
            </View>

            <View
              style={{
                marginBottom: 0,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Header />
            </View>

            <View
              style={{
                marginBottom: 0,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Param />
            </View>

            <View style={[styles.inputConMobile2, { marginBottom: 20 }]}>
              <Text style={styles.inputh1Mobile2}>Response</Text>
              <View
                style={{
                  flexDirection: "column",
                  backgroundColor: "#101119",
                  // height: 40,
                  marginBottom: 10,
                  borderLeftWidth: 3,
                  borderLeftColor: "#8b57df",
                  padding: 10,
                }}
              >
                {responseText}
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              padding: 30,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ color: "#dde2f4", fontSize: 16, fontWeight: "bold" }}
            >
              LaunchPad &copy; 2020
            </Text>
            <Text style={{ color: "#dde2f4", fontSize: 16 }}>@ cirlorm_io</Text>
          </View>
        </MediaQuery>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161822",
  },
  container2: {
    flex: 1,
    backgroundColor: "#161822",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 50,
    backgroundColor: "#161822",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  brand: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  buttons: {
    alignItems: "flex-end",
  },
  newButton: {
    width: 100,
    height: 35,
    backgroundColor: "#8b57df",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  inputCon: {
    width: 650,
    backgroundColor: "#2b2f40",
    height: "auto",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  inputh1: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
    color: "#dde2f4",
  },
  option: {
    width: 70,
    height: "100%",
    backgroundColor: "#dde2f4",
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  container2Mobile: {
    flex: 1,
    backgroundColor: "#161822",
    alignItems: "center",
  },
  headerMobile: {
    width: "100%",
    height: 50,
    backgroundColor: "#161822",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  brandMobile: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  buttonsMobile: {
    alignItems: "flex-end",
  },
  newButtonMobile: {
    width: 100,
    height: 35,
    backgroundColor: "#8b57df",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  inputConMobile: {
    width: "80%",
    backgroundColor: "#2b2f40",
    height: "auto",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  inputh1Mobile: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
    color: "#dde2f4",
  },
  inputConMobile2: {
    width: "90%",
    backgroundColor: "#2b2f40",
    height: "auto",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  inputh1Mobile2: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
    color: "#dde2f4",
  },
  optionMobile: {
    width: "auto",
    height: "100%",
    backgroundColor: "#dde2f4",
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});
