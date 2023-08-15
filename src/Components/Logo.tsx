import Icon from 'react-native-vector-icons/Ionicons';
import { MAIN_BLUE_COLOR } from '../Constants/Colors';
import { StyleSheet, Text, View } from 'react-native';

export const AppLogo = () => (
    <View style={styles.container}>
    <View style={styles.iconContainer}>
      <Icon name="storefront" size={30} color={MAIN_BLUE_COLOR} />
    </View>
    <Text style={styles.title}>MarketPlace</Text>
  </View>
      )
      const styles = StyleSheet.create({
        container: {
          flexDirection: 'row', 
          alignItems: 'center', 
          padding: 16,
        },
        iconContainer: {
          marginRight: 10, 
        },
        title: {
          fontSize: 18, 
          fontWeight: 'bold',
          marginLeft: 4,
        },
      });
      
      
      
      
      
      
