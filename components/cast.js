import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Cast({ cast, navigation }) {
    let personName = 'Vicky Kaushal';
    let characterName = 'Major Vihaan Shergill';

    return (
        <View className="mb-8">
            <Text className="text-white text-lg mx-4 mb-5">Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            >
                {cast && cast.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            className="mr-4 items-center"
                            onPress={() => navigation.navigate('Person', item)}
                        >
                            <View className="rounded-full h-24 w-20 overflow-hidden border border-neutral-500">
                                <Image
                                    source={require('../assets/images/uri.png')}
                                    className="rounded-2xl h-24 w-20"
                                />
                            </View>

                            <Text className="text-white text-xs mt-1">
                                {characterName.length > 10 ? characterName.slice(0, 10) + '...' : characterName}
                            </Text>
                            <Text className="text-neutral-400 text-xs mt-1">
                                {personName.length > 10 ? personName.slice(0, 10) + '...' : personName}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View >
    );
}