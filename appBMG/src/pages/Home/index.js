/**
* home.js
 */

import React from 'react';
import {View,Text, Image,StyleSheet} from 'react-native';

export default function Home() {
  return (
	<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
		 <Image
                    source={require('../../assets/home.png')}
                    style={styles.imagem}
                />
	</View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    imagem:{
		width:420,
		height:680
    }
})
