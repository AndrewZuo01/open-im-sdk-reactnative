import * as React from 'react';
import OpenIMSDKRN, { OpenIMEmitter } from 'open-im-sdk-rn';
import { StyleSheet, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import RNFS from 'react-native-fs';
// const OpenIMEmitter = new NativeEventEmitter(OpenIMSDKRN);

export default function App() {
  const [text, setText] = useState('');
  console.log(text);
  useEffect(() => {
    Listener();
  }, []);

  const uuid = () =>
    (Math.random() * 36).toString(36).slice(2) +
    new Date().getTime().toString();

  const Listener = () => {
    OpenIMEmitter.addListener('onConnectSuccess', (v) => {
      console.log('connect success:::');
      console.log(v);
    });
    OpenIMEmitter.addListener('onConnectFailed', (v) => {
      console.log(v);
    });
    OpenIMEmitter.addListener('onNewConversation', (v) => {
      console.log(v);
    });
    OpenIMEmitter.addListener('onConversationChanged', (v) => {
      console.log('cve changed:::');
      console.log(v);
    });
    OpenIMEmitter.addListener('onRecvNewMessages', (v) => {
      console.log('rec new msg:::');
      console.log(v);
    });
    OpenIMEmitter.addListener('SendMessageProgress', (v) => {
      console.log('send msg progress:::');
      console.log(v);
    });
    OpenIMEmitter.addListener('onNewConversation', (v) => {
      console.log('cve new:::');
      console.log(v);
    });
  };

  const Init = async () => {
    await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/tmp');
    const config = {
      platformID: 2,
      apiAddr: 'http://14.29.168.56:10002',
      wsAddr: 'ws://14.29.168.56:10001',
      dataDir: RNFS.DocumentDirectoryPath + '/tmp',
      logLevel: 6,
      isLogStandardOutput: true,
    };
    try {
      const opid = uuid();
      const result = await OpenIMSDKRN.initSDK(config, opid);
      console.log(result); // Success message
    } catch (error) {
      console.error('Error initializing SDK:', error); // Log the error
    }
  };

  const Login = async () => {
    const tk =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIzIiwiUGxhdGZvcm1JRCI6MiwiZXhwIjoxNzExMzU4NDkyLCJuYmYiOjE3MDM1ODIxOTIsImlhdCI6MTcwMzU4MjQ5Mn0.MLoBpIA4S0LyQKFOyQPC7fNf6k6YMvwoBSkhsNXUJFg';
    const options = {
      userID: '3',
      token: tk,
    };
    try {
      const data = await OpenIMSDKRN.login(options, uuid());
      console.log(data);
    } catch (error) {
      console.error('Error login:', error); // Log the error
    }
  };

  const GetLoginStatus = async () => {
    const data = await OpenIMSDKRN.getLoginStatus(null);
    console.log(data);
  };

  const GetCveSplit = async () => {
    const options = {
      offset: 0,
      count: 1,
    };
    const data = await OpenIMSDKRN.getConversationListSplit(options, uuid());
    console.log(data);
  };

  const GetUsersInfo = async () => {
    try {
      const data = await OpenIMSDKRN.getUsersInfo(['6960562805'], uuid());
      console.log(data);
    } catch (error) {
      console.error('Error GetUsersInfo:', error); // Log the error
    }
  };

  const CreateTextMsg = async () => {
    try {
      const data = await OpenIMSDKRN.createTextMessage('rn text msg', uuid());
      console.log(data);
      setText(data);
    } catch (error) {
      console.error('Error CreateTextMsg:', error); // Log the error
    }
  };
  const CreateSoundMessageByURL = async () => {
    const soundinfo = {
      soundPath: '',
      duration: 6,
      uuid: 'uuid',
      sourceUrl: '',
      dataSize: 1024,
      soundType: 'mp3',
    };
    try {
      const data = await OpenIMSDKRN.createSoundMessageByURL(soundinfo, uuid());
      console.log(data);
    } catch (error) {
      console.error('Error CreateSoundMessageByURL:', error); // Log the error
    }
  };

  const getUsersInfoWithCache = async () => {
    const options = {
      userIDs: ['12'],
      groupID: '123',
    };
    try {
      const data = await OpenIMSDKRN.getUsersInfoWithCache(options, uuid());
      console.log(data);
    } catch (error) {
      console.error('Error getUsersInfoWithCache:', error); // Log the error
    }
  };
  const updateMsgSenderInfo = async () => {
    const options = {
      nickname: 'NICK',
      faceURL: '123',
    };
    try {
      const data = await OpenIMSDKRN.updateMsgSenderInfo(options, uuid());
      console.log(data);
    } catch (error) {
      console.error('Error updateMsgSenderInfo:', error); // Log the error
    }
  };
  const subscribeUsersStatus = async () => {
    try {
      const data = await OpenIMSDKRN.subscribeUsersStatus(['123'], uuid());
      console.log(data);
    } catch (error) {
      console.error('Error subscribeUsersStatus:', error); // Log the error
    }
  };
  const hideAllConversations = async () => {
    try {
      const data = await OpenIMSDKRN.hideAllConversations(uuid());
      console.log(data);
    } catch (error) {
      console.error('Error hideAllConversations:', error); // Log the error
    }
  };
  return (
    <View style={styles.container}>
      <Button onPress={Init} title="Init" />
      <Button onPress={Login} title="Login" />
      <Button onPress={GetLoginStatus} title="getLoginStatus" />
      <Button onPress={GetUsersInfo} title="GetUsersInfo" />
      <Button onPress={CreateTextMsg} title="CreateTextMsg" />
      {/* <Button onPress={SendMsg} title="SendMsg" /> */}
      <Button onPress={GetCveSplit} title="getCveSplit" />
      <Button
        onPress={CreateSoundMessageByURL}
        title="createSoundMessageByURL"
      />
      <Button onPress={getUsersInfoWithCache} title="getUsersInfoWithCache" />
      <Button onPress={updateMsgSenderInfo} title="updateMsgSenderInfo" />
      <Button onPress={subscribeUsersStatus} title="subscribeUsersStatus" />
      <Button onPress={hideAllConversations} title="hideAllConversations" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
