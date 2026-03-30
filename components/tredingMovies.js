import { useNavigation } from '@react-navigation/native';
import { Dimensions, Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import Carousel from 'react-native-snap-carousel/src/carousel/Carousel';

var { width, height } = Dimensions.get('window');


export default function TredingMovies({ data }) {
    const navigation = useNavigation();
    const handlrClick = (item) => {
        navigation.navigate('Movie', item);
    }
    return (
        <View className="mb-8">
            <Text style={{ color: 'white', fontSize: 20, marginLeft: 16, marginBottom: 20 }}>Trending</Text>
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard item={item} handlrClick={() => handlrClick(item)} />}
                firstItem={1}
                inactiveSlideOpacity={0.6}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    );
}

const MovieCard = ({ item, handlrClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handlrClick(item)}>
            <Image
                source={require('../assets/images/uri.png')}
                style={{
                    width: width * 0.6,
                    height: height * 0.4,
                    borderRadius: 24,
                }}
            />
        </TouchableWithoutFeedback>
    );
};