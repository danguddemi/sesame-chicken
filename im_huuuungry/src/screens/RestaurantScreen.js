import React, {memo, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Portal, Card, Title, Subheading} from 'react-native-paper';
import useGeoLocation from "../api/geo-location";
import useYelpApi from "../api/yelp-client";
import FilledBackButton from "../components/FilledBackButton";
import MapView, {Overlay} from "react-native-maps";
import Carousel from "react-native-snap-carousel";
import categories from "../core/categories";

const region = {
    latitude: 37.321996988,
    longitude: -122.0325472123455,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};

const RestaurantScreen = ({navigation}) => {
    const [location, errorMessage] = useGeoLocation();
    const [businesses, fetchBusinesses] = useYelpApi();

    useEffect(() => {
        fetchBusinesses(region.latitude, region.longitude, navigation.getParam('yelpLabels', null));
    }, [location]);

    return (
        <View>
            <MapView
                style={{
                    width: '100%',
                    height: '100%'
                }}
                initialRegion={region}
                showsUserLocation
                showsMyLocationButton
            >
                {businesses.map((place, idx) => (
                    <MapView.Marker
                        key={idx}
                        title={place.name}
                        coordinate={place.coords}
                    />))}
            </MapView>
            <FilledBackButton navigation={navigation}/>
            <View style={styles.actionArea}>
                <View style={styles.cardContainer}>
                    <Carousel
                        data={businesses}
                        sliderWidth={375}
                        itemWidth={300}
                        layout={'default'}
                        renderItem={({item, index}) => (
                            <Card key={index} style={styles.businessCard}>
                                <Card.Cover
                                    style={{width: 300, height: 300}}
                                    source={{uri: item.imageUrl}}
                                />
                                <Card.Content>
                                    <Title>{item.name}</Title>
                                    <Subheading>{item.coords.latitude}, {item.coords.longitude}</Subheading>
                                </Card.Content>
                            </Card>
                        )}
                    />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    actionArea: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        bottom: 50
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center'
    },
    businessCard: {
        height: 400,
        width: 300
    }
});

export default memo(RestaurantScreen);
