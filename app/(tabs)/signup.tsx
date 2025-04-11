import { StyleSheet, View, Text, Image, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SignUp from '@/components/SignUp';
import SignIn from '@/components/SignIn';
import { ThemedView } from '@/components/ThemedView';
import { auth } from '@/firebase';
import { TouchableOpacity } from 'react-native';
import HomeScreen from '.';

const Sign_Up = () => {
  //managing state here to push to component
  const [authUser, setAuthUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);

  //this is for a listener so I know what user is currently authenticated
  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      console.log('Auth user in listener', authUser); //logging to terminal
      if(authUser) {
        setAuthUser(authUser); //updating with the current user
      } else {
        setAuthUser(null); //setting this to null if nothing is there
      }

    });
    return () => listener();
  }, []); //empty dependendace array makes it run once when component mounts

  useEffect(() => {
    console.log('Updated auth user', authUser);
  }, [authUser]); //updates everytime auth user is updated

    return (
        <ParallaxScrollView 
            headerBackgroundColor={{ light: '#3982b8', dark: '#3982b8' }} //#A1CEDC
            headerImage={
                <Image
                  source={require('@/assets/images/aurora-wdc.png')}
                  style={styles.auroraLogo}
                />
              }>
            <ThemedView style={{backgroundColor: "white"}}>
              {showSignUp ? (
                <SignUp setUser={setAuthUser}/>
              ) : 
                <SignIn setUser={setAuthUser}/>
              }
              {/*This will be for the sign out function using conditional rendering*/}
              {authUser ? (
                <Button //button tags are self closing in native
                  title="Sign Out" //declaring what will be displayed on button, not in between both tags
                  onPress={() => { //don't forget curly brace with multi-line executions
                    setAuthUser(null);
                    auth.signOut(); //signing out user 
                    window.alert('Auth user signed out' + authUser);
                  }} //not on click!! ]
                />
              ) : null} {/*setting to null here if there is no user*/}
              <TouchableOpacity onPress={() => setShowSignUp(!showSignUp)}>
                <Text style={styles.toggleText}>
                  {showSignUp ? 'Already have an account? Sign in.'
                  : "Don't have an account? Sign up."}
                </Text>
              </TouchableOpacity>

              
            </ThemedView>
        </ParallaxScrollView>
    );
};


const styles = StyleSheet.create({
    auroraLogo: {
      marginTop: 1,
      marginLeft: 33,
      height: 250,
      width: 330,
      resizeMode: 'contain',
    },
    toggleText: {
      marginTop: 15,
      color: '#007AFF',
      textAlign: 'center',
      fontWeight: '500',
    },
  });


export default Sign_Up;