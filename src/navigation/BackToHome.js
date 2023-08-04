import HomeScreen from "../screens/HomeScreen";
import { View, Text, Button } from "react-native/Libraries/Components/View/View";
function BackToHome({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Back to home"
          onPress={() => navigation.navigate('HomeScreen')}
        />
      </View>
    );
  }

  export default BackToHome;
  