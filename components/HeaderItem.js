import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  TextInput,
} from "react-native";
import "@expo/match-media";
import MediaQuery from "react-responsive";

const width = Dimensions.get("window").width;

class Animated_Item extends Component {
  constructor() {
    super();

    this.animatedValue = new Animated.Value(0);

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.item.id !== this.props.item.id) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 0.5,
      duration: 510,
      useNativeDriver: true,
    }).start(() => {
      this.props.afterAnimationComplete();
    });
  }

  deleteItem = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 510,
      useNativeDriver: true,
    }).start(() => {
      this.props.deleteItem(this.props.item.id);
    });
  };

  render() {
    const translate_Animation_Object = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-width, 0, width],
    });

    const opacity_Animation_Object = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0],
    });

    return (
      <Animated.View
      style={[
        styles.singleItemView,
        {
          transform: [{ translateX: translate_Animation_Object }],
          opacity: opacity_Animation_Object,
        },
      ]}
    >
      <MediaQuery maxDeviceWidth={700} minDeviceWidth={450}>
        <View style={styles.amin}>
          <TextInput style={styles.input} placeholder="Key" />
          <TextInput style={styles.input} placeholder="Value" />
          <TouchableOpacity onPress={this.deleteItem} style={styles.delete}>
            <Text style={{ color: "red" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={450}>
        <View style={styles.amin}>
          <TextInput style={styles.input} placeholder="Header" />
          <TextInput style={styles.input} placeholder="Value" />
          <TouchableOpacity
            onPress={this.deleteItem}
            style={{ width: "auto", padding: 10 }}
          >
            <svg
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </TouchableOpacity>
        </View>
      </MediaQuery>
    </Animated.View>

    );
  }
}

export default class Header extends Component {
  constructor() {
    super();
    this.state = { valueArray: [], disabled: false };
    this.addNewElement = false;
    this.index = 0;
  }

  afterAnimationComplete = () => {
    this.index += 1;
    this.setState({ disabled: false });
  };

  add_New_View = () => {
    this.addNewElement = true;
    const newlyAddedValue = { id: "id_" + this.index, text: this.index + 1 };

    this.setState({
      disabled: true,
      valueArray: [...this.state.valueArray, newlyAddedValue],
    });
  };

  remove_Selected_Item(id) {
    this.addNewElement = false;
    const newArray = [...this.state.valueArray];
    newArray.splice(
      newArray.findIndex((ele) => ele.id === id),
      1
    );

    this.setState(
      () => {
        return {
          valueArray: newArray,
        };
      },
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MediaQuery minDeviceWidth={700}>
          <View style={styles.inputCon}>
            <Text style={styles.inputh1}>Header</Text>
            <ScrollView
              ref={(scrollView) => (this.scrollView = scrollView)}
              onContentSizeChange={() => {
                this.addNewElement && this.scrollView.scrollToEnd();
              }}
            >
              <View style={{ padding: 4 }}>
                {this.state.valueArray.map((ele) => {
                  return (
                    <Animated_Item
                      key={ele.id}
                      item={ele}
                      deleteItem={(id) => this.remove_Selected_Item(id)}
                      afterAnimationComplete={this.afterAnimationComplete}
                    />
                  );
                })}
              </View>
            </ScrollView>

            <TouchableOpacity
              activeOpacity={0.8}
              disabled={this.state.disabled}
              onPress={this.add_New_View}
              style={styles.addnew}
            >
              <Text style={{ color: "#dde2f4", fontWeight: "bold" }}>
                Add New +
              </Text>
            </TouchableOpacity>
          </View>
        </MediaQuery>

        <MediaQuery maxDeviceWidth={700} minDeviceWidth={450}>
          <View style={styles.inputConMobile}>
            <Text style={styles.inputh1Mobile}>Header</Text>
            <ScrollView
              ref={(scrollView) => (this.scrollView = scrollView)}
              onContentSizeChange={() => {
                this.addNewElement && this.scrollView.scrollToEnd();
              }}
            >
              <View style={{ padding: 4 }}>
                {this.state.valueArray.map((ele) => {
                  return (
                    <Animated_Item
                      key={ele.id}
                      item={ele}
                      deleteItem={(id) => this.remove_Selected_Item(id)}
                      afterAnimationComplete={this.afterAnimationComplete}
                    />
                  );
                })}
              </View>
            </ScrollView>

            <TouchableOpacity
              activeOpacity={0.8}
              disabled={this.state.disabled}
              onPress={this.add_New_View}
              style={styles.addnewMobile}
            >
              <Text style={{ color: "#dde2f4", fontWeight: "bold" }}>
                Add New +
              </Text>
            </TouchableOpacity>
          </View>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={450}>
          <View style={styles.inputConMobile2}>
            <Text style={styles.inputh1Mobile}>Header</Text>
            <ScrollView
              ref={(scrollView) => (this.scrollView = scrollView)}
              onContentSizeChange={() => {
                this.addNewElement && this.scrollView.scrollToEnd();
              }}
            >
              <View style={{ padding: 4 }}>
                {this.state.valueArray.map((ele) => {
                  return (
                    <Animated_Item
                      key={ele.id}
                      item={ele}
                      deleteItem={(id) => this.remove_Selected_Item(id)}
                      afterAnimationComplete={this.afterAnimationComplete}
                    />
                  );
                })}
              </View>
            </ScrollView>

            <TouchableOpacity
              activeOpacity={0.8}
              disabled={this.state.disabled}
              onPress={this.add_New_View}
              style={styles.addnewMobile}
            >
              <Text style={{ color: "#dde2f4", fontWeight: "bold" }}>
                Add New +
              </Text>
            </TouchableOpacity>
          </View>
        </MediaQuery>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
  addnew: {
    backgroundColor: "#8b57df",
    padding: 6,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  amin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#2b2f40",
    height: 40,
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    width: "40%",
    fontSize: 15,
    height: 30,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderBottomColor: "#8b57df",
    borderBottomWidth: 3,
    paddingVertical: 10,
    color: "#dde2f4",
  },
  delete: {
    backgroundColor: "#dde2f4",
    padding: 6,
    borderRadius: 5,
    width: "auto",
    alignitems: "flex-end",
    justifyContent: "flex-end",
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
  addnewMobile: {
    backgroundColor: "#8b57df",
    padding: 6,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  inputConMobile2: {
    width: "90%",
    backgroundColor: "#2b2f40",
    height: "auto",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
});
