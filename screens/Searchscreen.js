import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../components/loading';

var { width, height } = Dimensions.get('window');

export default function Searchscreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    let movieName = "Uri: The Surgical Strike";

    return (
        <SafeAreaView className="flex-1 bg-neutral-800">
            <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
                <TextInput
                    placeholder="Search movie"
                    placeholderTextColor={'lightgray'}
                    className="pb-1 pl-6 flex-1 text-base font-semibold tracking-wider text-neutral-800"
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className="rounded-full p-3 m-1 bg-neutral-500"
                >
                    <XMarkIcon size={25} color="white" />
                </TouchableOpacity>
            </View>

            {
                loading ? (
                    <Loading />
                ) : 
                results.length > 0 ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        className="space-y-3"
                    >
                        <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
                        <View className="flex-row justify-between flex-wrap">
                            {
                                results.map((item, index) => {
                                    return (
                                        <TouchableWithoutFeedback
                                            key={index}
                                            onPress={() => navigation.navigate('Movie', item)}
                                        >
                                            <View className="space-y-2 mb-4">
                                                <Image
                                                    source={require('../assets/images/uri.png')}
                                                    style={{ width: width * 0.44, height: height * 0.3 }}
                                                    className="rounded-3xl"
                                                />
                                                <Text className="text-neutral-300 ml-1">
                                                    {movieName.length > 22 ? movieName.slice(0, 22) + "..." : movieName}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                ) : (
                    <View className="flex-row justify-center">
                        <Image source={require('../assets/images/movieTime.png')} className="h-96 w-96" />
                    </View>
                )
            }
        </SafeAreaView>
    );
}