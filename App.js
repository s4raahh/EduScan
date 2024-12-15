import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { enableScreens } from "react-native-screens";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "./firebase"; // Firebase setup
import MainScreen from "./src/screens/MainScreen";
import LoginScreen from "./src/screens/LoginScreen";
import HomePage from "./src/screens/HomePage";
import ScanAttendance from "./src/screens/ScanAttendance";
import { useCameraPermissions } from "expo-camera";

// Enable screen optimizations
enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permission, requestPermission] = useCameraPermissions(); // Manage camera permissions

  const isPermissionGranted = Boolean(permission?.granted); // Check if permission is granted

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once auth state is resolved
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? "HomePage" : "LoginScreen"}>
          {/* Main Screen */}
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />

          {/* Login Screen */}
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />

          {/* Home Page */}
          <Stack.Screen
            name="HomePage"
            options={{ headerShown: false }}
          >
            {(props) => (
              <HomePage
                {...props}
                requestPermission={requestPermission}
                isPermissionGranted={isPermissionGranted}
              />
            )}
          </Stack.Screen>

          {/* Scan Attendance */}
          <Stack.Screen
            name="ScanAttendance"
            options={{ headerShown: false }}
          >
            {() => (
              <ScanAttendance
                isPermissionGranted={isPermissionGranted}
                requestPermission={requestPermission}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
