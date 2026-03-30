import { useNavigation } from '@react-navigation/native';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { theme } from '../thems';

var { width, height } = Dimensions.get('window');

export default function MovieList({ title, data, hideSeeAll }) {
    const navigation = useNavigation();
    return (
        <View className="mb-8 space-y-4">
            <View className="flex-row justify-between items-center mx-4 ">
                <Text className="text-xl text-white mb-5">{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={{ color: theme.primary, fontSize: 18, marginBottom: 5 }}>See All</Text>
                        </TouchableOpacity>
                    )
                }

            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {data.map((item, index) => {
                    return (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => navigation.navigate('Movie', item)}
                        >
                            <View style={{ marginRight: 16, width: width * 0.33 }}>
                                <Image
                                    source={require('../assets/images/uri.png')}
                                    style={{ width: width * 0.33, height: height * 0.22, borderRadius: 16 }}
                                />
                                <Text style={{ color: '#D1D5DB', marginLeft: 4, marginTop: 4 }} numberOfLines={1}>
                                    {item.title && item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </ScrollView>
        </View>
    );
}
