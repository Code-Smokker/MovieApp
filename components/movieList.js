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
                    const fallbackText = (item.Title || item.title || "NA").substring(0, 2).toUpperCase();
                    return (
                        <TouchableWithoutFeedback
                            key={item.imdbID ? `${item.imdbID}-${index}` : index.toString()}
                            onPress={() => navigation.push('Movie', item)}
                        >
                            <View style={{ marginRight: 16, width: width * 0.33 }}>
                                {
                                    item.Poster && item.Poster !== "N/A" ? (
                                        <Image
                                            source={{ uri: item.Poster }}
                                            style={{ width: width * 0.33, height: height * 0.22, borderRadius: 16 }}
                                        />
                                    ) : (
                                        <View 
                                            style={{ width: width * 0.33, height: height * 0.22, borderRadius: 16 }} 
                                            className="bg-neutral-700 items-center justify-center border border-neutral-500"
                                        >
                                            <Text className="text-white text-3xl font-bold tracking-widest text-center">
                                                {fallbackText}
                                            </Text>
                                        </View>
                                    )
                                }
                                <Text style={{ color: '#D1D5DB', marginLeft: 4, marginTop: 4 }} numberOfLines={1}>
                                    {item.Title && item.Title.length > 14 ? item.Title.slice(0, 14) + '...' : item.Title || item.title}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </ScrollView>
        </View>
    );
}
